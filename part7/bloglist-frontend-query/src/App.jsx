
import { useQuery } from '@tanstack/react-query'
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'
import './app.css'

import MainPage from './components/pages/MainPage'
import UsersPage from './components/pages/UsersPage'
import UserPage from './components/pages/UserPage'
import BlogPage from './components/pages/BlogPage'

import blogService from './services/blogService'

const App = () => {
	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getBlogs,
		staleTime: 0
	})

	const blogs = result.data
	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path= '/users/:id' element={<UserPage blogs={blogs} />} />
				<Route path='/blogs/:id' element={<BlogPage blogs={blogs} />} />
			</Routes>
		</Router>
	)
}

export default App
