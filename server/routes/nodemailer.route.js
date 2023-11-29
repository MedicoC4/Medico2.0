const route = require('express').Router()

const{getbill}=require("../controller/nodemailer.controller")

route.post("/send",getbill)
module.exports = route