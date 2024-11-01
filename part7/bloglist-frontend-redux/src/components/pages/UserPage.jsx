/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import NavigationMenu from '../NavigationMenu'
import { setNotificationWithTimeout } from '../../reducers/notiReducer'

const UserPage = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	const blogs = useSelector(state => state.blog)
	const dispatch = useDispatch()
	const { id } = useParams()

	const [userBlogs, setUserBlogs] = useState([])
	const [userBlog, setUserBlog] = useState(null)

	useEffect(() => {
		if (blogs.length > 0) {
			const filteredBlogs = blogs.filter(blog => blog.user.id === id)

			if (filteredBlogs.length === 0) {
				navigate('/')
				dispatch(setNotificationWithTimeout('No user found, returned to homepage.', 3))
			} else {
				setUserBlogs(filteredBlogs)
				setUserBlog(filteredBlogs[0].user)
			}
		}
	}, [blogs, dispatch, navigate])

	if (!userBlog) {
		return null
	}

	const userStyle = {
		margin: '20px'
	}

	return (
		<div >
			<NavigationMenu />

			{user && (<div style={userStyle}>
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
			)}

		</div>
	)
}

export default UserPage
