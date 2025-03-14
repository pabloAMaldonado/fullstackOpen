
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

const Number = require('./src/model.js')

require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err))

const date = new Date()

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())

app.get('/api/persons', async (req, res, next) => {
  try {
    const db = await Number.find()

    return res.status(200).json(db)
  } catch (err) {
    next(err)
  }

})

app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const person = await Number.findOne({ _id: id })

    if (!person) {
      return response.status(404).json('There is no data.')
    }
    return response.status(200).json(person)
  } catch (err) {
    next(err)
  }
  
})

app.delete('/api/persons/:id', async (request, res, next) => {
  const { id } = request.params
  try {
    const result = await Number.deleteOne({ _id: id})
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No entry found with that ID' })
    }
  
    return res.status(200).json({ message: 'Entry deleted successfully' })
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (request, res, next) => {
  const { name, number } = request.body

  try {
    const person = await Number.findOne({ name })

    if (person) { return res.status(400).json('Name already added.') }

    const newEntry = new Number({
      name,
      number
    })

    const savedEntry = await newEntry.save()
    return res.status(201).json(savedEntry)
  } catch (err) {
    next(err)
  }
})

app.put('/api/persons/:id', async ( req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  try {
    const person = await Number.findOne({ _id: id })

    if (!person) { return res.status(400).json('No entry found') } 

    const personUpd = await Number.findByIdAndUpdate(
      id, 
      {
        name,
        number
      },
      { new: true }
    )

    return res.status(200).json(personUpd)
  } catch (err) {
    next(err)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformated id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(409).json({ error: 'Duplicate field value: ' + JSON.stringify(error.keyValue) })
  } else if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'Malformed JSON' })
  } else if (error.name === 'NotFoundError') {
    return response.status(404).json({ error: 'Resource not found' })
  } else if (error instanceof TypeError) {
    return response.status(400).json({ error: 'Type Error: ' + error.message })
  }

  next(error)
} 

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
