
import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/userService'
import { setNotificationWithTimeout } from './notiReducer'

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
		try {
			const user = await loginService.postLogin(data)
			dispatch(loginUser(user))
			dispatch(setNotificationWithTimeout(`${user.name} logged in.`, 5))
		} catch (err) {
			dispatch(setNotificationWithTimeout('Error on credentials.', 3))
		}
	}
}

export const logoutToken = (event) => {
	return  dispatch => {
		event.preventDefault()
		loginService.postLogout()

		dispatch(logoutUser())
	}
}

export default userSlice.reducer