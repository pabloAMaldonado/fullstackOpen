
import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    anecdotes.forEach(anecdote => {
      dispatch(appendAnecdote(anecdote))
    })
  }
}

export const newAnecdotes = (content) => {
  return async dispatch => {
    const newAntecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAntecdote))
  }
}

export const handleVote = (content) => {
  return async dispatch => {
    const anecdoteVoted = await anecdoteService.voteAnecdote(content)
    dispatch(voteAnecdote(anecdoteVoted.id))
  }
}

export default anecdoteSlice.reducer
