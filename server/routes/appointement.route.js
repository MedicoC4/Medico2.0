const route = require('express').Router()
const {getAvaibility,getAivabilityOfDay,updateAvaibility,deleteAvailability} = require("../controller/appointement.controller")

route.put("/update/:idHour", updateAvaibility)
route.get("/:dayId", getAvaibility)
route.get("/hours/:aiv/:dayId", getAivabilityOfDay)
route.delete("/delete/:idOfDay",deleteAvailability)

module.exports = route