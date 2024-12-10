
const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

const models = { 
    Blog, User, ReadingList
}

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

User.belongsToMany(Blog, { through: 'readinglist' })
Blog.belongsToMany(User, { through: 'readinglist' })

module.exports = models
