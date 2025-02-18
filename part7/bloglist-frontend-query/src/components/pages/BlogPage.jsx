/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import NavigationMenu from '../NavigationMenu'
import Blog from '../Blog'

import { useUserValue } from '../../context/userContext'
import { setNotificationWithTimeout, useNotiDispatch } from '../../context/notiContext'
import blogService from '../../services/blogService'

const BlogPage = ({ blogs }) => {
	const user = useUserValue()
	const notiDispatch = useNotiDispatch()
	const [blog, setBlog] = useState(null)
	const navigate= useNavigate()
	const data = useParams()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (blogs.length > 0) {
			const filteredBlog = blogs.filter(blog => blog.id === data.id)
			setBlog(filteredBlog[0])

		 if (filteredBlog.length === 0) {
				navigate('/')
				setNotificationWithTimeout(notiDispatch, 'No blog found, returned to homepage.', 3)
			}}
	}
	, [blogs, data.id, navigate, notiDispatch])

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

	if (!blog) {
		return null
	}
	const handleLike = () => {
		likeMutation.mutate(blog[0], user.token)
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
