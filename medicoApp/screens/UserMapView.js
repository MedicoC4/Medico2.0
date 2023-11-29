import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const UserMapView = () => {
  const [destination, setDestination] = useState({
    latitude: 36.893641,
    longitude: 10.186078,
  });

  const [origin, setOrigin] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [intervalId, setIntervalId] = useState(null);



console.log(userLocation,"userLock");
  

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setUserLocation(currentLocation.coords);
  };

  const startIteniraire = () => {
    const id = setInterval(getLocation, 250);
    setIntervalId(id);
  };

  const stopIteniraire = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 36.894928,
          longitude: 10.192114,
          latitudeDelta: 5,
          longitudeDelta: 1,
        }}
      >
        <MapViewDirections
          origin={userLocation}
          destination={destination}
          apikey="AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y"
          strokeWidth={4}
          strokeColor="grey"
          mode={'WALKING'}
        />
        {userLocation && (
          <Marker coordinate={userLocation} title="Current Location" />
        )}
        <Marker coordinate={destination} title="Destination Point" />
      </MapView>
      <TouchableOpacity onPress={()=>startIteniraire()}>
        <Text>START</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>stopIteniraire()}>
        <Text>STOP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: 420,
    width: "100%", // Set the desired height for the modal
    backgroundColor: "white",
    padding: 20,

    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 50, // Top-left corner radius
    borderTopRightRadius: 50,
  },
});

const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#c9f2c6", // Land color
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off", // Turn off all icons
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#aadaff", // Turquoise water color
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff", // Grey clair streets color
      },
    ],
  },
];

export default UserMapView;
