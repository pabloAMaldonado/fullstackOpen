

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.getInfo = async (req, res) => {
    const user = await User.find().populate('blog', { url: 1, title: 1, author: 1 })
    res.status(200).json(user).end()
}


exports.newUser = async (req, res) => {
    const { username, password, name } = req.body

    if (password.length < 3) {
       return res.status(400).json('password length is less than 3').end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password: passwordHash,
      })
    const savedUser = await user.save()
    res.status(201).json(savedUser).end()
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(400).json({
        error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*60 }
    )
    
    res.status(200).json({ token, username: user.username, name: user.name }).end()
}
