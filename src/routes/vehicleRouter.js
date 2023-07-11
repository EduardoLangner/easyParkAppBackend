const express = require('express')
const router = express.Router()
const VehicleController = require('../controllers/VehicleController')

router.post('/vehicles', VehicleController.createVehicle)
router.get('/vehicles', VehicleController.getVehicles)
router.get('/vehicles/:id', VehicleController.getVehiclesById)
router.delete('/vehicles/:id', VehicleController.deleteVehicleById)

module.exports = router