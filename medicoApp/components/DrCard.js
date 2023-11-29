import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const DoctorCard = ({doctor}) => {
    return (
      <View style={styles.card}>
        {/* <Image source={{ uri: doctor.imageUrl }} style={styles.image} /> */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.name}>{doctor.fullname}</Text>
            {doctor.isverified && (
              <View style={styles.ratingContainer}>
                <Icon name="check-circle" size={15} color="#2d958c" />
                <Text style={styles.rating}>Verified</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

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
});

export default DoctorCard;