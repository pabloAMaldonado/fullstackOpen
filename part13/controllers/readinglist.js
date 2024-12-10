
const router = require('express').Router()

const { ReadingList } = require('../models/index')

const tokenValidator = require('../middleware/tokenHandler')

router.post('/', async (req, res) => {
    const { user, blog } = req.body

    const readingList = await ReadingList.create({
        userId: user,
        blogId: blog
    })

    return res.status(200).json({ msg: 'List created succefully.', readingList })
})

router.get('/', async (req, res) => {
    const list = await ReadingList.findAll()

    return res.status(200).json(list)
})

router.put('/:id', tokenValidator, async(req, res) => {
    const { user } = req
    const { id } = req.params

    const readingList = await ReadingList.findOne({
        where: { id },
        attributes: ['id', 'read', 'userId']
    })

    console.log(user, readingList)
    if (user.dataValues.id === readingList.dataValues.userId && req.body.read === true) {
        readingList.read = true
        return res.status(200).json({ data: readingList, msg: 'read'})
    }
    return res.status(400).json({ data: readingList, msg: 'Only user can update'})})

module.exports = router
