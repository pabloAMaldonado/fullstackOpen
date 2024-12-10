
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const { User } = require('../models/index')

const tokenValidator = require('../middleware/tokenHandler')

router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    if (!user) {
        return res.status(401).json({
            error: 'Account doesn t exist'
        })
    }

    const passMatch = await bcrypt.compare(body.password, user.password)

    if (!passMatch) {
        return res.status(401).json({
          error: 'Password is incorrect'
        })
    }

    if (user.disabled === true) {
        return res.status(401).json({
            error: 'Account disabled'
          })
    }

    user.session = true
    await user.save()

    const userForToken = {
        username: user.username,
        id: user.id,
    }
    
    const token = jwt.sign(userForToken, SECRET, { expiresIn: '3h' })
    
    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
})

router.delete('/', tokenValidator, async (req, res) => {
    const { user } = req

    user.session = false
    await user.save()

    return res.status(200).json({ message: 'Session closed' })
})

module.exports = router
