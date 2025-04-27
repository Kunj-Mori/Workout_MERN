import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export function useLogin() {
    const [event, setEvent] = useState({
        error: null,
        isLoading: null
    })

    const { dispatch } = useAuthContext()

    const { error, isLoading } = event

    async function login(usernameOrEmail, password) {
        setEvent({
            isLoading: true,
            error: null
        })

        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernameOrEmail, password })
        })
        const json = await response.json()

        if(!response.ok) {
            setEvent({
                isLoading: false,
                error: json.error
            })
        }
        if(response.ok) {
            // Save the user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            // Update the auth context
            dispatch({ type: "LOGIN", payload: json })

            setEvent({ isLoading: false })
        }
    }

    return { login, isLoading, error }
}