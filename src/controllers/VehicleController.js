const Vehicle = require('../models/Vehicle')

module.exports = {

    async createVehicle(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
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
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getVehicles(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            try{
                const vehicles = await Vehicle.findAll()
                return res.status(200).json(vehicles)
            }catch(error){
                return res.status(400).json({error: 'Error to get vehicles: ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getVehiclesById(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const vehicle = await Vehicle.findByPk(id)
                return res.status(200).json(vehicle)
            }catch(error){
                return res.status(400).json({error: 'Error to get vehicle with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async deleteVehicleById(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const vehicle = await Vehicle.findByPk(id)
                await vehicle.destroy()
                return res.status(200).json({message: 'Vehicle ' + id + ' deleted successfully'})
            }catch(error){
                return res.status(400).json({error: 'Error to delete vehicle with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getVehiclesByUserId(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const vehicles = await Vehicle.findAll({
                    where: {
                        user_id: id
                    }
                })
                return res.status(200).json(vehicles)
            }catch(error){
                return res.status(400).json({error: 'Error to get vehicles with user_id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    }

}