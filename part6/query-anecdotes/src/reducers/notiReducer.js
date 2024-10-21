
import { createContext, useContext } from "react"

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export const notificationHandler = (message) => ({
    type: 'INPUT',
    payload: message
})

export const clearNotification = () => ({
    type: 'CLEAR'
})

export const setNotificationWithTimeout = (dispatch, message, time) => {
    
        dispatch(notificationHandler(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    
}

export const NotiContext = createContext()

export const useNotiValue = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[0]
  }
  
export const useNotiDispatch = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[1]
}

export const useNotification = () => useContext(NotiContext)


export default notiReducer
