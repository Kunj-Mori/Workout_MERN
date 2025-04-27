import { createContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(function() {
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    console.log("AuthContext state:", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider, authReducer }