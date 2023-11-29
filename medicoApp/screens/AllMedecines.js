// AllMedicines.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationBar from "../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import MedicineCard from "../components/MedicineCard";
import lense from "../assets/lense.png";

const AllMedicines = ({route}) => {
  const navigation = useNavigation();
  const { medicines } = route.params;

  const [search, setSearch] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    setFilteredMedicines(
      medicines.filter((medecine) =>
        medecine.productName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.medicinesText}>Medicines</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="bell-o" size={25} color="grey" style={styles.icon} />
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
      <View style={styles.searchContainer}>
        <Image source={lense} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {filteredMedicines.map((medecine, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() =>
                navigation.navigate("MedicineDetails", { medicine: medecine })
              }
            >
              <MedicineCard medecine={medecine} />
            </TouchableOpacity>
          ))}
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  medicinesText: {
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: 20,
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
    borderColor: "#D3D3D3",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
});

export default AllMedicines;
