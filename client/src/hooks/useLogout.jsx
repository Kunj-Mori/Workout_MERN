import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export function useLogout() {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    function logout() {
        // Remove user from store
        localStorage.removeItem("user")

        // Dispatch logout action
        dispatch({ type: "LOGOUT" })
        workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
    }

    return { logout }
}