
const mongoose = require('mongoose')
const { test, describe, before, after } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const config = require('../utils/config')
const blogTest = require('./blog_list_test')

const DB_URI = config.MONGODB_URI
const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  let blogs = blogTest

  // before(async () => {
  //   await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  //   blogs = await Blog.find()
  // })

  // after(async () => {
  //   await mongoose.connection.close();
  // })
  
  test('of empty list, then zero', () => {
    const result = listHelper.totalLikes([])

    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const singleBlog = blogs[0]

    const result = listHelper.totalLikes([singleBlog])
    assert.strictEqual(result, singleBlog.likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)

    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)

    assert.strictEqual(result, totalLikes)
  })
})

describe('favorite blog', () => {
  let blogs = blogTest

  test('of empty list, then null', () => {
    const result = listHelper.favoriteBlog([])

    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that blog', () => {
    const singleBlog = blogs[0]

    const result = listHelper.favoriteBlog([singleBlog])
    assert.deepStrictEqual(result, singleBlog)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('most blogs', () => {
  let blogs = blogTest

  test('of empty list, then null', () => {
    const result = listHelper.mostBlogs([])

    assert.strictEqual(result, null)
  })

  test('when list has only one blog,', () => {
    const correct = {
      author: blogs[0].author,
      blogs: 1
    }
    const singleBlog = blogs[0]
    const result = listHelper.mostBlogs([singleBlog])

    assert.deepStrictEqual(result, correct)
  })

  test('of a bigger list is calculated right', () => {
    const topBlogger = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, topBlogger)
  })
})

describe('most likes', () => {
  let blogs = blogTest

  test('of empty list, then null', () => {
    const result = listHelper.mostLikes([])

    assert.strictEqual(result, null)
  })

  test('when list has only one blog,', () => {
    const correct = {
      author: blogs[0].author,
      likes: 7
    }
    const singleBlog = blogs[0]
    const result = listHelper.mostLikes([singleBlog])

    assert.deepStrictEqual(result, correct)
  })

  test('of a bigger list is calculated right', () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, mostLiked)
  })
})