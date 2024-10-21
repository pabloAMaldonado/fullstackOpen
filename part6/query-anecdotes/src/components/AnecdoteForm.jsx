
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../functions/request'
import { useNotiDispatch, setNotificationWithTimeout } from '../reducers/notiReducer'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotiDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(({ queryKey: ['anecdotes'] }))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content >= 5) {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      setNotificationWithTimeout(dispatch, 'Anecdote creade successfully!', 10)
    } else {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      setNotificationWithTimeout(dispatch, 'The anecdote must be at least 5 chracters.', 10)
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
