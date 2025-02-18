import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import { sendLikeBlog, removeBlog, newBlog } from '../reducers/blogReducer'
import useField from '../hook/useField'

const Blog = ({ blog, isFull, toggleExpand }) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const handleLike = () => {
		dispatch(sendLikeBlog(blog, user.token))
	}

	return (
		<div
			className='blog'
			style={blogStyle}
		>
			{isFull ? (
				<>
					<p>
						<Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
						<button
							onClick={toggleExpand}
							style={{ cursor: 'pointer' }}
						>
							hide
						</button>
					</p>
					<p>{blog.author}</p>
					<p>
						Url:{''}
						<a
							href={blog.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{blog.url}
						</a>
					</p>
					<p className='likes'>{blog.likes} Likes</p>
					<LikeButton handleLike={handleLike} />
					<RemoveButton
						blog={blog}
					/>
				</>
			) : (
				<>
					<Link to={`/blogs/${blog.id}`} >{blog.title}</Link> by {blog.author}
					<button
						onClick={toggleExpand}
						style={{ cursor: 'pointer' }}
					>
						view
					</button>
				</>
			)}
		</div>
	)
}

const RemoveButton = ({ blog }) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleRemove = async () => {
		dispatch(removeBlog(blog, user.token))
	}

	if (blog.user.username === user.username) {
		return <button onClick={handleRemove}>Remove</button>
	}

	return null
}

const LikeButton = ({ handleLike }) => {
	return (
		<button
			id='Like'
			onClick={handleLike}
		>
			Like
		</button>
	)
}

const DisplayBlogs = () => {
	const [expandedBlogs, setExpandedBlogs] = useState({})
	const blogs = useSelector(state => state.blog)

	let blogSorted = [...blogs].sort((a, b) => b.likes - a.likes)

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
		setExpandedBlogs((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}))
	}

	if (!blogs) {
		return <p>Loading blogs...</p>
	} else if (blogs.length === 0) {
		return <p>No blogs...</p>
	}

	const blogsStyle = {
		margin: 'auto',
		width: '70%'
	}

	return (
		<div style={blogsStyle}>
			{blogSorted.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					isFull={!expandedBlogs[blog.id]}
					toggleExpand={() => toggleExpand(blog.id)}
				/>
			))}
		</div >
	)
}

const FormBlogs = ({ setShow }) => {
	const user = useSelector(state => state.user)
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')
	const dispatch = useDispatch()

	const handleNewBlog = async (event) => {
		event.preventDefault()
		const data = {
			title: title.spread.value,
			author: author.spread.value,
			url: url.spread.value
		}
		dispatch(newBlog(data, user.token))

		title.clear()
		author.clear()
		url.clear()
		setShow(false)
	}

	const styleForm = {
		width: '30%',
		margin: '0 5%',
		border: '1px solid',
		borderRadius: '15px',
		padding: '10px'
	}

	return (
		<>

			<Form style={styleForm} onSubmit={handleNewBlog}>
				<h1>Post a Blog</h1>
				<Form.Group>
					<Form.Label>title:</Form.Label>
					<Form.Control
						{...title.spread}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>author:</Form.Label>
					<Form.Control
						{...author.spread}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>url:</Form.Label>
					<Form.Control
						{...url.spread}
					/>
				</Form.Group>
				<button type='submit'>Post</button>
				<button onClick={() => setShow(false)}>Cancel</button>
			</Form>
		</>
	)
}

export default {
	Blog,
	DisplayBlogs,
	FormBlogs,
	LikeButton,
}
