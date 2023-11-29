import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const OrderDetails = ({ pharmacies, userId, orders }) => {
  const getStatusColors = (status) => {
    switch (status) {
      case 'Accepted':
        return { container: '#ddf0ee', text: '#2d958c' };
      case 'Rejected':
        return { container: '#FF7F7F', text: '#C8102E' };
      case 'Pending':
      default:
        return { container: '#FFD699', text: '#FFA500' };
    }
  };

  return (
    <View>
      {orders.map((order, index) => {
        const colors = getStatusColors(order.orderStatus);
        return (
          <View key={index} style={styles.card}>
            <View style={[styles.processingContainer, { backgroundColor: colors.container }]}>
              <Text style={[styles.processingText, { color: colors.text }]}>{order.orderStatus}</Text>
            </View>
            <Text style={styles.fromText}>From: {pharmacies.PHname} </Text>
            <View style={styles.separator} />
            <View style={styles.orderDetails}>
              <View style={styles.orderDetailItem}>
                <MaterialCommunityIcons name="pill" size={20} color="#198b81" />
                <Text style={styles.drugsText}>{order.quantityOrdered} item(s)</Text>
              </View>
              <View style={styles.separatorVertical} />
              <View style={styles.orderDetailItem}>
                <FontAwesome5 name="money-bill-wave" size={20} color="#198b81" />
                <Text style={styles.totalText}>{order.total} TND </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default OrderDetails;