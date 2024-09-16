
import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/loginService'
import postLogout from './services/logoutService'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


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
    console.log(savedUser, user)

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

  return (
    <div>
      
      {user === null && loginForm()}
      {user !== null && displayBlogs()}
      
    </div>
  )
}

export default App
