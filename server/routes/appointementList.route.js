const route = require('express').Router()
const {updateStatus,postAppointement,getAppointement,deleteAppoint,getAppointementUser,deleteUserAppoint,getAppointementAll} = require("../controller/appointementList.controller")

route.get("/getAppointementUserr/:Statu/:userID", getAppointementUser)
route.put("/updateAppoint/:idAppoint", updateStatus)
route.post("/add/:userPost", postAppointement)
route.get("/getAppointement/:status/:Docid", getAppointement)
route.delete("/delete/:DayOf", deleteAppoint)
route.delete("/deleteOfAppoi/:idOFAppoi", deleteUserAppoint)
route.get("/getAllDoc/:DocidAll", getAppointementAll)



module.exports = route