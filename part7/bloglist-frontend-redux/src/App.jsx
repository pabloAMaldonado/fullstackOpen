import { useState } from 'react'
import './app.css'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/User'
import Notification from './components/Notification'
import { logoutToken } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)

	const [showBlogForm, setShowBlogForm] = useState(false)
	const dispatch = useDispatch()

	return (
		<div>
			<Notification />

			{!user && (
				<LoginForm />
			)}

			{user && (
				<>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<button onClick={(event) => {dispatch(logoutToken(event))}}>Logout</button>
				</>
			)}

			{user !== null && showBlogForm && (
				<Blog.FormBlogs setShow={setShowBlogForm} />
			)}

			<br />

			{showBlogForm === false && user !== null && (
				<button onClick={() => setShowBlogForm(true)}>New Blog</button>
			)}

			{user !== null && (
				<Blog.DisplayBlogs />
			)}
		</div>
	)
}

export default App
