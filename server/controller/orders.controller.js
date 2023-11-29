const { Order, Missing, Products, User, Pharmacy } = require("../database/index.js");

module.exports = {
  getAll: async (req, res) => {
    try {
      const { id } = req.params;

      const getAll = await Order.findAll({
        // where: {
        //   order_id: id,
        // },
      });

      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },

  // getByUserId: async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const userExist = await User.findOne({
  //       where: { email: userId },
      
  //     });
  //     const userOrders = await Order.findAll({
  //       where: {
  //         UserId: userExist.id,
  //       },
  //       include: {
  //         model: Products,
  //         include: {
  //           model: Pharmacy,
  //         },
  //       },
  //     });
  
  //     res.json(userOrders);
  //   } catch (err) {
  //     console.log("Error while fetching orders for user");
  //     throw err;
  //   }
  // },


  create: async (req, res) => {

    let userData = req.body; 
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      
      });
      const newOrder= await Order.create({...userData,UserId:userExist.id});
      const newProduct= await Products.findOne({id:newOrder.ProductId});
      const checkMissing = await Missing.findOne({where:{codebar:newProduct.codebar}});
   
      
        await checkMissing.update({order: checkMissing.order + 1});
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      
      res.json(newOrder);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const updatedUser = await Order.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(updatedUser);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedUser = await Order.destroy({
        where: { order_id: id },
      });
      res.json(deletedUser);
    } catch (error) {
      throw error;
    }
  },
  SignIn: async (req, res) => {
    let userData = req.body;

    try {
      const emailExist = await Order.findOne({
        where: { email: userData.email },
        include: Doctor,
      });
      if (!emailExist) {
        return res.status(400).send({ message: "email is not valid" });
      }
      res.json(emailExist);
    } catch (error) {
      throw error;
    }
  },
};
