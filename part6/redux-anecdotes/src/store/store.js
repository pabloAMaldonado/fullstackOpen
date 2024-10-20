
import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationSlice from '../reducers/notiReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationSlice
    }
  })

  
export default store