
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Blog from '../Blog'
import NavigationMenu from '../NavigationMenu'

const MainPage = () => {
	const user = useSelector(state => state.user)

	const [showBlogForm, setShowBlogForm] = useState(false)

	const buttonStyle = {
		margin: '10px'
	}

	return (
		<div>
			<NavigationMenu />

			{user && showBlogForm && (
				<Blog.FormBlogs setShow={setShowBlogForm} />
			)}

			<br />

			{showBlogForm === false && user && (
				<button style={buttonStyle} onClick={() => setShowBlogForm(true)}>New Blog</button>
			)}

			{user && (
				<Blog.DisplayBlogs />
			)}
		</div>
	)
}

export default MainPage
