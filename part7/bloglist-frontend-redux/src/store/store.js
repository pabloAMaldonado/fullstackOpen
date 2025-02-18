
import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../reducers/userReducer'
import blogSlice from '../reducers/blogReducer'
import notiSlice from '../reducers/notiReducer'

const store = configureStore({
	reducer: {
		user: userSlice,
		blog: blogSlice,
		noti: notiSlice
	}
})

export default store
