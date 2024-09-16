
const Blog = ({ blog }) => (
  <div>
    <p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.title}
      </a> author: {blog.author}
    </p>

  </div>  
)

export default Blog
