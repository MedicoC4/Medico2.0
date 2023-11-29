const route = require('express').Router()
const {getAll, create, deleteOne, getByUserId} = require("../controller/orders.controller")


route.get("/getAll",getAll)
// route.get("/getById/:userId",getByUserId)
route.post("/createOrder",create)
route.delete("/deleteOrder/:id",deleteOne)

module.exports = route