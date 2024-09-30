
import { useState, useEffect } from 'react'
import blogService from '../services/blogService'
import Notification from './Notification'

const Blog = ({ blog, isFull, toggleExpand }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('blog', blog)

  return (
    <div style={blogStyle}>
      {isFull ? (
        <>
          <p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.title}
            </a>
            <button onClick={toggleExpand} style={{ cursor: 'pointer' }}>hide</button>
          </p>
          <p>{blog.author}</p>
          <p>{blog.likes} Likes</p>
          <LikeButton blogId={blog.id} />
        </>
      ) : (
        <>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.title}
          </a>
          <button onClick={toggleExpand} style={{ cursor: 'pointer' }}>view</button>
        </>
      )}
    </div>
  )
}

const LikeButton = ({ blogId }) => {

  const handleLike = () => {

  }

  return (
    <button onClick={handleLike}>
      Like
    </button>
  )
}
  
const DisplayBlogs = ({ blogs }) => {
  const [expandedBlogs, setExpandedBlogs] = useState({})

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

  if (!blogs || blogs.length === 0) {
    return <p>Loading blogs...</p>
  }

  return (
    <>
      {blogs.map(blog => (
        <Blog 
          key={blog.id} 
          blog={blog} 
          isFull={!expandedBlogs[blog.id]} 
          toggleExpand={() => toggleExpand(blog.id)} 
        />
      ))}
    </>
  )
}

const formBlogs = ({ setShow, blogs, setBlogs, setNoti }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
      setShow(false)
    } catch (exception) {
      Notification.updNoti(setNoti, {status: exception.response.status, message: `Error on posting, ${exception.response.statusText}`})
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
      <button onClick={() => setShow(false)}>Cancel</button>
    </form>
    </>
  )
}

export default {
  Blog,
  DisplayBlogs,
  formBlogs
}
