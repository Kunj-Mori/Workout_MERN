import { useLogout } from '../hooks/useLogout'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Sidebar.css'

function Sidebar() {
    const { logout } = useLogout()
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const handleLogout = () => {
        logout()
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const handleLinkClick = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false)
        }
    }

    return (
        <>
            <button 
                className={`sidebar-toggle ${isOpen ? 'open' : ''}`} 
                onClick={toggleSidebar}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Fitness Tracker</h2>
                </div>
                
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link 
                                to="/" 
                                className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                <i className="fas fa-dumbbell"></i>
                                <span>Your Workouts</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/bmi" 
                                className={`nav-item ${location.pathname === '/bmi' ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                <i className="fas fa-calculator"></i>
                                <span>BMI Calculator</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar 