
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { SECRET } = require('../util/config')

const tokenValidator = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'Token not working' })
    }

    const user = await User.findByPk(decodedToken.id)

    if (!user) {
        return res.status(401).json({ error: 'User not found' })
    }

    if (user.session === false) {
        return res.status(401).json({ error: 'Session expired, nedd to log in again'})
    }

    req.user = user
    next()
}

module.exports = tokenValidator
