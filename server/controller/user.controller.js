const { User ,Doctor} = require("../database/index");

module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await User.findAll({});
      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  create: async (req, res) => {
    let userData = req.body;


    try {
      const emailExist = await User.findOne({
        where: { email: userData.email },
      });
      if (emailExist) {
        return res.status(401).send({ message: "El correo ya existe" });
      }
      const newUser = await User.create(userData);
      res.json(newUser);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const updatedUser = await User.update(dataToUpdate, {
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
      const deletedUser = await User.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedUser);
    } catch (error) {
      throw error;
    }
  },
  SignIn: async (req, res) => {
    let userData = req.body;


    try {
      const emailExist = await User.findOne({
        where: { email: userData.email },
        include:Doctor
      });
      if (!emailExist) {
        return res.status(400).send({ message: "email is not valid" });
      }
      res.json(emailExist);
    } catch (error) {
      throw error;
    }
  },
  updataLongLat:async (req, res) => {
    try {
      const longLat = await User.update(req.body,{where:{id:req.params.idUse}})
      res.json(longLat)
    } catch (error) {
      throw new Error(error)
    }
  },
  getUserNameById:async(req,res)=>{
    const userId = req.params.id; // Assuming the user ID is part of the route params

    try {
      const user = await User.findOne({
        attributes: ['username'],
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ username: user.username });
    } catch (error) {
      console.error('Error fetching username:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
