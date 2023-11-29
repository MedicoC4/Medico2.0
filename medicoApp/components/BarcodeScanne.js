import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
  TextInput
} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';

import axios from 'axios';

const BarcodeScanne = ({handleBarCodeScanned,isScannerVisible,hasCameraPermission}) => {
  return (
    <View>
       { isScannerVisible && hasCameraPermission && ( <View >
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{ height:228  ,width:228   }}
          />
        </View>)}
    </View>
  )
}

export default BarcodeScanne