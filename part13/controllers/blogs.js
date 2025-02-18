
const router = require('express').Router()
const { Op } = require('sequelize')

const tokenValidator = require('../middleware/tokenHandler')

const { Blog } = require('../models/index')

const blogsFinder = async (req, res, next) => {
    const blogs = await Blog.findByPk(req.params.id)

    req.blogs = blogs
    next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
        {
          title: {
            [Op.like]: `%${req.query.search.toLowerCase()}%`,
          },
        },
        {
          author: {
            [Op.like]: `%${req.query.search.toLowerCase()}%`,
          },
        },
      ];
  }
   
  const blogs = await Blog.findAll({
    where,
    order: [['likes', 'desc']]
  })

  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404).end()
  }
})

router.delete('/all', async (req, res) => {
    await Blog.destroy({
        where: {},
        truncate: false
    })

    return res.status(201).end()
  })

router.post('/', tokenValidator, async(req, res) => {
    const user = req.user
    const id = user.dataValues.id

    const blogs = await Blog.create({ ...req.body, userId: id })
    res.status(201).json(blogs)
})

router.delete('/:id', tokenValidator, blogsFinder, async(req, res) => {
    const user = req.user
    const blogs = req.blogs

    if (!(user.id === blogs.dataValues.UserId)) {
        return res.status(400).json('The user who created it only can delete it')
    }

    if (req.blogs) {
        await blogs.destroy()
        return res.status(201).json('Blog deleted succefully').end()
    } else {
        return res.status(204).json('Blog not found').end()
    }
})

router.put('/like/:id', blogsFinder, async (req, res) => {
    const blogs = req.blogs
    if (blogs) {
        blogs.likes = req.blogs.likes + 1
            await Blog.save()
            res.status(201).json(blogs)
    } else {
        res.status(404).end()
    }     
})

module.exports = router
