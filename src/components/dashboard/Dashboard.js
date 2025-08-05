import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BookingSystem from '../booking/BookingSystem';
import ThemeToggle from '../ThemeToggle';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [showBooking, setShowBooking] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/auth');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleBookTicket = () => {
        setShowBooking(true);
    };

    const handleBackToDashboard = () => {
        setShowBooking(false);
    };

    if (showBooking) {
        return (
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div className="header-content">
                        <h1>Bus Ticket Booking</h1>
                        <div className="user-info">
                            <span>Welcome nigga,</span>
                            <ThemeToggle />
                            <button onClick={handleBackToDashboard} className="back-button">
                                ← Back to Dashboard
                            </button>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main className="dashboard-main">
                    <BookingSystem />
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                    <div className="header-content">
                        <h1>Pakistan Bus Ticket System</h1>
                        <div className="user-info">
                            <span>Welcome, {currentUser?.email}</span>
                            <ThemeToggle />
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </div>
                    </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="welcome-section">
                        <h2>Welcome to Pakistan Bus Ticket System</h2>
                        <p>Book tickets for intercity travel across Pakistan's major cities.</p>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <h3>Book Tickets</h3>
                            <p>Search and book bus tickets for your journey across Pakistan</p>
                            <button className="card-button" onClick={handleBookTicket}>
                                Book Now
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h3>My Bookings</h3>
                            <p>View and manage your active bookings</p>
                            <button className="card-button">View Bookings</button>
                        </div>

                        <div className="dashboard-card">
                            <h3>Travel History</h3>
                            <p>Check your past trips and usage</p>
                            <button className="card-button">View History</button>
                        </div>

                        <div className="dashboard-card">
                            <h3>Account Settings</h3>
                            <p>Update your profile and preferences</p>
                            <button className="card-button">Settings</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 