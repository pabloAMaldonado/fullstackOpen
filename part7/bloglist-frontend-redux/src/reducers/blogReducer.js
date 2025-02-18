
import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogService'
import { setNotificationWithTimeout } from './notiReducer'

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
		try {
			const blogs = await blogService.getAll()
			blogs.forEach(blog => {
				dispatch(appendBlogs(blog))
			})
		} catch (err) {
			dispatch(setNotificationWithTimeout('Error loading blogs.', 3))
		}
	}
}
export const newBlog = (content, token) => {
	return async dispatch => {
		try {
			const blog = await blogService.newBlog(content, token)
			dispatch(appendBlogs(blog))
			dispatch(setNotificationWithTimeout(`${blog.name} added succefully.`,5))
		}catch (err) {
			dispatch(setNotificationWithTimeout('Error adding new blog.'), 3)
		}
	}
}

export const removeBlog = (blog, token) => {
	return async dispatch => {
		try {
			await blogService.removeBlog(blog, token)
			dispatch(deleteBlog(blog.id))
			dispatch(setNotificationWithTimeout('Blog removed succefully.',5))
		} catch (err) {
			dispatch(setNotificationWithTimeout('Blog failed to be removed.',3))
		}
	}
}

export const sendLikeBlog = (content, token) => {
	return async dispatch => {
		await blogService.likeBlog(content, token)
		dispatch(likeBlog(content.id))
	}
}

export default blogSlice.reducer