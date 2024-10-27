
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './app.css'

import Blog from './components/Blog'

import Notification from './components/Notification'
import User from './components/User'

import { useUserValue } from './context/userContext'
import blogService from './services/blogService'

const App = () => {
	const user = useUserValue()
	const [showBlogForm, setShowBlogForm] = useState(false)

	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getBlogs,
		staleTime: 0
	})

	const blogs = result.data
	return (
		<div>
			<Notification/>

			{user &&(
				<User.UserPanel user={user} />
			)}

			{!user && (
				<User.LoginForm />
			)}

			{user && showBlogForm && (
				<Blog.FormBlogs	/>
			)}

			<br />

			{showBlogForm === false && user && (
				<button onClick={() => setShowBlogForm(true)}>New Blog</button>
			)}

			{user && blogs && (
				<Blog.DisplayBlogs
					blogs={blogs}
				/>
			)}
		</div>
	)
}

export default App
