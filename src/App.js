import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginSignup from './components/auth/LoginSignup';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <div className="App">
                        <Routes>
                            <Route path="/auth" element={<LoginSignup />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
