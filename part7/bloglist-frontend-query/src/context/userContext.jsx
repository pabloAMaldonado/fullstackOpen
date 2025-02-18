
import { useReducer, createContext, useContext } from 'react'


const userReducer = (state, action) => {
	switch (action.type) {
	case 'LOGIN': {
		return { ...state, ...action.payload }
	}
	case 'LOGOUT':
		return null
	}
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
	const savedUser = JSON.parse(window.localStorage.getItem('user')) || null
	const [user, userDispatch] = useReducer(userReducer, savedUser)
	return (
		<UserContext.Provider value={[user, userDispatch] }>
			{props.children}
		</UserContext.Provider>
	)
}

export const useUserValue = () => {
	const value = useContext(UserContext)
	return value[0]
}

export const useUserDispatch = () => {
	const dispatch = useContext(UserContext)
	return dispatch[1]
}

export default UserContext
