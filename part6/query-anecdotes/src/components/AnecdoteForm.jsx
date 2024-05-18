import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { NotificationContext} from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification ,dispatch] = useContext(NotificationContext)

  const createAnecdote = async(newAnecdote) => {
    if(newAnecdote.content.length < 5 ){
      dispatch({
        type: "anecdote-added",
        payload: "Anecdote too short must have atleast 5 or more characters"
      })
      setTimeout(() => {
        dispatch({
          type: "reset"
        })
      }, 3000);
      throw new Error("too short anecdote must have atleast 5 or more characters")
    }
    try {      
      const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
      dispatch({
        type: "anecdote-added",
        payload: "anecdote added succesfully"
      })
      return response.data
    } catch (error) {
     console.log(error);
    }
  }

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "anecdote-added",
        payload: `Anecdote added`
      })
       setTimeout(() => {
        dispatch({
          type: "reset"
        })
       }, 3000);
    },
    onError: (error) => {
      dispatch({
        type: "anecdote-added",
        payload: `Anecdote ${error.message}`
      })
      setTimeout(() => {
        dispatch({
          type: "reset"
        })
      }, 3000);
     }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({content, votes: 0})
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
