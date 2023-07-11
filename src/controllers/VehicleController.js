const Vehicle = require('../models/Vehicle')

module.exports = {

    async createVehicle(req, res) {
        try{
            const {plate, user_id} = req.body
            const vehicle = await Vehicle.create({plate, user_id})
            return res.status(200).json({
                message: 'Vehicle created successfully',
                vehicle
            })
        }catch(error){
            return res.status(400).json({error: 'Error creating vehicle: ' + error})
        }
    },

    async getVehicles(req, res) {
        try{
            const vehicles = await Vehicle.findAll()
            return res.status(200).json(vehicles)
        }catch(error){
            return res.status(400).json({error: 'Error to get vehicles: ' + error})
        }
    },

    async getVehiclesById(req, res) {
        const {id} = req.params
        try{
            const vehicle = await Vehicle.findByPk(id)
            return res.status(200).json(vehicle)
        }catch(error){
            return res.status(400).json({error: 'Error to get vehicle with id ' + id + ': ' + error})
        }
    },

    async deleteVehicleById(req, res) {
        const {id} = req.params
        try{
            const vehicle = await Vehicle.findByPk(id)
            await vehicle.destroy()
            return res.status(200).json({message: 'Vehicle ' + id + ' deleted successfully'})
        }catch(error){
            return res.status(400).json({error: 'Error to delete vehicle with id ' + id + ': ' + error})
        }
    }
}