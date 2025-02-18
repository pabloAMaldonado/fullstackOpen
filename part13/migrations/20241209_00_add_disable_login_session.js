
const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false'
        })
        await queryInterface.addColumn('users', 'session_on', {
             type: DataTypes.BOOLEAN,
            defaultValue: 'false'
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropColumn('disabled')
        await queryInterface.dropColumn('session_on')
    }
}
