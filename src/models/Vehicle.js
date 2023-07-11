const { Model, DataTypes } = require('sequelize')

class Vehicle extends Model {

    static init(sequelize) {
        super.init({
            plate: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = Vehicle