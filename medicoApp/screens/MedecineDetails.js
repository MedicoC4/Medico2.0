import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { auth } from '../firebase-config';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../redux/reviewSlicer';
import { fetchOrders, createOrder } from '../redux/orderSlicer'
import ReviewCard from '../components/ReviewCard';
import ReviewInput from '../components/SubmitReview';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';


const MedicineDetails = ({ route }) => {
  const { medicine } = route.params
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [pregnant, setPregnant] = useState('No');
  const [selectedImage, setSelectedImage] = useState(null);
  const [clients, setClients] = useState('null');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  

  const retrieve = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      const user = JSON.parse(value);
      setClients(user.id);
      return user;
    } else {
      console.log('No user data in async storage');
      return null;
    }
  }

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.data); 
  const orders = useSelector(state => state.orders.data)

  useEffect(() => {
    dispatch(fetchReviews()); 
    dispatch(fetchOrders())
    requestPermissions();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchReviews());
    requestPermissions();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
     dispatch(fetchReviews());
    setIsRefreshing(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const selectImage = async () => {
    // try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("here is the result", result);
  
      if (!result.canceled) {
        delete result.canceled;
  
        let formData = new FormData();
        formData.append('file', {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: 'prescription'
        });
        formData.append("upload_preset", "ntdxso9x");
        console.log("this is form data", formData);
  
    //     const response = await axios.post(
    //       'https://api.cloudinary.com/v1_1/ddsp5aq1k/upload',
    //       formData
    //     );
    //     console.log("cloudinary response", response);
    //     setSelectedImage(response.data.secure_url);
    //   }
    // } catch (error) {
    //   console.error("error uploading image", error);
    // }

    fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload",{
            method:"post",
            body:formData
        }).then(res=>res.json()).
        then(data=>{
            setSelectedImage(data.url)
            console.log('this is the image url', data)
            // setModal(false)
        }).catch(err=>{
            Alert.alert("error while uploading")
            console.log(err)
        })
  }
    }
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
 
  const placeOrder = async () => {
   
    const email = auth.currentUser.email
    setIsPlacingOrder(true);

    function generateTrackingNumber(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  try {
    const orderData = {
      quantityOrdered: quantity,
      pregnant: pregnant,
      allergies: allergies,
      prescription: selectedImage,
      total: medicine.price * quantity,
      tracking_number: generateTrackingNumber(5),
      ProductId: medicine.id,
      email,
      phoneNumber: phoneNumber,
      address: address,
    };

   
      
    dispatch(createOrder(orderData));


      setIsPlacingOrder(false);

     
      Alert.alert('Order Placed', 'Your order has been successfully placed!');
      toggleModal();
    } catch (error) {
   
      console.error('Error placing order:', error);
      
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="grey" />
        </TouchableOpacity>
        <Text style={styles.detailsText}>Details</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="bell-o" size={25} color="grey" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="cart-outline" size={25} color="grey" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
      <View style={styles.container}>
      <LinearGradient
  colors={['transparent', 'rgba(0, 0, 0, 0.3)']}  // Adjust the alpha for transparency
  style={styles.imageContainer}
>
  <Image source={{ uri: medicine.imageURL }} style={styles.image} />
</LinearGradient>
        <Text style={styles.name}>{medicine.productName}</Text>
        <Text style={styles.info}>Strength: {medicine.strength}</Text>
<Text style={styles.info}>Manufacturer: {medicine.manufacturer}</Text>
<Text style={styles.info}>Packaging: {medicine.packaging}</Text>
<Text style={styles.info}>Description: {medicine.description}</Text>
        <View style={styles.priceAndQuantityContainer}>
          <Text style={styles.price}>Price : {medicine.price} TND</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity}>
              <View style={styles.minusButton}>
                <Text style={styles.quantityChange}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <View style={styles.plusButton}>
                <Text style={styles.quantityChange}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtotal}>Sub total : {medicine.price * quantity} TND</Text>
        <Text style={styles.contraindicationsTitle}>Reviews:</Text>
        {reviews.map(review => (
            <ReviewCard review={review.review} key={review.id} />
          ))}
<ReviewInput productId={medicine.id} />
      </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={toggleModal}>
        <Text style={styles.buyNowText}>Place order</Text>
      </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalQuestion}>Do you have allergies to medications, food, a vaccine component, or latex?</Text>
  <TextInput
    style={styles.input}
    onChangeText={setAllergies}
    value={allergies}
    placeholder="Type your allergies here"
  />
          
          <Text style={styles.modalQuestion}>Are you pregnant?</Text>
          <View style={styles.modalOptions}>
            <TouchableOpacity style={[styles.modalOption, pregnant === 'yes' && styles.selectedOption2]} onPress={() => setPregnant('yes')}>
              <Text style={pregnant === 'yes' && styles.selectedOptionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, pregnant === 'no' && styles.selectedOption2]} onPress={() => setPregnant('no')}>
              <Text style={pregnant === 'no' && styles.selectedOptionText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, pregnant === "I don't know" && styles.selectedOption2]} onPress={() => setPregnant("I don't know")}>
              <Text style={pregnant === "I don't know" && styles.selectedOptionText}>I don't know</Text>
            </TouchableOpacity>
          </View>
          {/* Add more questions and options as needed */}
          <Text style={styles.modalQuestion}>Please upload prescription:</Text>
    <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
      <Text style={styles.uploadButtonText}>Upload Image</Text>
    </TouchableOpacity>
    {selectedImage && (
      <View style={styles.selectedImageContainer}>
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      </View>
    )}
    <Text style={styles.modalQuestion}>Please insert your address:</Text>
<TextInput
  style={styles.input}
  onChangeText={setAddress}
  value={address}
  placeholder="Type your address here"
/>
<Text style={styles.modalQuestion}>Please insert your phone number:</Text>
<TextInput
  style={styles.input}
  onChangeText={setPhoneNumber}
  value={phoneNumber}
  placeholder="+216 XX XXX XXX"
  keyboardType="phone-pad" // This will bring up a numeric keypad
/>
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  detailsText: {
    fontWeight: 'bold',
    fontSize: 35,
    marginLeft: 10,
  },
  icons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 7,
    marginRight: 10,
    backgroundColor: '#E8E8E8',
    borderColor: '#D3D3D3',
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
  height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  priceAndQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtotal: {
    fontSize: 18,
    marginTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#D3D3D3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addToCartButton: {
    backgroundColor: '#bebebe',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  addToCartText: {
    color: 'white',
  },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  buyNowText: {
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: 'lightgray',
    borderRadius: 15, // Reduced from 20
    width: 25, // Reduced from 30
    height: 25, // Reduced from 30
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plusButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15, // Reduced from 20
    width: 25, // Reduced from 30
    height: 25, // Reduced from 30
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityChange: {
    fontSize: 20,
    color: 'white',
  },
  quantity: {
    fontSize: 18,
  },
  contraindicationsTitle: {
    fontSize: 24,
    marginTop: 40,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  contraindication: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'white',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  placeOrderText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#bebebe',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  closeText: {
    color: 'white',
  },
  modalQuestion: {
    fontWeight: 'bold',
    display: 'flex', // Add this line
    flexWrap: 'wrap', // Add this line
  },
  modalOption: {
    
    padding: 10, // Increase padding
    borderRadius: 20, // Increase border radius
    marginRight: 10,
    alignItems: 'center', // Center the text
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    color: 'white', // Make the text white
  },
  selectedOptionText: {
    color: 'white', // Make the text white
  },
  selectedOption2: {
    backgroundColor: '#4CAF50',
    color: 'white', // Make the text white
  },
  info: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    height: 50,
    margin: 12,
    marginLeft: -2,
    marginRight: -2,
    borderWidth: 1,
    borderRadius: 20, 
    padding: 10,
    paddingLeft: 15
  },
});

export default MedicineDetails; 