

const Blog = require('../models/blog')
const User = require('../models/user')

const middleware = require('../utils/middleware')

exports.getInfo = async (req, res) => {
    const blog = await Blog.find().populate('user', { username: 1, name: 1 })
    res.status(200).json(blog).end()
}

exports.postBlog = async (req, res) => {
  const data = req.body

  const user = await User.findById(req.user)
  
  const newBlog = new Blog({
    ...data,
    user: user._id
  })
  await newBlog.save()

  res.status(200).json(newBlog).end()  

}

exports.deleteBlog = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(req.user)

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json('Blog not found')
  }

  if (!blog.user.equals(user._id)) {
    return res.status(401).json('User must be the same who created it')
  }

  const deletedBlog = await Blog.findByIdAndDelete(id)

  res.status(204).end()
}

exports.updateBlog = async (req, res) => {
  const { id } = req.params
  const blogData = req.body


  const user = await User.findById(req.user)

  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json('Blog not found')
  }

  if (!blog.user.equals(user._id)) {
    return res.status(401).json('User must be the same who created it')
  }

  const updatedBlogData = {
    ...blogData,
    user: user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
    new: true,
    runValidators: true
  })

  res.status(200).json(updatedBlog)
}