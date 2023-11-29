import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width } = Dimensions.get("window");
import COLORS from "../constants/colors";
import { auth } from "../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { migratePharmacy } from "../redux/pharmacySlicer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

export default function UpgradeDocFirstForm({ navigation }) {
  const [pharmName, setPharmName] = useState("");
  const [adress, setAdress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState("Day");

  const pharmaTypes = ["Night", "Day"];

  const dispatch = useDispatch();

  const pharmMigration = async () => {
    const email = auth.currentUser.email;
    const obj = {
      PHname: pharmName,
      email: email,
      adress: adress,
      type: types,
    };
    dispatch(migratePharmacy(obj));
    navigation.navigate("map");
    await AsyncStorage.setItem("type", "pharmacy");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EFF3" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Pharmacy Name</Text>

              <TextInput
                value={pharmName}
                onChangeText={(e) => {
                  setPharmName(e);
                }}
                style={styles.inputControl}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adress</Text>

              <TextInput
                value={adress}
                onChangeText={(e) => {
                  setAdress(e);
                }}
                style={styles.inputControl}
              />
            </View>
            <View
              style={{
                width: width * 0.9,
                gap: 10,
                zIndex: 2,
                paddingBottom: 20,
              }}
            >
              <Text>Enter Your type :</Text>
              <DropDownPicker
                items={pharmaTypes.map((category) => ({
                  label: category,
                  value: category,
                }))}
                open={isOpen}
                value={types}
                setOpen={() => setIsOpen(!isOpen)}
                setValue={(value) => setTypes(value)}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              />
            </View>

            <View style={styles.formAction}>
              <Button
                onPress={() => pharmMigration()}
                titleStyle={{
                  color: "#FFFFFF",
                }}
                title="Continue"
                filled
                style={{
                  width: width * 0.85,
                  backgroundColor: COLORS.primary,
                  color: COLORS.white,
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  header: {
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffdada",
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#181818",
    marginBottom: 36,
  },
  form: {
    paddingHorizontal: 24,
    alignItems:'center'
  },
  formAction: {
    marginVertical: 24,
    zIndex: 0,
  },
  formFooter: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
    color: "#9fa5af",
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1c1c1e",
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#24262e",
    borderWidth:1,
    width:width*0.9
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: "#FD6B68",
    borderColor: "#FD6B68",
  },
});
