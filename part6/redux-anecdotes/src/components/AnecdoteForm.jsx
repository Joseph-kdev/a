import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const dispatch = useDispatch()

    const addAnecdote = async(e) => {
        e.preventDefault()
        const value = e.target.anecdote.value
        e.target.anecdote.value = ""
        const newAnecdote = {
          content: value,
          id: getId(),
          votes: 0
        }
        dispatch(createAnecdote(newAnecdote))
        dispatch(createNotification(`New anecdote added : ${newAnecdote.content}`, 5))
      }

    return ( 
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote} >
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
        </div>
     );
}
 
export default AnecdoteForm;