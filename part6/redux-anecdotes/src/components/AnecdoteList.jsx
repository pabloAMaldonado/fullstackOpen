
import { useSelector, useDispatch } from 'react-redux'

import { handleVote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notiReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  const dispatch = useDispatch()
      
  const vote = (anecdote) => {
    dispatch(handleVote(anecdote))
    dispatch(setNotificationWithTimeout(`You voted '${anecdote.content}'`, 3))
  }
      
  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)} >vote</button>
          </div>
        </div>
      )}
    </div>
  )    
}

export default AnecdoteList
