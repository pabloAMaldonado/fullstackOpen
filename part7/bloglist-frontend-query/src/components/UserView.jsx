
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import './UserView.css'
import blogService from '../services/blogService'

const UserView = () => {
	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getBlogs,
		staleTime: 0
	})

	const blogs = result.data
	let sortedUsers = blogs.reduce((count, blog) => {
		const { id, name } = blog.user
		if (!count[name]) {
			count[name] = { id, blogCount: 0 }
		}
		count[name].blogCount += 1
		return count
	}, {})

	const sortedUsersArray = Object.entries(sortedUsers).map(([user, count]) => ({
		user,
		count
	}))

	const usersStyle = {
		margin: '0 20px'
	}
	return (
		<div style={usersStyle}>
			<h2>Users</h2>
			<div className='gridUsers'>
				<div><p>Username</p><p>Blogs Created</p></div>
				{sortedUsersArray.map(({ user, count }) => (
					<React.Fragment key={user}>
						<div>
							<Link to={`/users/${count.id}`} >{user}</ Link>
							<p>{count.blogCount}</p>
						</div>

					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default UserView
