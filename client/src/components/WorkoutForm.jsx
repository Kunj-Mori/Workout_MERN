import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import "./WorkoutForm.css"

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [formData, setFormData] = useState({
        title: "",
        load: "",
        reps: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { title, load, reps } = formData

    function handleChange(e) {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error when user types
        if (emptyFields.includes(name)) {
            setEmptyFields(emptyFields.filter(field => field !== name))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(!user) {
            setError("You must be logged in")
            return
        }

        try {
            setIsSubmitting(true)
            const workout = {title, load, reps}
            const response = await fetch("/api/workouts", {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields || [])
            }

            if(response.ok) {
                setError(null)
                setEmptyFields([])
                setFormData({
                    title: "",
                    load: "",
                    reps: ""
                })
                dispatch({type: "CREATE_WORKOUTS", payload: json})
            }
        } catch (err) {
            setError("Failed to add workout. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="workout-form-container">
            <form className="workout-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3>Add New Workout</h3>
                    <p>Track your exercise progress</p>
                </div>

                <div className="form-group">
                    <label htmlFor="title">
                        <i className="fas fa-dumbbell"></i>
                        Exercise Title
                    </label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        value={title}
                        placeholder="e.g., Bench Press"
                        className={emptyFields.includes("title") ? "error" : ''}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="load">
                        <i className="fas fa-weight-hanging"></i>
                        Load (kg)
                    </label>
                    <input 
                        type="number" 
                        id="load"
                        name="load"
                        onChange={handleChange}
                        value={load}
                        placeholder="e.g., 50"
                        className={emptyFields.includes("load") ? "error" : ''}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reps">
                        <i className="fas fa-redo"></i>
                        Reps
                    </label>
                    <input 
                        type="number" 
                        id="reps"
                        name="reps"
                        onChange={handleChange}
                        value={reps}
                        placeholder="e.g., 12"
                        className={emptyFields.includes("reps") ? "error" : ''}
                    />
                </div>

                <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Adding...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-plus"></i>
                            Add Workout
                        </>
                    )}
                </button>

                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}

export default WorkoutForm