
import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlogs = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const newBlog = async (data) => {
	const { token, content } = data

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	console.log(token)
	const response = await axios.post(baseUrl, content, config)
	return response.data
}



const likeBlog = async (data) => {
	const { blog, token } = data
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	const response = await axios.put(baseUrl + `/like/${blog.id}`, blog, config)

	return response.data
}

const removeBlog = async (data) => {
	const { blog, token } = data
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	console.log(blog, token)
	const response = await axios.delete(baseUrl + `/${blog.id}`, config)

	return response
}


export default {
	getBlogs,
	newBlog,
	likeBlog,
	removeBlog,
}
