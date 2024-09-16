
import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogService'
import loginService from './services/loginService'
import postLogout from './services/logoutService'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    return (

      <>
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
    console.log(blogs)
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
        const post = await blogService.newBlog(
         {title, author, url}
        )

        setBlogs([...blogs, post])
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch (exception) {
        setErrorMessage('Error on posting')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    return (
      <>
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
