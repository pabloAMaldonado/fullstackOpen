
import { useState } from 'react'
import Blog from '../Blog'
import NavigationMenu from '../NavigationMenu'
import { useUserValue } from '../../context/userContext'

const MainPage = () => {
	const user = useUserValue()

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
