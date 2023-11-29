const route = require('express').Router()
const {getAll, create, update, deleteOne} = require("../controller/categories.controller")

route.get("/getAll", getAll)
route.post("/createCategorie", create)
route.put("/updateCategorie/:id", update)
route.delete("/deleteCategorie/:id", deleteOne)

module.exports = route