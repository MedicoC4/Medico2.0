const { Products, Missing , User, Pharmacy} = require("../database/index");
const missing = require("../database/models/missing");

module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await Products.findAll({ include:{model:Pharmacy}});

      
      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los productos", err);
      res.status(500).json({ error: "Error al obtener todos los productos" });
    }
  },
  create: async (req, res) => {
    let product = req.body;
    try {
      const findUser = await User.findOne({where : {email: req.body.email}})
      const newProduct = await Products.create({...product, PharmacyId: findUser.PharmacyId});
      console.log(newProduct.codebar);
      const checkMissing = await Missing.findOne({where:{codebar:newProduct.codebar}});
      console.log("checkMissing");
      if (checkMissing) {
        console.log("checkMissing exist",checkMissing);
       const done= await checkMissing.update(
          {quantity: newProduct.stock + checkMissing.quantity},
          {where: {codebar: newProduct.codebar}}
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      if (!checkMissing) {
        console.log(" not checkMissing exist",checkMissing);
        const data= await Missing.create({codebar:newProduct.codebar,quantity:newProduct.stock});
      }
     
    
      res.status(200).send(checkMissing);
   
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const getProd = await Products.findOne( {
        where: { id: Number(id) },
      }); 
      const checkMissing = await Missing.findOne({where:{codebar:getProd.codebar}});
      if (getProd && getProd.stock < req.body.stock) {
        console.log("ooutside");
        let diff = req.body.stock - getProd.stock;
        await checkMissing.update(
          {quantity: diff + checkMissing.quantity},
          {where: {codebar: getProd.codebar}}
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      if (getProd && getProd.stock > req.body.stock) {
        console.log("INSIDE");
        let diff = getProd.stock - req.body.stock;
        await checkMissing.update(
          {quantity: checkMissing.quantity - diff},
          {where: {codebar: getProd.codebar}}
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      const updatedProduct = await Products.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(checkMissing);
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedProduct = await Products.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedProduct);
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
