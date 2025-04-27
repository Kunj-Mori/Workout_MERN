import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import "./WorkoutDetail.css"

function WorkoutDetail({ workout }) {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if(!user) {
            return
        }
        
        try {
            setIsDeleting(true)
            const response = await fetch("/api/workouts/" + workout._id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok) {
                dispatch({type: "DELETE_WORKOUT", payload: json})
            }
        } catch (error) {
            console.error('Error deleting workout:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="workout-card">
            <div className="workout-header">
                <h3>{workout.title}</h3>
                <button 
                    onClick={handleDelete} 
                    className={`delete-btn ${isDeleting ? 'deleting' : ''}`}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <i className="fas fa-trash-alt"></i>
                    )}
                </button>
            </div>

            <div className="workout-stats">
                <div className="stat">
                    <i className="fas fa-weight"></i>
                    <div className="stat-info">
                        <label>Weight</label>
                        <span>{workout.load} kg</span>
                    </div>
                </div>

                <div className="stat">
                    <i className="fas fa-redo"></i>
                    <div className="stat-info">
                        <label>Reps</label>
                        <span>{workout.reps}</span>
                    </div>
                </div>
            </div>

            <div className="workout-footer">
                <div className="created-at">
                    <i className="far fa-clock"></i>
                    {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetail