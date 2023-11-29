const route = require("express").Router();
const {
  getAll,
  getOne,
  checkUserCredit,
  create,
  update,
  deleteOne,
  SignIn,
  updataLongLat,
  getUserNameById,
  getUserByid,
} = require("../controller/user.controller");

route.put("/updateLongLat/:idUse", updataLongLat);
route.get("/getAll", getAll);
route.get("/getOneById/:getById", getUserByid);
route.get("/getOne/:email", getOne);
route.get("/getUser/:id", getUserNameById);
route.get("/checkMail/:userMail", checkUserCredit);
route.post("/createUser", create);
route.post("/signIn", SignIn);
route.put("/updateUser/:id", update);
route.delete("/deleteUser/:id", deleteOne);

module.exports = route;
