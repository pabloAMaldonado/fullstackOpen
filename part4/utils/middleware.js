
const jwt = require('jsonwebtoken')

exports.unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

exports.errorHandler = (error, request, response, next) => {
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
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

exports.tokenExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  req.user = decodedToken.id
  next()
}