const route = require('express').Router()

const {getAll,create,update,deleteOne, migratePharmacy,getAivablePharma,updataLongLat,updateLocation, recordsDoc} = require('../controller/pharmacyController')


route.get('/getAll',getAll)
route.post('/createPhar',create)
route.put('/updatePharmacy/:id',update)
route.delete('/deletePharmacy/:id',deleteOne)
route.post("/migratePharm" , migratePharmacy)
route.get("/pharmaLocation/:blockPharma/:verefPharma" , getAivablePharma)
route.put("/updateLangLat/:idPharmcy" , updataLongLat)


route.patch("/updateLocation" , updateLocation)
route.post("/updatRecords" , recordsDoc)

module.exports=route