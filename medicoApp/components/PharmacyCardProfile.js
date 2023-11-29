import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
// import { grey100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
const {width,height} = Dimensions.get('window')

const PharmacyCardProfile = ({ pharmacy }) => {
  return (
    <View style={{    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    gap:19,
    // alignItems: 'center',
    height: height*0.43, // Default height
    width: width*0.6, // Default width
}}>
    <View style={{alignItems:'center'}}>
        <Image source={{ uri: pharmacy.image }}
        style={{height:height*0.21,
        width:width*0.45}}/>
        </View>
      <Text
      style={{fontSize:20,
    fontWeight:800}}
      >{pharmacy.name}</Text>
    <View style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-around'
    }}>
        <Text style={{
            width:width*0.15,
            height:height*0.025,
            backgroundColor:'#D3E9F9',
            borderRadius:10,
            textAlign:'center'
        }}>
            20%
        </Text>

        <Text style={{
            width:width*0.3,
            height:height*0.025,
            backgroundColor:'#64CFA6',
            borderRadius:10,
            textAlign:'center'
        }}>
         Best Selling
        </Text>

    </View>

    <View style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    }}>
        <View style={{display:'flex',
    flexDirection:'column',
    alignItems:'center'}}>
    <Text style={{
        textDecorationLine: 'line-through',
         textDecorationStyle: 'solid',
         fontSize:17,
         fontWeight:500,
         color:'grey'
    }}
    > 22$ </Text>

<Text style={{
         fontSize:20,
         fontWeight:700
    }}
    > 22$ </Text>

</View>

<TouchableOpacity style={{
    width:width*0.15,
    height:height*0.06
}}>
          <Image source={require('../assets/add.png')}
          style={{height:height*0.065,
            width:width*0.1,
            borderRadius:12
        
        }}
        />
        </TouchableOpacity>

    </View>

    </View>
    
  )
}

export default PharmacyCardProfile

