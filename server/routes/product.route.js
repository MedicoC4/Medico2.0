const route = require('express').Router()
const {getAll, getOne, findOneMissing,pharmacyProduct, controlMissing,create, update, deleteOne, updateQ} = require("../controller/products.controller")

route.get("/getAll", getAll)

route.get("/getOne/:id", getOne)
route.get("/phProduct/:email", pharmacyProduct)

route.get('/checkOne/:emailpharmacy/:codebarMissing', controlMissing)
route.get('/findUser/:emailpharmacyOne', findOneMissing)
route.post("/createProduct", create)
route.patch("/updateProduct/:id", update)
route.patch("/updateProductQuantity/:id", updateQ)
route.delete("/deleteProduct/:id", deleteOne)

module.exports = route;