
const { QueryTypes } = require('sequelize')
const express = require('express')
require('express-async-errors')

const { connectToDatabase, sequelize } = require('./util/db')
const { PORT } = require('./util/config')
const { errorHandler, unkownEndpoint } = require('./middleware/errorHandler')

const { Blogs } = require('./models/index')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readingList = require('./controllers/readinglist')

const app = express()

app.use(express.json())

app.use('/api/blog', blogsRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglist', readingList)

app.use('/api/authors', async (req, res) => {
  const blogs = await Blogs.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'article'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'desc']]
  })

  console.log(blogs)
  return res.status(201).end()
})

app.use(errorHandler)
app.use(unkownEndpoint)

const main = async () => {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await connectToDatabase()

  })
  try {
    const blogs = await sequelize.query("SELECT * FROM Blogs", { type: QueryTypes.SELECT })
    const blogData = blogs[0]

    if (blogData) {
      blogData.forEach(element => {
        console.log(`${element.author}: '${element.title}', ${element.likes} likes`)
      });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
