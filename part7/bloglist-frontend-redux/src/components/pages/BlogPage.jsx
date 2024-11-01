/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import NavigationMenu from '../NavigationMenu'
import Blog from '../Blog'

import { sendLikeBlog } from '../../reducers/blogReducer'
import { setNotificationWithTimeout } from '../../reducers/notiReducer'

const BlogPage = () => {
	const user = useSelector(state => state.user)
	const blogs = useSelector(state => state.blog)
	const [blog, setBlog] = useState(null)
	const dispatch = useDispatch()
	const navigate= useNavigate()
	const data = useParams()

	useEffect(() => {
		if (blogs.length > 0) {
			const filteredBlog = blogs.filter(blog => blog.id === data.id)
			setBlog(filteredBlog[0])

		 if (filteredBlog.length === 0) {
				navigate('/')
				dispatch(setNotificationWithTimeout('No blog found, returned to homepage.', 3))
			}}
	}
	, [blogs, data.id, navigate, dispatch])

	if (!blog) {
		return null
	}
	const handleLike = () => {
		dispatch(sendLikeBlog(blog[0], user.token))
	}

	const noBlogStyle = {
		margin: 'auto'
	}

	const blogStyle = {
		margin: '0 20px'
	}
	return (
		<div>
			<NavigationMenu />

			{!blog ? (
				<p style={noBlogStyle}>No blog information</p>
			) : (
				<div style={blogStyle}>
					<h1>{blog.title}</h1>
					<br />
					<a href={blog.url} target="_blank" rel="noopener noreferrer">
						{blog.url}
					</a>
					<p>{blog.likes} likes <Blog.LikeButton handleLike={handleLike} /> </p>
					<p>added by {blog.user.name}</p>
				</ div>
			)}
		</div>
	)
}

export default BlogPage
