const route = require('express').Router()
const {getAll, create, update, deleteOne} = require("../controller/categories.controller")

route.get("/getAll", getAll)
route.post("/createCategories", create)
route.put("/updateCategories/:id", update)
route.delete("/deleteCategories/:id", deleteOne)

module.exports = route