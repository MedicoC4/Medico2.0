import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase-config";
import { getUser } from "../constants/userServices";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { docImage } from "../redux/doctorSlicer";
import { setSelectedImage, updateUser} from "../redux/userSlicer";
import { useDispatch , useSelector} from "react-redux";
import { imageDoc } from "../redux/doctorSlicer";
import { logOut } from "../redux/userSlicer";

const UserProfilePage = ({ navigation }) => {
  const dispatch = useDispatch()

  const email = auth.currentUser.email;
  const uid = auth.currentUser.uid;

  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  const [localSelectedImage , setLocalSelectedImage] = useState("")
  
  


  
  // const currDoc = async()=>{
  //   try {
  //     const email = auth.currentUser.email;
  //     console.log(email);
  //    const x = await dispatch(imageDoc(email))



  //   }
useEffect(() => {
  async function fetchData() {
    const userData = await getUser();
    if (userData) {
      setUser(userData);
    }
  }

  fetchData();
}, []);


const clearToken = async () => {
  try {
   const logOutType= await AsyncStorage.removeItem('type'); 
   dispatch(logOut())
   console.log('mecanique mnghir awre9',logOutType);

  } catch (error) {
    throw error
  }
}
const onDoc = useSelector((state)=> state.doctor.data)
// const oldImg = onDoc[0].localSelectedImage

// console.log('this is the img' , oldImg);
  useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    }
    // currDoc()
    fetchData();
  }, [localSelectedImage]);



  const logOutUser = async () => {
    try {
      await dispatch(logOut()); // Dispatch the logOut action
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: "image/jpeg",
        name: 'profilePic'
      });
      formData.append("upload_preset", "ntdxso9x");
  
      fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setLocalSelectedImage(data.secure_url);
      dispatch(setSelectedImage(data.secure_url));

      dispatch(updateUser(uid));
      console.log(uid);
    })
    .catch(error => {
      console.error("Error uploading image: ", error);
    });
  }
};
  
console.log(localSelectedImage , 'bingo');
 
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 22,
        paddingTop: 55,
        paddingBottom: 40,
        flexDirection: "column",
        gap: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //   backgroundColor: "green",
          height: 100,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Profile</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            width: "40%",
            height: "100%",
            padding: 0,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#EAEAEA",
              }}
            >
              <Image
                source={require("../assets/bell.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              shadowColor: "rgba(3, 3, 3, 0.1)",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              backgroundColor: "#EAEAEA",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#EAEAEA",
              }}
            >
              <Image
                source={require("../assets/basket.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          margin: 3,
          gap: 8,

        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            shadowColor: "rgba(3, 3, 3, 0.1)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: "#EAEAEA",
            position: "relative",
          }}
        >
          {localSelectedImage ? (
  <Image 
    source={{uri: localSelectedImage}}
    style={{
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      shadowColor: "rgba(3, 3, 3, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      backgroundColor: "#EAEAEA",
    }}
  />
) : null}
          <TouchableOpacity onPress={selectImage}
            style={{
              position: "absolute",
              width: 150,
              top: 15,
              left: 110,
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              shadowColor: "rgba(3, 3, 3, 0.1)",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              backgroundColor: "#1a998e",
              borderWidth: 3.5,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/editPen.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{user.name}</Text>
        <View
          style={{
            width: "55%",
            height: 24,
            borderRadius: 24,
            shadowColor: "rgba(3, 3, 3, 0.1)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: "#EAEAEA",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{email}</Text>
        </View>
      </View>
      <View style={{ height: "46%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: "25%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/personalDetails.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Personal Details
            </Text>
          </View>
          <View>
          
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
   
        
    
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: "25%",
            
            alignItems: "center",
          }}
          onPress={() => navigation.navigate('pay')}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/payment.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Payments</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: "25%",
            alignItems: "center",
          
          }}
          onPress={()=>navigation.navigate('userProfile')}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/settings.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Upgrade account</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: "25%",
            // backgroundColor: "grey",
            alignItems: "center",
          }}
          onPress={()=>logOutUser()}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/logout.png")}
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Log Out</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        
      </View>
    </View>
  );
};

export default UserProfilePage;
