
import { initializeBlogs } from './reducers/blogReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'


import './app.css'
import MainPage from './components/pages/MainPage'
import UsersPage from './components/pages/UsersPage'
import UserPage from './components/pages/UserPage'
import BlogPage from './components/pages/BlogPage'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path= '/users/:id' element={<UserPage />} />
				<Route path='/blogs/:id' element={<BlogPage />} />
			</Routes>
		</Router>

	)
}

export default App
