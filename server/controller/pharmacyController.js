const {Pharmacy, User, Record} = require('../database/index')
const { Op } = require("sequelize");
const pharmacy = require('../database/models/pharmacy');


module.exports = {
    getAll: async (req, res) => {
      try {
        const getAll = await Pharmacy.findAll({});
        res.json(getAll);
      } catch (err) {
        console.log("Error al obtener todos los usuarios");
        throw err;
      }
    },
    create: async (req, res) => {
      let pharmacyData = req.body;
     
  
      try {
        const newPharmacy = await Pharmacy.create(pharmacyData);
        res.json(newPharmacy);
      } catch (error) {
        throw error;
      }
    },
    update: async (req, res) => {
      let id = req.params.id;
      let dataToUpdate = req.body;
      try {
        const updatedPharmacy = await Pharmacy.update(dataToUpdate, {
          where: { id: Number(id) },
        });
        res.json(updatedPharmacy);
        } catch (error) {
        throw error;
      }
    },
    deleteOne: async (req, res) => {
      let id = req.params.id;
      try {
        const deletedPharmacy = await Pharmacy.destroy({
          where: { id: Number(id) },
        });
        res.json(deletedPharmacy);
      } catch (error) {
        throw error;
      }
    },
    migratePharmacy : async(req , res)=>{
      try {
          const added = await Pharmacy.create(req.body)
          console.log('this is the added',added);
          const oneDoc = await User.update({type : "pharmacy",PharmacyId:added.id},{where: {email : req.body.email}});
          res.json(oneDoc);
      } catch (error) {
          throw error
      }
  },
  getAivablePharma: async (req, res) => {
    try {
      const getPharma = await Pharmacy.findAll({
        where: {
        isBlocked: { [Op.like]: req.params.blockPharma },
        isverified: { [Op.like]: req.params.verefPharma },
        },
      });
      res.status(200).send(getPharma)
    } catch (error) {
      throw new Error(error);
    }
  },
  updataLongLat:async (req, res) => {
    try {
      const longLat = await Pharmacy.update(req.body,{where:{id:req.params.idPharmcy}})
      res.json(longLat)
    } catch (error) {
      throw new Error(error)
    }
  },
  updateLocation : async(req , res)=>{
    try {
        console.log(req.body);
        
         const oneDoc = await User.findOne({where: {email : req.body.email}});
         const doc = await Pharmacy.update({longitude :req.body.longitude, latitude : req.body.latitude},{where: {id : oneDoc.PharmacyId}});


        res.send(doc);
    } catch (error) {
        throw error
    }
},
recordsDoc : async(req , res)=>{
  try {
  const pharmId = await User.findOne({where: {email : req.body.email}});

     await Record.create ({
              ...req.body,
              PharmacyId : pharmId.id
          })
  
  
      res.json('created')
  } catch (error) {
      res.json(error)
  }
},
  };
