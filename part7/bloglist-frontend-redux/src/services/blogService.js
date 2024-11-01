
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const newBlog = async (newObject, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}



const likeBlog = async (blog, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	const response = await axios.put(baseUrl + `/like/${blog.id}`, blog, config)

	blog = response.data

	return response.data
}

const removeBlog = async (blog, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	console.log(config)
	const response = await axios.delete(baseUrl + `/${blog.id}`, config)

	return response
}


export default {
	getAll,
	newBlog,
	likeBlog,
	removeBlog,
}
