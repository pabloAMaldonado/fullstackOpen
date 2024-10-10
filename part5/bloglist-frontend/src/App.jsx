
import { useState, useEffect } from 'react'
import './app.css'

import Blog from './components/Blog'

import blogService from './services/blogService'
import postLogout from './services/logoutService'
import LoginForm from './components/User'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [noti, setNoti] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)

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

  return (
    <div>
      <Notification.Notification noti={noti} />

      {user === null && <
        LoginForm
        setNoti={setNoti}
        setUser={setUser}
      />}

      {user !== null && (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={(event) => postLogout(event, 'user')}>Logout</button>
        </>
      )}

      {user !== null && showBlogForm &&  <
        Blog.FormBlogs
        setShow={setShowBlogForm}
        blogs={blogs}
        setBlogs={setBlogs}
        setNoti={setNoti}
      />
      }

      <br/>

      {showBlogForm === false &&  user !== null && <button onClick={() => setShowBlogForm(true)}>New Blog</button>}

      {user !== null && (
        <Blog.DisplayBlogs blogs={blogs} setBlogs={setBlogs} setNoti={setNoti}/>
      )}

    </div>
  )
}

export default App
