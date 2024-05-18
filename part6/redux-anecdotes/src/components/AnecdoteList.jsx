import { orderBy } from "lodash";
import { initializeAnecdotes, voteAnecdote} from "../reducers/anecdoteReducer";
import { useDispatch,useSelector } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
  state.filter
    ? state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    : state.anecdotes
  );
  const dispatch = useDispatch()
  
  const handleVote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
  }
  useEffect (() => {
    dispatch(initializeAnecdotes())
  }, [])

  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));

}
 
export default AnecdoteList;