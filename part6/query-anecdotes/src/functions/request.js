
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)
  
export const createAnecdote = content =>
    axios.post(baseUrl, content).then(res => res.data)

export const voteAnecdote = anecdote => {
    const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    axios.put(`${baseUrl}/${anecdote.id}`, votedAnecdote).then(res => res.data)
}