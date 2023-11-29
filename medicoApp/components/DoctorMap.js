import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";

const DoctorMap = ({dataPharmacies}) => {
  const[data,setData] = useState([])
console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",data);
  const allDocs = async ()=>{
      try {
        const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocationMappedAll/0/1`)
        setData(response.data)
          dataPharmacies(response.data)
        } catch (error) {
          throw new Error(error)
        }
      }

        const filtredDocs = async (type)=>{
          try {
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocationMapped/0/1/${type}`)
            setData(response.data)
              dataPharmacies(response.data)
            } catch (error) {
              throw new Error(error)
            }
          }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => allDocs()}>
          <Text>All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => filtredDocs("doctor")}>
          <Text>Doctors</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => filtredDocs("nurse")}>
          <Text>Nurses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorMap;
