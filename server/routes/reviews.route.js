const route = require('express').Router()
const {getAllForDoctor,createReview,update,deleteOne} = require('../controller/review.controller')


route.get('/getAll/:doctorId',getAllForDoctor)
route.post('/createRev',createReview)
route.delete('/deleteRev/:id',deleteOne)


module.exports=route