
import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogService'

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		appendBlogs(state, action) {
			state.push(action.payload)
		},
		likeBlog(state, action) {
			const id = action.payload
			const blog = state.find(blog => blog.id === id)
			if (blog) {
				blog.likes += 1
			}
		},
		deleteBlog(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		}
	}
})

export const { appendBlogs, likeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		blogs.forEach(blog => {
			dispatch(appendBlogs(blog))
		})
	}
}

export const newBlog = (content, token) => {
	return async dispatch => {
		const blog = await blogService.newBlog(content, token)
		dispatch(appendBlogs(blog))
	}
}

export const removeBlog = (content, token) => {
	return async dispatch => {
		await blogService.removeBlog(content, token)
		dispatch(deleteBlog(content.id))
	}
}

export default blogSlice.reducer