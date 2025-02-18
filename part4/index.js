
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const config = require('./utils/config') 
const logger = require('./utils/loggers')
const middleware = require('./utils/middleware')
const app = express()
require('express-async-errors')
require('dotenv').config()


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const Blog = require('./models/blog')
const User = require('./models/user')

const DB_URI = config.MONGODB_URI

const blogController = require('./controllers/blogs')
const userController = require('./controllers/users')

mongoose.set('strictQuery',false)

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
  .then(() => {
    console.log('Connected to MongoDB')
  })

  .catch((err) => console.error('Failed to connect to MongoDB', err))

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')

  app.use('/api/testing/reset', testingRouter)


}
app.get('/api/users', userController.getInfo)
app.post('/api/users', userController.newUser)

app.post('/api/users/login', userController.loginUser)

app.get('/api/blogs', blogController.getInfo)

app.post('/api/blogs', middleware.tokenExtractor, blogController.postBlog)
app.delete('/api/blogs/:id', middleware.tokenExtractor, blogController.deleteBlog)
app.put('/api/blogs/:id', middleware.tokenExtractor, blogController.updateBlog)

app.put('/api/blogs/like/:id', middleware.tokenExtractor, blogController.likeBlog)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT || 3000

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })

module.exports = app
