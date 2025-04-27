import { createContext, useReducer } from "react"

const WorkoutContext = createContext()

function workoutsReducer(state, action) {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUTS":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

function WorkoutContextProvider({ children }) {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}

export { WorkoutContext, WorkoutContextProvider }