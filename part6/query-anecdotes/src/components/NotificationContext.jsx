import { createContext } from "react"
import { useReducer } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "anecdote-added":
      return action.payload
    case "reset":
      return null
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, "")

  return (
    <NotificationContext.Provider value={[notification, dispatch]} >
      { children }
    </NotificationContext.Provider>
  )
}
