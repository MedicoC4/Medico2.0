const {Doctor, User , Record} = require('../database/index')
const { Op } = require("sequelize");

module.exports = {
    getAll: async (req, res) => {
        try{
            const getAll = await User.findAll({
                where: {
                  type: "doctor"
                },
                include:Doctor
              })
              

            res.json(getAll)
        }catch(err){
            console.log("Error al obtener todos los usuarios")
            throw err;
        }
    },
    getOne : async(req,res)=>{
        try {
        const oneDoc = await Doctor.findAll({where: {id : req.params.id}}); 
            res.json(oneDoc);
        } catch (error) {
            throw error
        }
    },
    drop : async(req , res)=>{
        try {
            await Doctor.destroy({where:{ id: req.params.id}})
            res.json('Deleted')
        } catch (error) {
            throw err;
        }
      },
      change : async(req,res)=>{
        try {
        const Updated = await Doctor.update(req.body,{where: {id: req.params.id}})
        res.json(Updated)
        } catch (error) {
            throw new Error(error)
        }
    },
    add : async (req,res)=>{
        try {
            const added = await Doctor.create(req.body)
            res.json(added)
        } catch (error) {
            throw error
        }
    },
    
    migrateDoctor : async(req , res)=>{
        try {
            const added = await Doctor.create(req.body)
            console.log('this is the added',added);
            const oneDoc = await User.update({type : "doctor",DoctorId:added.id},{where: {email : req.body.email}});
            console.log(req.body.email);
            res.json(oneDoc);
        } catch (error) {
            throw error
        }
    },
    updateLocation : async(req , res)=>{
        try {
            console.log(req.body);
             const oneDoc = await User.findOne({where: {email : req.body.email}});

             const doc = await Doctor.update({longitude :req.body.longitude, latitude : req.body.latitude},{where: {id : oneDoc.DoctorId}});
            // const doc = await Doctor.update(req.body, {where: {id : oneDoc.DoctorId}});
            res.send(doc);
        } catch (error) {
            throw error
        }
    },
    updateSpeciality  : async(req , res)=>{
        try {
            console.log(req.body);
             const oneDoc = await User.findOne({where: {email : req.body.email}});
             const doc = await Doctor.update({specialityId :req.body.specialityId,},{where: {id : oneDoc.DoctorId}});
            // const doc = await Doctor.update(req.body, {where: {id : oneDoc.DoctorId}});
            res.send(doc);
        } catch (error) {
            throw error
        }
    },
    recordsDoc : async(req , res)=>{
        try {
        const oneDoc = await User.findOne({where: {email : req.body.email}});
  
           await Record.create ({
                    ...req.body,
                    DoctorId : oneDoc.id
                })
        
        
            res.json('created')
        } catch (error) {
            res.json(error)
        }
    },

    // recordsDoc : async (req ,res)=>{
    //    try {
    //     const record = await Record.create(req.body)
    //    res.json(record)
    //    } catch (error) {
    //     throw error
    //    }
    // },


    getAivableDoc: async (req, res) => {
        try {
          const getDoc = await Doctor.findAll({
            where: {
            isBlocked: { [Op.like]: req.params.blockDoc },
            isverified: { [Op.like]: req.params.verefDoc },
            },
          });
          res.status(200).send(getDoc)
        } catch (error) {
          throw new Error(error);
        }
      },
}