import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NotificationContext } from './components/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const baseUrl = 'http://localhost:3001/anecdotes'
  const[notification, dispatch] = useContext(NotificationContext)

  const updateAnec = async(updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
  }

  const updateAnecMutation = useMutation({
    mutationFn: updateAnec,
    onSuccess: (anecdotes) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      dispatch({
        type: "anecdote-added",
        payload: `Anecdote ${anecdotes.content} voted`
      })
      setTimeout(() => {
        dispatch({
          type: "reset",
        })
      }, 3000);
    }
  })

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const getAnecdotes = async() => {
    const response = await axios.get(`${baseUrl}`)
    return response.data
  }

  const {data: anecdotes, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Anecdote service has an error</div>
  }

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
