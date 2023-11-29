import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView
} from "react-native";
import axios from "axios";

const PharmacyMap = ({dataPharmacies}) => {
    const[data,setData] = useState([])
    const getPharmacys = async ()=>{
      try {
        const dataPharma = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocationMapped/1/0`)
        setData(dataPharma.data)
          dataPharmacies(dataPharma.data)
        } catch (error) {
          throw new Error(error)
        }
      }
    
    const getPharmacysDN = async (type)=>{
        try {
          const dataPharma = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/getAllDN/1/0/${type}`)
          setData(dataPharma.data)
      
          dataPharmacies(dataPharma.data)

        } catch (error) {
          throw new Error(error)
        }
      }

    

  return (
    <View style={{flex:1,flexDirection:"row",backgroundColor:"red",gap:20,height:300,justifyContent:"center",alignItems:"center"}}>
<View style={{flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
<View style={{width:120,height:50,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}}>
    <TouchableOpacity onPress={()=>getPharmacys()}>
      <Text>All Pharmacies</Text>  
    </TouchableOpacity>
</View>
<View style={{flex:1,flexDirection:"row", width:120,height:50,justifyContent:"space-between",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5,padding:10}}>
    <TouchableOpacity onPress={()=>getPharmacysDN("day")}>
      <Text style={{fontWeight:"bold",fontSize:16}}>Day</Text> 
      <View style={{width:40,height:40,borderRadius:100,backgroundColor:"green"}}>
      <Image style={{width:40,height:40,borderRadius:100,backgroundColor:"green"}} />  
      </View> 
    </TouchableOpacity>
</View>
<View style={{ flex:1, width:120,height:50,justifyContent:"space-between",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5,flexDirection:"row",padding:10}}>
    <TouchableOpacity onPress={()=>getPharmacysDN("night")}>
      <Text style={{fontWeight:"bold",fontSize:16}} >Night</Text>
    <View style={{width:40,height:40,borderRadius:100,backgroundColor:"green"}}>
      <Image style={{width:40,height:40,borderRadius:100,backgroundColor:"green"}} />  
      </View>
    </TouchableOpacity>
</View>
</View>
    </View>
  )
}

export default PharmacyMap