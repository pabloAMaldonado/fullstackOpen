
import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/userService'

const initializeUser = () => {
	const savedUser = JSON.parse(window.localStorage.getItem('user'))
	return savedUser || null
}

const userSlice = createSlice({
	name: 'user',
	initialState: initializeUser(),
	reducers: {
		loginUser(state, action) {
			const user = action.payload
			window.localStorage.setItem('user', JSON.stringify(user))
			return user
		},
		logoutUser() {
			return null
		}
	}
})

export const { loginUser, logoutUser } = userSlice.actions

export const setToken = (data) => {
	return async dispatch => {
		const user = await loginService.postLogin(data)

		dispatch(loginUser(user))
	}
}

export const logoutToken = () => {
	return  dispatch => {
		loginService.postLogout()

		dispatch(logoutUser())
	}
}

export default userSlice.reducer