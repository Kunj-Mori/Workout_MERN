import { useState } from 'react'
import './BMICalculator.css'

function BMICalculator() {
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState(null)
    const [status, setStatus] = useState('')

    const calculateBMI = (e) => {
        e.preventDefault()
        
        if (height && weight) {
            // Convert height to meters (assuming input is in cm)
            const heightInMeters = height / 100
            // Calculate BMI
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
            setBMI(bmiValue)

            // Determine BMI status
            if (bmiValue < 18.5) {
                setStatus('Underweight')
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                setStatus('Normal weight')
            } else if (bmiValue >= 25 && bmiValue < 30) {
                setStatus('Overweight')
            } else {
                setStatus('Obese')
            }
        }
    }

    const handleReset = () => {
        setHeight('')
        setWeight('')
        setBMI(null)
        setStatus('')
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>BMI Calculator</h2>
                <p>Track your body mass index</p>
            </div>
            
            <div className="dashboard-content">
                <div className="calculator-container">
                    <form onSubmit={calculateBMI}>
                        <div className="form-group">
                            <label>
                                <i className="fas fa-ruler-vertical"></i>
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Enter height in centimeters"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <i className="fas fa-weight"></i>
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Enter weight in kilograms"
                                required
                            />
                        </div>

                        <div className="bmi-buttons">
                            <button type="submit" className="calculate-btn">
                                <i className="fas fa-calculator"></i>
                                Calculate BMI
                            </button>
                            <button type="button" onClick={handleReset} className="reset-btn">
                                <i className="fas fa-redo"></i>
                                Reset
                            </button>
                        </div>
                    </form>

                    {bmi && (
                        <div className="result-section">
                            <h3>Your Results</h3>
                            <div className="bmi-value">
                                <span className="number">{bmi}</span>
                                <span className="label">BMI</span>
                            </div>
                            <div className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                                {status}
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-container">
                    <div className="info-header">
                        <h3>BMI Categories</h3>
                        <p>Understanding your results</p>
                    </div>
                    <div className="bmi-categories">
                        <div className="category">
                            <span className="category-range">Below 18.5</span>
                            <span className="category-label underweight">Underweight</span>
                        </div>
                        <div className="category">
                            <span className="category-range">18.5 - 24.9</span>
                            <span className="category-label normal-weight">Normal weight</span>
                        </div>
                        <div className="category">
                            <span className="category-range">25.0 - 29.9</span>
                            <span className="category-label overweight">Overweight</span>
                        </div>
                        <div className="category">
                            <span className="category-range">30.0 or above</span>
                            <span className="category-label obese">Obese</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BMICalculator 