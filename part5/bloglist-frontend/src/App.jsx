
import { useState, useEffect } from 'react'
import './app.css'

import Blog from './components/Blog'

import blogService from './services/blogService'
import loginService from './services/loginService'
import postLogout from './services/logoutService'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [noti, setNoti] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem('user'))
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const loginForm = () => {

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.postLogin(
         {username, password}
        )

        setUser(user)
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      } catch (exception) {
        Notification.updNoti(setNoti, {status: exception.response.status, message: `Error, ${exception.response.data.error}`})
      }
    }

    return (

      <>
      <Notification.Notification noti={noti} />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  const displayBlogs = () => {
    return(
      <>
      <h2>blogs</h2>
      
      <p>{user.name} logged in</p> <button onClick={(event) => postLogout(event, 'user')}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
  }

  const formBlogs = () => {

    const handleNewBlog = async (event) => {
      event.preventDefault()

      try {
        const postCall = await blogService.newBlog(
         {title, author, url}
        )
        const post = postCall.data
        setBlogs([...blogs, post])
        Notification.updNoti(setNoti, {status: postCall.status, message: 'Blog posted Successfully'})
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch (exception) {
        Notification.updNoti(setNoti, {status: exception.response.status, message: `Error on posting, ${exception.response.statusText}`})
      }
    }

    return (
      <>
      <Notification.Notification noti={noti} />
      <h1>Post a Blog</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Post</button>
      </form>
      </>
    )
  }

  return (
    <div>
      
      {user === null && loginForm()}
      {user !== null && formBlogs()}
      {user !== null && displayBlogs()}
      
    </div>
  )
}

export default App
