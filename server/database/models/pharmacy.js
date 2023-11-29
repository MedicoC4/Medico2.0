module.exports = (Sequelize, DataTypes) => {
    const Pharmacy = Sequelize.define("Pharmacy", {
      PHname: {
        type: DataTypes.STRING,
        
      },
      iimageUrl: {
        type: DataTypes.STRING,
        defaultValue :"https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png"
      },
      
      type: {
        type: DataTypes.ENUM("night", "day"),
        defaultValue : "day"
        
      },
      longitude: {
        type: DataTypes.DOUBLE, 
        
      },
      latitude: {
        type: DataTypes.DOUBLE, 
        
      },
      adress: {
        type: DataTypes.STRING
      },
      isBlocked:{
        type: DataTypes.BOOLEAN,
        defaultValue: true

      },
      isverified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Pharmacy;
  };
  