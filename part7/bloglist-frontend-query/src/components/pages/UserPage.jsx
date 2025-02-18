/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import NavigationMenu from '../NavigationMenu'
import { setNotificationWithTimeout, useNotiDispatch } from '../../context/notiContext'

const UserPage = ({ blogs }) => {
	const navigate = useNavigate()
	const notiDispatch = useNotiDispatch()
	const { id } = useParams()

	const [userBlogs, setUserBlogs] = useState([])
	const [userBlog, setUserBlog] = useState(null)

	useEffect(() => {
		if (blogs && blogs.length > 0) {
			const filteredBlogs = blogs.filter(blog => blog.user.id === id)

			if (filteredBlogs.length === 0) {
				navigate('/')
				setNotificationWithTimeout(notiDispatch, 'No user found, returned to homepage.', 3)
			} else {
				setUserBlogs(filteredBlogs)
				setUserBlog(filteredBlogs[0].user)
			}
		}
	}, [blogs, notiDispatch, navigate])

	if (!userBlog) {
		return null
	}

	const userStyle = {
		margin: '20px'
	}

	return (
		<div >
			<NavigationMenu />

			<div style={userStyle}>
				<h1>{userBlog.name}</h1>
				<br />
				<h2>Added blogs</h2>
				<br />
				{!userBlogs ? (
					<p>No blogs available.</p>
				) : (
					<ul>
						{userBlogs.map(blog => (
							<li key={blog.id}>{blog.title}</li>
						))}
					</ul>
				)}
			</ div>

		</div>
	)
}

export default UserPage
