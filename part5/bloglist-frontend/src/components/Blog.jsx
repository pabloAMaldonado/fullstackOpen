
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogService'
import Notification from './Notification'

const savedUser = JSON.parse(window.localStorage.getItem('user'))

const Blog = ({ blog, blogs, setBlogs, isFull, toggleExpand, setNoti }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      await blogService.likeBlog(blog)

      setBlogs(blogs.map(b =>
        b.id === blog.id ? { ...b, likes: b.likes + 1 } : b
      ))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {isFull ? (
        <>
          <p>
            {blog.title}
            <button onClick={toggleExpand} style={{ cursor: 'pointer' }}>hide</button>
          </p>
          <p>{blog.author}</p>
          <p>Url: <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a></p>
          <p className='likes' >{blog.likes} Likes</p>
          <LikeButton handleLike={handleLike}/>
          <RemoveButton blog={blog} setBlogs={setBlogs} blogs={blogs} setNoti={setNoti}/>
        </>
      ) : (
        <>
          {blog.title} by {blog.author}
          <button onClick={toggleExpand} style={{ cursor: 'pointer' }}>view</button>
        </>
      )}
    </div>
  )
}

const RemoveButton = ({ blogs, blog, setBlogs, setNoti }) => {

  const handleRemove = async () => {
    try {
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)

      const removeCall = await blogService.removeBlog(blog)
      Notification.updNoti(setNoti, { status: removeCall.status, message: 'Blog deleted Successfully' })
    } catch (exception) {
      Notification.updNoti(setNoti, { status: exception.response.status, message: `Error on deleting, ${exception.response.statusText}` })
    }
  }

  if (blog.user.username === savedUser.username) {
    return (
      <button onClick={handleRemove}>
        Remove
      </button>
    )
  }

  return null
}

const LikeButton = ({ handleLike }) => {

  return (
    <button id='Like' onClick={handleLike}>
      Like
    </button>
  )
}

const DisplayBlogs = ({ blogs, setBlogs, setNoti }) => {
  const [expandedBlogs, setExpandedBlogs] = useState({})

  let blogSorted = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const initialExpandedState = blogs.reduce((acc, blog) => {
        acc[blog.id] = true
        return acc
      }, {})
      setExpandedBlogs(initialExpandedState)
    }
  }, [blogs])

  const toggleExpand = (id) => {
    setExpandedBlogs(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  if (!blogs) {
    return <p>Loading blogs...</p>
  }
  else if (blogs.length === 0) {
    return <p>No blogs...</p>
  }

  return (
    <>
      {blogSorted.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          isFull={!expandedBlogs[blog.id]}
          setNoti={setNoti}
          toggleExpand={() => toggleExpand(blog.id)}
        />
      ))}
    </>
  )
}

const FormBlogs = ({ setShow, blogs, setBlogs, setNoti }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const postCall = await blogService.newBlog(
        { title, author, url }
      )
      const post = postCall.data
      console.log('post', post)

      setBlogs([...blogs, post])
      Notification.updNoti(setNoti, { status: postCall.status, message: 'Blog posted Successfully' })
      setTitle('')
      setAuthor('')
      setUrl('')
      setShow(false)
    } catch (exception) {
      Notification.updNoti(setNoti, { status: exception.response.status, message: `Error on posting, ${exception.response.statusText}` })
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
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="author"
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
      url:
          <input
            type="text"
            value={url}
            name="url"
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Post</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </form>
    </>
  )
}

FormBlogs.propTypes = {
  setShow: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNoti: PropTypes.func.isRequired
}

export default {
  Blog,
  DisplayBlogs,
  FormBlogs,
  LikeButton
}
