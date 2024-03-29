const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    async createUser(req, res) {
        try {
            const { name, cpf, email, password, account_balance } = req.body
            const hash = bcrypt.hashSync(password, 10)
            let emailExists = await User.findOne({ where: { email: email } })
            let cpfExists = await User.findOne({ where: { cpf: cpf } })
            let message = emailExists ? 'Email already exists' : 'CPF already exists'
            
            if(emailExists || cpfExists){
                return res.status(400).json({ error: message })
            }

            const user = await User.create({ name, cpf, email, password: hash, account_balance })
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1d'})
            const refreshToken = jwt.sign({refresKey: process.env.JWT_SECRET_REFRESH}, process.env.JWT_SECRET, {expiresIn: '1d'})

            await user.update({refresh_token: refreshToken})

            return res.status(200).json({
                message: 'User created successfully',
                user,
                token: token,
                refreshToken: refreshToken
            })
        } catch (error) {
            return res.status(400).json({ error: 'Error creating user: ' + error })
        }
    },

    async getUsers(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            try{
                const users = await User.findAll()
                return res.status(200).json(users)
            }catch(error){
                return res.status(400).json({error: 'Error to get users: ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getUserById(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const user = await User.findByPk(id)
                return res.status(200).json(user)
            }catch(error){
                return res.status(400).json({error: 'Error to get user with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async deleteUserById(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const {id} = req.params
        if (token) {
            try{
                const user = await User.findByPk(id)
                await user.destroy()
                return res.status(200).json({message: 'User ' + id + ' deleted successfully'})
            }catch(error){
                return res.status(400).json({error: 'Error to delete user with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },  

    async updateUserById(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const {id} = req.params
        if (token) {
            try{
                const user = await User.findByPk(id)
                await user.update(req.body)
                return res.status(200).json({message: 'User ' + id + ' updated successfully'})
            }catch(error){
                return res.status(400).json({error: 'Error to update user with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    }
}