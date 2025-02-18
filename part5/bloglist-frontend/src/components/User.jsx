
import { useState } from 'react'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import Notification from './Notification'

const LoginForm = ({ setNoti, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.postLogin(
        { username, password }
      )

      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      Notification.updNoti(setNoti, { status: exception.response.status, message: `Error, ${exception.response.data.error}` })
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

export default LoginForm