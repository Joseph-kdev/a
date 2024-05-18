import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes";


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    votes(state, action) {
      const votedAnecdote = action.payload;
      const newAnecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1}
      const { id } = newAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : newAnecdote
      );
    },
    add(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { votes, add, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async(dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch(votes(newAnecdote))
  }
}
export default anecdoteSlice.reducer