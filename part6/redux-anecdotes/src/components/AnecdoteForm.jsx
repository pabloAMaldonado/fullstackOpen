
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { newAnecdotes } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notiReducer'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()

    const inputSubmit = (event) => {
        event.preventDefault()
        const newAnecdote = asObject(anecdote)

        dispatch(newAnecdotes(newAnecdote))
        dispatch(setNotificationWithTimeout('The new anecdote was added succesfully.', 10))

        setAnecdote('')
      }
    
      const inputHandle = (event) => {
        setAnecdote(event.target.value)
      }
    
      return (
        <>
            <h2>create new</h2>
            <form onSubmit={inputSubmit}>
            <div><input name='input' placeholder='content here' value={anecdote} onChange={inputHandle} /></div>
            <button type='submit'>create</button>
            </form>
        </>
      )
}

export default AnecdoteForm
