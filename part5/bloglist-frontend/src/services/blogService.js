
import axios from 'axios'
const baseUrl = '/api/blogs'

const savedUser = JSON.parse(window.localStorage.getItem('user'))
let token = savedUser ? savedUser.token : null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response
}

const initializeToken = () => {
  const savedUser = JSON.parse(window.localStorage.getItem('user'))
  if (savedUser) {
    setToken(savedUser.token)
  }
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl+`/like/${blog.id}`, blog, config)

  blog = response.data

  return response
}

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl+`/${blog.id}`, config)

  return response
}

initializeToken()

export default {
  getAll,
  setToken,
  newBlog,
  likeBlog,
  removeBlog
}
