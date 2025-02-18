import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import blogService from '../services/blogService'

const BlogWithToggle = (props) => {
	const [isFull, setIsFull] = useState(false)

	const toggleExpand = () => setIsFull(!isFull)

	return (
		<Blog.Blog
			{...props}
			isFull={isFull}
			toggleExpand={toggleExpand}
		/>
	)
}

test('blog initially only shows blog s title and author', () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'http://example.com',
		likes: 10,
	}

	render(
		<Blog.Blog
			blog={blog}
			isFull={false}
		/>,
	)

	const titleElement = screen.getByText('test by me')
	expect(titleElement).toBeDefined()

	const button = screen.getByText('view')
	expect(button).toBeDefined()

	const urlElement = screen.queryByText('Url:')
	const likesElement = screen.queryByText('Likes')

	expect(urlElement).toBeNull()
	expect(likesElement).toBeNull()
})

test('when the view button is clicked the blog s url and likes is shown aswell', async () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'http://example.com',
		likes: 10,
	}

	render(<BlogWithToggle blog={blog} />)
	expect(screen.queryByText('Url:')).toBeNull()
	expect(screen.queryByText('Likes')).toBeNull()

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	expect(screen.getByText('Url:')).toBeDefined()
	expect(screen.getByText('10 Likes')).toBeDefined()
})

test('the like button calls the likeBlog function twice when clicked twice', async () => {
	const mockHandler = vi.fn()
	render(<Blog.LikeButton handleLike={mockHandler} />)

	const user = userEvent.setup()
	const button = screen.getByText('Like')

	await user.click(button)
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('When the blog form is filled and submitted, the blog s details are returned correctly', async () => {
	const blogs = []
	const setBlogs = vi.fn()
	const setShow = vi.fn()
	const setNoti = vi.fn()

	blogService.newBlog = vi.fn().mockResolvedValue({
		data: { title: 'testing', author: 'me', url: 'http://example.com' },
		status: 201,
	})

	render(
		<Blog.FormBlogs
			setShow={setShow}
			blogs={blogs}
			setBlogs={setBlogs}
			setNoti={setNoti}
		/>,
	)

	const user = userEvent.setup()

	const titleInput = screen.getByPlaceholderText('title')
	const authorInput = screen.getByPlaceholderText('author')
	const urlInput = screen.getByPlaceholderText('url')

	await user.type(titleInput, 'testing')
	await user.type(authorInput, 'me')
	await user.type(urlInput, 'http://example.com')

	const submitButton = screen.getByRole('button', { name: /post/i })
	await user.click(submitButton)

	expect(blogService.newBlog).toHaveBeenCalledWith({
		title: 'testing',
		author: 'me',
		url: 'http://example.com',
	})

	expect(setBlogs).toHaveBeenCalledWith([
		...blogs,
		{ title: 'testing', author: 'me', url: 'http://example.com' },
	])

	expect(setNoti).toHaveBeenCalledWith({
		status: 201,
		message: 'Blog posted Successfully',
	})

	expect(setShow).toHaveBeenCalledWith(false)
})
