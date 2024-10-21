
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotiValue } from "./reducers/notiReducer"


import { getAnecdotes, voteAnecdote } from './functions/request'
import { useNotiDispatch, setNotificationWithTimeout } from './reducers/notiReducer'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotiDispatch()
  const notification = useNotiValue()

  const votingAnecdote = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(({ queryKey: ['anecdotes'] }))
    }
  })

  const handleVote = (anecdote) => {
    votingAnecdote.mutate(anecdote)
    setNotificationWithTimeout(dispatch, `You voted for ${anecdote.content}`, 3)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdotes service not avalible due to probles in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
