import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PharmacyCard = ({ pharmacy }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    activeOpacity={1}
    onPress={()=>navigation.navigate('PharProf',{pharmacy:pharmacy})}
    >
    <View style={styles.card}
    >
      <Image source={{ uri: pharmacy?.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRatingContainer}>
          <Text style={styles.name}>{pharmacy?.PHname}'s Pharmacy</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={15} color="#FFD700" />
            <Text style={styles.rating}>{pharmacy?.rating}</Text>
          </View>
        </View>
        <View style={styles.distanceContainer}>
          <Icon name="map-marker" size={15} color="#2d958c" />
          <Text >1.5 km</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: width * 0.03,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    elevation: 3,
    alignItems: 'center',
    height: height * 0.32, 
    width: width * 0.8, 
  },
  image: {
    width: width * 0.7, 
    height: height * 0.2, 
    borderRadius: width * 0.05,
  },
  infoContainer: {
    width: '100%', 
    padding: width * 0.03,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.01,
    padding: width * 0.007,
    borderColor: '#808080', 
    borderWidth: width * 0.0025, 
  },
  rating: {
    marginLeft: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#ddf0ee', 
    borderRadius: 5,
    padding: 3,
    alignSelf: 'flex-start', 
  },
  distance: {
    marginLeft: 5,
    color: '#2d958c', 
  },
});

export default PharmacyCard;