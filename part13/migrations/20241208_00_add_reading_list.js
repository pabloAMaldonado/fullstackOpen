
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
 up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglist', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    await queryInterface.addColumn('readinglist', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
    })
    await queryInterface.addColumn('readinglist', 'blog_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
        onDelete: 'CASCADE'
    })
    await queryInterface.addColumn('readinglist', 'created_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
    await queryInterface.addColumn('readinglist', 'updated_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
 },
 down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglist')
 }
}
