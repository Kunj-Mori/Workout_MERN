import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import BMICalculator from "./pages/BMICalculator"
import Sidebar from "./components/Sidebar"
import './App.css'

function App() {
    const { user } = useAuthContext()

    return (
        <div className="App">
            {user && <Sidebar />}
            <div className={`pages ${user ? 'with-sidebar' : ''}`}>
                <Routes>
                    <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
                    <Route path="/bmi" element={user ? <BMICalculator /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
