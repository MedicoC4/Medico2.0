const { v4: uuidv4 } = require('uuid');
module.exports = (Sequelize, DataTypes) => {
  const Orders = Sequelize.define("Orders", {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    quantityOrdered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM("Accepted", "Rejected","Pending"),
      defaultValue: "Pending",
    },
    livraisonStatus: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'),
        defaultValue: "Pending",
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    acceptedAt: {
        type:DataTypes.DATE
    },
    dilevredAt: {
        type:DataTypes.DATE
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 216,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "Tunis",
    },
    pregnant: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: false,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Orders;
};
