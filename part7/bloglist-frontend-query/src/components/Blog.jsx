
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import blogService from '../services/blogService'
import { useUserValue } from '../context/userContext'
import { setNotificationWithTimeout, useNotiDispatch } from '../context/notiContext'
import useField from '../hook/useField'


const Blog = ({ blog, isFull, toggleExpand }) => {
	const user = useUserValue()
	const queryClient = useQueryClient()
	const notiDispatch = useNotiDispatch()
	const { token } = user


	const likeMutation = useMutation({
		mutationFn: blogService.likeBlog,
		onSuccess: () => {
			setNotificationWithTimeout(notiDispatch, `You like ${blog.title}.`, 5)
			queryClient.invalidateQueries('blogs')
		},
		onError: () => {
			setNotificationWithTimeout(notiDispatch, 'Blog failed to like.', 3)
		}
	})

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const data = {
		blog,
		token
	}

	const handleLike = async () => {
		likeMutation.mutate(data)
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
						Url:{' '}
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
	const user = useUserValue()
	const queryClient = useQueryClient()
	const notiDispatch = useNotiDispatch()

	const removeMutation = useMutation({
		mutationFn: blogService.removeBlog,
		onSuccess: () => {
			setNotificationWithTimeout(notiDispatch, 'Blog removed successfully.', 5)
			queryClient.invalidateQueries('blogs')
		},
		onError: () => {
			setNotificationWithTimeout(notiDispatch, 'Blog failed to remove.', 3)
		}
	})
	const { token } = user
	const handleRemove = async () => {
		removeMutation.mutate({ blog, token })
	}

	if (user && blog.user.username === user.username) {
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

	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getBlogs,
		staleTime: 0
	})
	let blogSorted = []
	const blogs = result.data

	if (blogs) {
		blogSorted = blogs.sort((a, b) => b.likes - a.likes)
	}

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

	return (
		<>
			{blogSorted.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					blogs={blogs}
					isFull={!expandedBlogs[blog.id]}
					toggleExpand={() => toggleExpand(blog.id)}
				/>
			))}
		</>
	)
}

const FormBlogs = ({ setShow }) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('')

	const user = useUserValue()
	const queryClient = useQueryClient()
	const notiDispatch = useNotiDispatch()

	const createMutation = useMutation({
		mutationFn: blogService.newBlog,
		onSuccess: () => {
			setNotificationWithTimeout(notiDispatch, `${title.spread.value} created succesfully.`, 5)
			queryClient.invalidateQueries('blogs')
		},
		onError: () => {
			setNotificationWithTimeout(notiDispatch, 'Blog failed to create.', 3)
		}
	})

	const data = {
		token: user.token,
		content: {
			title: title.spread.value,
			author: author.spread.value,
			url: author.spread.value
		}
	}
	const handleNewBlog = async (event) => {
		event.preventDefault()
		createMutation.mutate(data)
	}

	return (
		<>
			<h1>Post a Blog</h1>
			<form onSubmit={handleNewBlog}>
				<div>
					title:
					<input
						{...title.spread}
					/>
				</div>
				<div>
					author:
					<input
						{...author.spread}
					/>
				</div>
				<div>
					url:
					<input
						{...url.spread}
					/>
				</div>
				<button type='submit'>Post</button>
				<button onClick={() => setShow(false)}>Cancel</button>
			</form>
		</>
	)
}

export default {
	Blog,
	DisplayBlogs,
	FormBlogs,
	LikeButton,
}
