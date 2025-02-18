
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		notificationHandler(state, action) {
			return action.payload
		},
		clearNotification() {
			return initialState
		}
	}
})

export const { notificationHandler, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, time) => {
	return dispatch => {
		dispatch(notificationHandler(message))
		setTimeout(() => {
			dispatch(clearNotification())
		}, time*1000)
	}
}

export default notificationSlice.reducer
