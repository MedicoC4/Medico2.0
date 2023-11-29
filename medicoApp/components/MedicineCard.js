import React, { useState }from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



const MedicineCard = ({ medecine }) => {
  const [isAvailable, setIsAvailable] = useState(true); // Default to true
  return (
    <View style={styles.card}>
      <Image source={{ uri: medecine.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{medecine.productName}</Text>
        <View style={[styles.statusContainer, isAvailable ? {} : { backgroundColor: 'red' }]}>
          <Text style={styles.statusText}>{isAvailable ? 'Available' : 'Out of Stock'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    height: 255, // Default height
    width: 300, // Default width
  },
  image: {
    width: 280,
    height: 165,
    borderRadius: 20,
  },
  infoContainer: {
    width: '100%', // Take up remaining space
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#ddf0ee',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
  statusText: {
    color: '#2d958c',
    fontWeight: 'bold',
  },
});

export default MedicineCard;