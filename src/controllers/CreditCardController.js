const CreditCard = require('../models/CreditCard')

module.exports = {

    async createCreditCard(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            console.log(req.body)
            try{
                const {asaas_creditcard_id, credit_card_number, credit_card_name, credit_card_token, user_id} = req.body
                const creditCard = await CreditCard.create({asaas_creditcard_id, credit_card_number, credit_card_name, credit_card_token, user_id})
                return res.status(200).json({
                    message: 'Credit card created successfully',
                    creditCard
                })
            }catch(error){  
                return res.status(400).json({error: 'Error creating credit card: ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getCreditCard(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            try{
                const creditCard = await CreditCard.findAll()
                return res.status(200).json(creditCard)
            }catch(error){
                return res.status(400).json({error: 'Error to get creditCard: ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getCreditCardById(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const creditCard = await CreditCard.findByPk(id)
                return res.status(200).json(creditCard)
            }catch(error){
                return res.status(400).json({error: 'Error to get credit card with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async deleteCreditCardById(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const creditCard = await CreditCard.findByPk(id)
                await creditCard.destroy()
                return res.status(200).json({message: 'credit card ' + id + ' deleted successfully'})
            }catch(error){
                return res.status(400).json({error: 'Error to delete credit card with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getCreditCardByUserId(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const {id} = req.params
            try{
                const creditCard = await CreditCard.findAll({
                    where: {
                        user_id: id
                    }
                })
                return res.status(200).json(creditCard)
            }catch(error){
                return res.status(400).json({error: 'Error to get credit card with user_id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    }

}