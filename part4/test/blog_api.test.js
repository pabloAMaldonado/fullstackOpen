const { test, before, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token

before(async () => {
  const user = {
    username: 'userToTest',
    password: 'passwordwdq123',
    name: 'nameToTest'
  }

  await api
    .post('/api/users')
    .send(user)

  const loginUser = {
    username: 'userToTest',
    password: 'passwordwdq123'
  }

  const loggedUser = await api
    .post('/api/users/login')
    .send(loginUser)

  token = loggedUser.body.token
})

test('notes are returned as json', async () => {
  const blogs = await Blog.find()

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, blogs.length)
})

test('id is unique', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const idSet = new Set()

  blogs.forEach(blog => {
    assert(blog.id, 'Blog should have an id')
    assert(!blog._id, 'Blog should not have _id')
    idSet.add(blog.id)
  })

  assert.strictEqual(idSet.size, blogs.length, 'All ids should be unique')
})

test('/api/blogs adds a new blog to the db', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Me',
    url: 'blog url',
    likes: 10000
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const blogs = await Blog.findById(response.body.id)
  const blog = blogs.toJSON()
  blog.user = blog.user.toString()

  assert.deepStrictEqual(blog, response.body)
})

test('if likes is not specified, it returns zero', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Me',
    url: 'blog url',
  }

  const response = await api
  .post('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .send(newBlog)
  .expect(200)

  assert.strictEqual(response.body.likes, 0)
})

describe('post blog', () => {
  test('if no title', async () => {
    const newBlog = {
      author: 'Me',
      url: 'blog url',
      likes: 10000
    }
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('if no url', async () => {
    const newBlog = {
      title: 'new Blog',
      author: 'Me',
      likes: 10000
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('if no auth', async () => {
    const newBlog = {
      author: 'Me',
      url: 'blog url',
      likes: 10000
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

test('delete blog', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Me',
    url: 'blog url',
    likes: 10000
  }
  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const deleteBlog = await api
    .delete(`/api/blogs/${createdBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogAfterDeletion = await Blog.findById(createdBlog.body.id)
  assert.strictEqual(blogAfterDeletion, null)
})

test('update blog', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Me',
    url: 'blog url',
    likes: 10000
  }

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const toUpdBlog = {
    title: 'new Blog',
    author: 'Me',
    url: 'blog url',
    user: createdBlog.body.user,
    likes: 10001
  }

  await api
    .put(`/api/blogs/${createdBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(toUpdBlog)
    .expect(200)

  const finalBlog = await Blog.findById(createdBlog.body.id)

  const finalBlogData = finalBlog.toJSON()
  finalBlogData.user = finalBlogData.user.toString()

  assert.deepStrictEqual(finalBlogData, {
    ...toUpdBlog,
    id: createdBlog.body.id 
  })
})

describe('POST /api/users', () => {
  test('username is less than 3', async () => {
    const user = {
      username: 'us',
      password: 'password',
      name: 'name'
    }

    const newUser = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(400)

    const checkUser = await User.findById(newUser.body.id)
    assert.strictEqual(checkUser, null)
  })

  test('password is less than 3', async () => {
    const user = {
      username: 'username',
      password: 'pa',
      name: 'name'
    }

    const newUser = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(400)

    const checkUser = await User.findById(newUser.body.id)
    assert.strictEqual(checkUser, null)
  })

  test('user created successfully', async () => {
    const user = {
      username: 'username123',
      password: 'passwordwdq123',
      name: 'name'
    }

    const newUser = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(201)

    const checkUser = await User.findById(newUser.body.id)
    const userJSON = checkUser.toJSON()

    assert.deepStrictEqual({
      username: userJSON.username,
      name: userJSON.name
    }, {
      username: user.username,
      name: user.name
    })
  })
})
after(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await mongoose.connection.close()
})