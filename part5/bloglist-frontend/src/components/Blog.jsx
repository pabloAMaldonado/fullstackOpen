
import { useState } from 'react'
import blogService from '../services/blogService'
import Notification from './Notification'

const Blog = ({ blog }) => (
  <div>
    <p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.title}
      </a> author: {blog.author}
    </p>

  </div>  
)

const displayBlogs = ({ blogs }) => {
  return(
    <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
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
  displayBlogs,
  formBlogs
}
