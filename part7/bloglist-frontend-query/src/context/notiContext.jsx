
import { useReducer, createContext, useContext } from 'react'

const notiReducer = (state, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return action.payload
	case 'CLEAR_NOTIFICATION':
		return ''
	default:
		return state
	}
}

const NotiContext = createContext()

export const NotiContextProvider = (props) => {
	const [noti, notiDispatch] = useReducer(notiReducer, '')

	return (
		<NotiContext.Provider value={[noti, notiDispatch]} >
			{props.children}
		</NotiContext.Provider>
	)
}

export const setNotificationWithTimeout = (dispatch, message, time) => {
	dispatch({
		type: 'SET_NOTIFICATION',
		payload: message
	})
	setTimeout(() => {
		dispatch({
			type: 'CLEAR_NOTIFICATION'
		})
	}, time*1000)
}

export const useNotiValue = () => {
	const value = useContext(NotiContext)
	return value[0]
}

export const useNotiDispatch = () => {
	const dispatch = useContext(NotiContext)
	return dispatch[1]
}

export default NotiContext
