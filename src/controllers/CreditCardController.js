const CreditCard =require('../models/CreditCard')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    async createCreditCard(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                const { name, number, date, cvv, user_id } = req.body;
                
                const hashedNumber = bcrypt.hashSync(number, 10);
                const hashedDate = bcrypt.hashSync(date, 10);     
                const hashedCVV = bcrypt.hashSync(cvv, 10);  

                const creditCard = await CreditCard.create({
                    name,
                    number: hashedNumber,
                    date: hashedDate,
                    cvv: hashedCVV,
                    user_id
                });

                return res.status(200).json({
                    message: 'Credit card created successfully',
                    creditCard
                });
            } catch (error) {
                return res.status(400).json({ error: 'Error creating credit card: ' + error });
            }
        } else {
            return res.status(401).json({ error: 'Invalid Token' });
        }
    },  

    async getCreditCards(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            try{
                const creditCards = await CreditCard.findAll()
                return res.status(200).json(creditCards)
            }catch(error){
                return res.status(400).json({error: 'Error to get credit cards: ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getCreditCardById(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if(token){
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

    async deleteCreditCardById(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            const {id} = req.params
            try{
                const creditCard = await CreditCard.findByPk(id)
                await creditCard.destroy()
                return res.status(200).json({message: 'Credit card ' + id + ' deleted successfully'})
            }catch(error){
                return res.status(400).json({error: 'Error to delete credit card with id ' + id + ': ' + error})
            }
        } else {
            return res.status(401).json({error: 'Invalid Token'})
        }
    },

    async getCreditCardsByUserId(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const { id } = req.params;
            try {
                const creditCards = await CreditCard.findAll({
                    where: {
                        user_id: id
                    }
                });

                const decryptedCreditCards = creditCards.map(creditCard => {
                    return {
                        id: creditCard.id,
                        name: creditCard.name,
                        number: creditCard.number,
                        date: creditCard.date,    
                        cvv: creditCard.cvv       
                    };
                });

                console.log('CARTÃO \n'+ decryptedCreditCards)
                return res.status(200).json(decryptedCreditCards);
            } catch (error) {
                return res.status(400).json({ error: 'Error to get credit card with user id ' + id + ': ' + error });
            }
        } else {
            return res.status(401).json({ error: 'Invalid Token' });
        }
    } 
}