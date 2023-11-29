import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PharmacyCard = ({ pharmacy }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pharmacy.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRatingContainer}>
          <Text style={styles.name}>{pharmacy.PHname}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={15} color="#FFD700" />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>
        <View style={styles.distanceContainer}>
          <Icon name="map-marker" size={15} color="#2d958c" />
          <Text >1.5 km</Text>
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
    // marginTop: 10,
  },
  infoContainer: {
    width: '100%', // Take up remaining space
    padding: 10,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 3,
    borderColor: '#808080', // Grey border color
    borderWidth: 1, // Border width
  },
  rating: {
    marginLeft: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#ddf0ee', // Light green background color
    borderRadius: 5,
    padding: 3,
    alignSelf: 'flex-start', // Align self to the start of the parent container
  },
  distance: {
    marginLeft: 5,
    color: '#2d958c', // Changed color here
  },
});

export default PharmacyCard;