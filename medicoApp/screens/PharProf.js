import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import Button from '../components/Button'
const {width,height}= Dimensions.get('window')

const PharProf = () => {
  return (
    <View>
        <View>
        <Image
        source={require('../assets/pharmacyTest.jpg')
    }
        style={{
            width:width*1,
            height:height*0.4
        }}
        />

        <Button
        filled
        title='Hello'
        style={{width:width*0.13,
     height:height*0.06,
     borderRadius:50,
     position:'relative',
    top:-280,
    left:310}}
    
        /> 
        <Button
        // filled
        title='Hello'
        style={{width:width*0.13,
     height:height*0.06,
     borderRadius:50,
     position:'relative',
    top:-330,
    left:20}}
    
        /> 
        </View>
      <Text>PharProf</Text>
    </View>
  )
}

export default PharProf

