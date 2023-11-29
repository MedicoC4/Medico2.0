import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PharmacyCard from "../components/PharmacyCard";
import MedicineCard from "../components/MedicineCard";
import OrderDetails from "../components/OrderDetails";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NavigationBar from "../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacies } from "../redux/pharmacySlicer";
import { fetchMedicines } from "../redux/medecineSlicer";
import DoctorCard from "../components/DrCard";
import { fetchDoctors } from "../redux/doctorSlicer";
import { fetchOrdersByUserId } from "../redux/orderSlicer";
import { auth } from "../firebase-config";

const Landing = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pharmacies = useSelector((state) => state.pharmacy?.data);
  const medicines = useSelector((state) => state.medecine?.data);
  const doctors = useSelector((state) => state.doctor?.data);
  const orders = useSelector((state) => state.orders?.userOrders);
  const verifiedDoctors = doctors.filter((doctor) => doctor.isverified);
  const [updated, setUpdated] = useState(false);
  const [clients, setClients] = useState("null");
  const [pendingOrders, setPendingOrders] = useState([]);

  const retrieve = async () => {
    const email = auth.currentUser.email;
    dispatch(fetchOrdersByUserId(email));
    
    if (orders) {
      setPendingOrders(
        orders.filter((order) => order.orderStatus === "Pending")
      );
    }
  };

  const fetch1 = () => {
    dispatch(fetchPharmacies());

  };
  const fetch2 = () => {
    dispatch(fetchMedicines());
  };

  const fetch3 = () => {
    dispatch(fetchDoctors());
  };

  useEffect(() => {
    // fetch1();
    // fetch2();
    // fetch3();
    // retrieve();
    
  }, []);

  let topRatedPharmacies = [];

  if (pharmacies) {
    topRatedPharmacies = pharmacies.filter(
      (pharmacy) => pharmacy.rating >= 4.5
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.userName}>Ahmed</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <Icon
                  name="bell-o"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={25}
                  color="grey"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ordersContainer}>
          <Text style={styles.ordersText}>Current orders </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <OrderDetails
          pharmacies={pharmacies}
          userId={clients}
          orders={pendingOrders}
          email
        />
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Pharmacies near you</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pharmacies}
          renderItem={({ item }) => <PharmacyCard pharmacy={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />

        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Top Rated Pharmacies</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={topRatedPharmacies}
          renderItem={({ item }) => <PharmacyCard />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Medicines</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("AllMedicines", { medicines: medicines })
            }
          >
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={medicines}
          renderItem={({ item }) => <MedicineCard medecine={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Doctors</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AllDoctors");
            }}
          >
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={verifiedDoctors}
          renderItem={({ item }) => <DoctorCard doctor={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  greeting: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  helloText: {
    fontSize: 20,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 35,
  },
  icons: {
    flexDirection: "row",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 7,
    marginRight: 10,
    backgroundColor: "#E8E8E8",
    borderColor: "#D3D3D3", // Add this line
  },
  ordersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 55,
  },
  secondOrdersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40, // Adjust this value as needed
  },
  ordersText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ddf0ee",
    borderRadius: 20,
    paddingVertical: 3.5,
    paddingHorizontal: 13,
  },
  buttonText: {
    color: "#2d958c",
    fontSize: 15,
  },
  card: {
    borderRadius: 30,
    padding: 19,
    backgroundColor: "#f8f8f8",
    marginTop: 30,
    marginHorizontal: 10,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  processingContainer: {
    backgroundColor: "#FFD699",
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
  },
  processingText: {
    color: "#FFA500",
    fontSize: 13,
  },
  fromText: {
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 15,
  },
  orderDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
  },
  drugsText: {
    marginLeft: 10,
  },
  separatorVertical: {
    width: 1,
    height: "100%",
    backgroundColor: "#000",
  },
  totalText: {
    marginLeft: 10,
  },
});

export default Landing;
