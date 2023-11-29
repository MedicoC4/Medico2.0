import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import home from '../assets/home.png'
import lense from '../assets/lense.png'
import store from '../assets/store.png'
import account from '../assets/account.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavigationBar = () => {
  const navigation = useNavigation()
  const [selectedTab, setSelectedTab] = useState('')
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Fetch user type from AsyncStorage
    const fetchUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('type');
        setUserType(type);
      } catch (error) {
        console.error('Error fetching user type', error);
      }
    };

    fetchUserType();
  }, []);

  const handlePress = (route, tabName) => {
    navigation.navigate(route)
    setSelectedTab(tabName)
  }

  const fetchProfile = () => {
    if (userType === 'doctor') {
      
       navigation.navigate('DocProfileNew')
    } else {
  
      navigation.navigate('userProfilePage')
    }
  };

  const renderIcon = (source, tabName) => (
    <Image source={source} style={[styles.ic, { tintColor: selectedTab === tabName ? '#2d958c' : '#bdbdbd' }]} />
  )

  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("Landing", "home")}>
        {renderIcon(home, "home")}
        <Text style={selectedTab === "home" ? styles.selectedText : styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("userMap", "discover")}>
        {renderIcon(lense, "discover")}
        <Text style={selectedTab === "discover" ? styles.selectedText : styles.text}  >Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("AllPharmacies", "stores")}>
        {renderIcon(store, "stores")}
        <Text style={selectedTab === "stores" ? styles.selectedText : styles.text}>Stores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("userProfilePage", "account")}>
        {renderIcon(account, "account")}
        <Text style={selectedTab === "account" ? styles.selectedText : styles.text}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:'white',
    borderRadius:5,
    height:70,
    paddingHorizontal:7,
    width: '100%', 
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  ic: {
    paddingLeft: 25,
    width: 25, 
    height: 25, 
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    color: '#bdbdbd' 
  },
  selectedText: {
    fontSize: 15,
    marginTop: 10,
    color: '#2d958c'
  }
});

export default NavigationBar;