import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (req, res, next) => {
  console.log()

  const { content } = req.body

  if (req.method==='POST' && (!content ||content.length<5) ) {
    return res.status(400).json({
      error: 'too short anecdote, must have length 5 or more'
    })
  } else {
    next()
  }
}

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(validator)

server.post('/anecdotes', (req, res, next) => {
  res.json(console.log('New Anecdote:', req.body))
  next()
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
