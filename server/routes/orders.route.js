const route = require('express').Router()
const {getAll, getOne, create,getAllDeclaredMissed,updateOrder, deleteOne, getByUserId} = require("../controller/orders.controller")

route.get("/getAll",getAll)
route.get("/oneOrder/:id",getOne)
route.get("/getById/:userId",getByUserId)
route.get("/getMissed",getAllDeclaredMissed)
route.patch("/update/:id",updateOrder)
route.post("/createOrder",create)
route.delete("/deleteOrder/:id",deleteOne)

module.exports = route