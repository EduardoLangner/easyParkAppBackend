const { Model, DataTypes } = require('sequelize')

class CreditCard extends Model {

    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            asaas_creditcard_id: DataTypes.STRING,
            credit_card_number: DataTypes.STRING,
            credit_card_name: DataTypes.STRING,
            credit_card_token: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = CreditCard