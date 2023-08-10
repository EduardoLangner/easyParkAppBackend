const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {

    async login(req, res){

        try{
            const {email, password} = req.body
            const user = await User.findOne({where: {email: email}})
            if(!user){
                return res.status(400).json({error: 'Email or password incorrect'})
            }
            const checkPassword = bcrypt.compareSync(password, user.password)
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '60s'})
            if(!checkPassword){
                return res.status(400).json({error: 'Email or password incorrect'})
            }else{
                return res.status(200).json({
                    message: 'Login successful',
                    user,
                    token: token
                })
            }
        }catch(error){
            return res.status(400).json({error: 'Error to login: ' + error})
        }
    },

    async refreshToken(req, res){

        try{
            const {token} = req.body
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({where: {id: decoded.id}})
            const newToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '60s'})
            return res.status(200).json({
                message: 'Token refreshed successfully',
                user,
                token: newToken
            })
        }catch(error){
            return res.status(400).json({error: 'Error to refresh token: ' + error})
        }
    }
}