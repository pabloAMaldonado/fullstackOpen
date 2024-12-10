
const { DataTypes, Model } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'readinglist',
    tableName: 'readinglist'
})

module.exports = ReadingList
