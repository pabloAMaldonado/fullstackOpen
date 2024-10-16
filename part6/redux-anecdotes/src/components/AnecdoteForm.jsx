
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()

    const inputSubmit = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(anecdote))
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
