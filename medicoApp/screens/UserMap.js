import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import haversine from "haversine";
import MapViewDirections from "react-native-maps-directions";
import SwipeableModal from "../components/SwipeableModal";
// import Config from 'react-native-config'
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";

const UserMap = () => {
  const [radiusInMeters, setRadiusInMeters] = useState(20000);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [distance, setIsDistance] = useState(null);
  const [isNavigation, setIsNavigation] = useState(false);
  const [duration, setEstimatedDuration] = useState(null);
  const [destination, setDestination] = useState({});
  const [coordinatesData, setCoordnatesData] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);
  const [markerId, setMarkId] = useState(0);
  const [location, setLocation] = useState({
    latitude: 0, // You can replace these with your default values
    longitude: 0,
    latitudeDelta: 0.0922, // Initial values
    longitudeDelta: 0.0421,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.89228, // You can replace these with your default values
    longitude: 10.150136,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0421,
  });
  const [filtred, setFiltred] = useState({});
  //   const mapApiKey = Config.MAP_API
  const [mapFilterData, setMapFilterData] = useState("all");
  const [mapData, setMapData] = useState([]);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", markerId);

  const getData = async () => {
    if (mapFilterData === "all") {
      try {
        const dataDoc = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocation/1/0`
        );
        const dataPharma = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocation/1/0`
        );
        setMapData([...dataDoc.data, ...dataPharma.data]);
      } catch (error) {
        throw new Error(error);
      }
    }
    if (mapFilterData === "doctor") {
      try {
        const dataDoc = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocation/1/0`
        );
        setMapData(dataDoc.data);
      } catch (error) {
        throw new Error(error);
      }
    }
    if (mapFilterData === "pharmacy") {
      try {
        const dataPharma = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocation/1/0`
        );
        setMapData(dataPharma.data);
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  const updataLongLat = async (id, body) => {
    try {
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/updateLongLat/${id}`,
        body
      );
    } catch (error) {
      throw new Error(error);
    }
  };
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    updataLongLat(1, {
      lat: currentLocation.coords.latitude,
      lang: currentLocation.coords.longitude,
    });
    setMapLocation(currentLocation);
    setLocation({
      latitude: currentLocation.coords.latitude, // You can replace these with your default values
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922, // Initial values
      longitudeDelta: 0.0421,
    });
    // setMapRegion({
    //   latitude: currentLocation.coords.latitude,
    //   longitude: currentLocation.coords.longitude,
    //   latitudeDelta: 0.0922, // Initial values
    //   longitudeDelta: 0.0421,
    // });
  };

  // const doctor = [
  //   {
  //     latitude: 36.875446,
  //     longitude: 10.202043,
  //     name: "Doctor 1",
  //     specialty: "Specialty 1",
  //   },
  //   {
  //     latitude: 36.851164,
  //     longitude: 10.193179,
  //     name: "Doctor 2",
  //     specialty: "Specialty 2",
  //   },
  //   {
  //     latitude: 36.812638,
  //     longitude: 10.143401,
  //     name: "Doctor 3",
  //     specialty: "Specialty 3",
  //   },
  //   {
  //     latitude: 36.743396,
  //     longitude: 10.256431,
  //     name: "Doctor 4",
  //     specialty: "Specialty 4",
  //     // Add more details
  //   },
  // ];
  const structureData = () => {
    let data = [];
    mapData.forEach((e) => {
      data.push({
        latitude: e.latitude,
        longitude: e.longitude,
        type: e.type,
        name: e.fullname || e.PHname,
        id:e.id
        // imageUrl: e.imageUrl,
      });
    });
    setCoordnatesData(data);
  };

  const getTime = async (desLat, desLong) => {
    if (location && destination) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${mapLocation.coords.latitude},${mapLocation.coords.longitude}&destination=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const duration = data.routes[0].legs[0].duration.text;
          setEstimatedDuration(duration);
        } else {
          console.error("Error calculating route: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching route data: ", error);
      }
    }
  };

  const calculateDistanceMap = async (desLat, desLong) => {
    if (location) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${mapLocation.coords.latitude},${mapLocation.coords.longitude}&destinations=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const distance = data.rows[0].elements[0].distance.text;
          setIsDistance(distance);
        } else {
          console.error("Error calculating distance: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching distance data: ", error);
      }
    }
  };

  const calculateDistance = (start, end) => {
    return haversine(start, end, { unit: "meter" });
  };
  // Filter the doctors within the specified radius
  const doctorsWithinRadius = coordinatesData.filter((doc) => {
    const distance = calculateDistance(location, doc);
    return distance <= radiusInMeters;
  });

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", coordinatesData);

  useEffect(() => {
    getLocation();
    getData();
    structureData();
  }, [location]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={mapRegion}
      >
        {doctorsWithinRadius.map((doct, i) => (
          <Marker
            key={i}
            coordinate={doct}
            onPress={() => {
              handleMarkerPress(doct);
              setDestination({
                latitude: doct.latitude,
                longitude: doct.longitude,
                latitudeDelta: 0.0922, // Initial values
                longitudeDelta: 0.0421,
              });
              getTime(doct.latitude, doct.longitude);
              calculateDistanceMap(doct.latitude, doct.longitude);
            }}
            pinColor={
              doct.type === "doctor"
                ? "red"
                : doct.type === "nurse"
                ? "blue"
                : "yellow"
            }
          />
        ))}
        <Marker coordinate={location} pinColor="green" />
      </MapView>
      {isNavigation && location && (
        <MapViewDirections
          origin={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          destination={destination}
          apikey="AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y"
          strokeWidth={3}
          strokeColor="blue"
        />
      )}
      <View>
        <TouchableOpacity
          onPress={() => getLocation()}
          style={{ position: "relative", top: -630, left: 170 }}
        >
          <View>
            <MaterialIcons name="my-location" size={40} color="#0bc991" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "relative", top: -630, left: 170 }}
        >
          <View>
            <AntDesign name="filter" size={40} color="#0bc991" />
          </View>
        </TouchableOpacity>
        {/* <View style={{ flexDirection: "row", gap: 30 }}>
          <TouchableOpacity
            onPress={() => setMapFilterData("doctor")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("pharmacy")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("nerse")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Nerse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("all")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>All</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <Slider
        style={{ width: 300 }}
        minimumValue={1000}
        maximumValue={30000}
        step={1000}
        value={radiusInMeters}
        onValueChange={(value) => setRadiusInMeters(value)}
      />
      <Text>Radius: {radiusInMeters / 1000} Km</Text>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styling.modalContainer}>
          <View style={styling.modal}>
            <View style={styling.modalContent}>
              <View style={styling.modalHeader}>
                <View style={styling.modalImage}>
                  <Image
                    source={{ uri: selectedMarker?.imageUrl }}
                    style={styling.imageHw}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <Text style={styling.modalText}>
                    Name: {selectedMarker?.name}
                  </Text>
                  <Text style={styling.modalText}>
                    Type: {selectedMarker?.type}
                  </Text>
                  <Text style={styling.modalText}>
                    {/* Specialty: {selectedMarker?.specialty} */}
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  {/* <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    
                    <Text style={styling.modalText}>Estimated Duration:</Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      position: "absolute",
                      left: 70,
                      top: 5,
                    }}
                  >
                    <Ionicons
                      name="md-timer-outline"
                      size={24}
                      color="#0bc991"
                    />
                    <Text style={styling.modalText}>
                      Estimated Duration: {duration}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    position: "absolute",
                    left: 70,
                    top: 40,
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={24}
                    color="#0bc991"
                  />
                  <Text style={styling.modalText}>
                    Estimated Distance: {distance}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styling.modalActions}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0ebe7f",
                  padding: 15,
                  borderRadius: 10,
                  flex: 1,
                  marginLeft: 5,
                }}
                onPress={() => setMarkId(selectedMarker?.id)}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Go To
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                backgroundColor: "#0ebe7f",
                padding: 15,
                borderRadius: 10,
                flex: 1,
                marginLeft: 5,
              }}
            />
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

export default UserMap;

const styling = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "relative",
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    paddingTop: 25,
    paddingBottom: 50,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddf0ee",
    shadowColor: "rgba(3, 3, 3, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalTextContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  specialtyText: {
    fontSize: 16,
    color: "gray",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "blue",
    width: "100%",
  },
  modalButtonText: {
    color: "white",
  },
});

//create our styling code:
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

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: "60%", // Adjust the modal height as desired
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20, // Top-left corner radius
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  modalHeader: {
    alignItems: "center",
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddf0ee",
    shadowColor: "rgba(3, 3, 3, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "blue", // Customize the button color
  },
  modalButtonText: {
    color: "white", // Customize the button text color
  },
});
