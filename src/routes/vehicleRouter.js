const express = require('express')
const router = express.Router()
const VehicleController = require('../controllers/VehicleController')
const Auth = require('../middleware')

router.post('/vehicles', Auth.Auth, VehicleController.createVehicle)
router.get('/vehicles', Auth.Auth, VehicleController.getVehicles)
router.get('/vehicles/:id', Auth.Auth, VehicleController.getVehiclesById)
router.get('/vehiclesbyuser/:id', Auth.Auth, VehicleController.getVehiclesByUserId)
router.delete('/vehicles/:id', Auth.Auth, VehicleController.deleteVehicleById)

module.exports = router