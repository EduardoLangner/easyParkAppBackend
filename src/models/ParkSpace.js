const { Model, DataTypes } = require('sequelize')

class ParkSpace extends Model {

    static init(sequelize) {
        super.init({
            token: DataTypes.STRING,
            status: DataTypes.ENUM('free', 'occupied'),
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            type: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = ParkSpace