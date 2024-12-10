
const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Username must be unique.'
        },
        validate: {
            isEmail: {
                msg: 'Username must be an email.'
            },
            notEmpty: {
                msg: 'Username must not be empty.'
            },
            
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 128],
                msg: 'Password must be at least 3 characters'
            },
            notEmpty: {
                msg: 'Passworf must be filled.'
            }
        } 
    },
    disabled: {
        type: DataTypes.BOOLEAN,
            defaultValue: 'false'
    },
    session: {
        type: DataTypes.BOOLEAN,
            defaultValue: 'false'
    }
}, {
        sequelize: sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'users',
        tableName: 'users'
    }
)

module.exports = User
