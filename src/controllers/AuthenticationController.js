const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {

    async login(req, res){

        try{
            const {email, password,} = req.body
            const user = await User.findOne({where: {email: email}})
            if(!user){
                return res.status(400).json({error: 'Email or password incorrect'})
            }
            const checkPassword = bcrypt.compareSync(password, user.password)
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '5min'})
            const refreshToken = jwt.sign({refresKey: process.env.JWT_SECRET_REFRESH}, process.env.JWT_SECRET, {expiresIn: '5min'})
            await user.update({refresh_token: refreshToken})
            if(!checkPassword){
                return res.status(400).json({error: 'Email or password incorrect'})
            }else{
                return res.status(200).json({
                    message: 'Login successful',
                    user,
                    token: token,
                    refreshToken: refreshToken
                })
            }
        }catch(error){
            return res.status(400).json({error: 'Error to login: ' + error})
        }
    },

    async refreshToken(req, res){
        try{
            const authorizationHeader = req.headers.authorization;
            
            if (!authorizationHeader) {
                return res.status(400).json({ error: 'Authorization header missing' });
            }

            const tokenParts = authorizationHeader.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                return res.status(400).json({ error: 'Invalid authorization header format' });
            }
            
            const refreshToken = tokenParts[1];

            const user = await User.findOne({ where: { refresh_token: refreshToken } });

            if (!user) {
                return res.status(400).json({ error: 'Invalid refresh token' });
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '5min'})

            const newRefreshToken = jwt.sign({refresKey: process.env.JWT_SECRET_REFRESH}, process.env.JWT_SECRET, {expiresIn: '5min'})

            await user.update({refresh_token: newRefreshToken})
            
            return res.status(200).json({
                message: 'Refresh token successful',
                user,
                token: token,
                refreshToken: newRefreshToken
            })
        }catch(error){
            return res.status(400).json({error: 'Error to refresh token: ' + error})
        }
    }
}