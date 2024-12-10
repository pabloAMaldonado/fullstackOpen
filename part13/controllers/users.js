
const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const { SALT } = require('../util/config')

const { User, Blog, ReadingList } = require('../models/index')

const userFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id)
    console.log(req.user)
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['UserId'] },
        include: { model: Blog },
    })

    if (users) {
        res.json(users)
    } else {
        response.status(404).end()
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const where = {}

    if (req.query.read) {
        where.read = req.query.read === "true"
    }

    const user = await User.findOne({
        where: { id },
        attributes : { exclude: ['id', 'password'] },
        include: {
            model: ReadingList,
            attributes: ['id', 'read'],
            where,
            include: {
                model: Blog,
                attributes: ['id', 'url', 'title', 'author', 'likes', 'year']
            }
        }
    })

    return res.status(200).json(user).end()
})

router.post('/', async (req, res) => {
    const data = req.body   
    console.log('salt:', SALT)
    const hashedPass = await bcrypt.hash(data.password, parseInt(SALT))

    const user = await User.create({
        username: data.username,
        password: hashedPass
    })
    res.status(201).json(user)
})

router.put('/:id', userFinder, async (req, res) => {
    const user = req.user
    console.log(req.body.username)

    if (user) {
        user.username = req.body.username || user.username
        await user.save()
        res.status(200).json(user)
    } else {
        res.status(404).json('sd').end()
    }
})

module.exports = router
