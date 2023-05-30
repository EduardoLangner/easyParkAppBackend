const { Model, DataTypes } = require('sequelize')

class CreditCard extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            number: DataTypes.STRING,
            date: DataTypes.STRING,
            cvv: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = CreditCard