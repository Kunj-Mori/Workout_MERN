import { useCallback, useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import WorkoutDetail from "../components/WorkoutDetail"
import WorkoutForm from "../components/WorkoutForm"
import "./Home.css"

function Home() {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchWorkouts = useCallback(async function() {
        try {
            const response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json})
                setError(null)
            } else {
                setError(json.error || 'Failed to fetch workouts')
            }
        } catch (err) {
            setError('Network error: Could not fetch workouts')
        } finally {
            setIsLoading(false)
        }
    }, [dispatch, user])

    useEffect(function() {
        if(user) {
            fetchWorkouts()
        }
    }, [fetchWorkouts, user])

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Your Workouts</h2>
                <p>Track and manage your fitness journey</p>
            </div>

            <div className="dashboard-content">
                <div className="workouts-container">
                    <div className="workouts-header">
                        <h3>Recent Workouts</h3>
                        <button onClick={() => fetchWorkouts()} className="refresh-btn">
                            <i className="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="loading-state">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Loading your workouts...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <i className="fas fa-exclamation-circle"></i>
                            <p>{error}</p>
                        </div>
                    ) : workouts && workouts.length > 0 ? (
                        <div className="workouts-grid">
                            {workouts.map((workout) => (
                                <WorkoutDetail key={workout._id} workout={workout}/>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-dumbbell"></i>
                            <p>No workouts yet. Start by adding one!</p>
                        </div>
                    )}
                </div>
                
                <div className="form-container">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    )
}

export default Home