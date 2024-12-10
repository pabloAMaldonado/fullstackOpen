
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Username must be unique.' },
        validate: {
          isEmail: { msg: 'Username must be an email.' },
          notEmpty: { msg: 'Username must not be empty.' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [3, 128], msg: 'Password must be at least 3 characters.' },
          notEmpty: { msg: 'Password must be filled.' },
        },
      },
    })

    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Url must be provided.'
          }
        }
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title must be provided.'
          }
        }
      },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    })

    await queryInterface.addColumn('blogs', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    await queryInterface.addColumn('users', 'created_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
    await queryInterface.addColumn('blogs', 'created_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
    await queryInterface.addColumn('users', 'updated_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
    await queryInterface.addColumn('blogs', 'updated_at', {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('blogs')
  },
}
