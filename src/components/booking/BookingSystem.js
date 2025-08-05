import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import RouteSelection from './RouteSelection';
import SeatSelection from './SeatSelection';
import BookingSummary from './BookingSummary';
import './BookingSystem.css';

const BookingSystem = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookingData, setBookingData] = useState({
        passengerName: '',
        passengerEmail: '',
        passengerPhone: '',
        paymentMethod: 'card'
    });
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const routesCollection = collection(db, 'routes');
            const routesSnapshot = await getDocs(routesCollection);
            const routesList = routesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRoutes(routesList);
        } catch (error) {
            console.error('Error fetching routes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRouteSelect = (route) => {
        setSelectedRoute(route);
        setCurrentStep(2);
    };

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
        setCurrentStep(3);
    };

    const handleBookingDataChange = (field, value) => {
        setBookingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBookingSubmit = async () => {
        try {
            const booking = {
                routeId: selectedRoute.id,
                routeDetails: selectedRoute,
                seats: selectedSeats,
                passengerInfo: bookingData,
                totalAmount: selectedSeats.length * selectedRoute.price,
                bookingDate: new Date(),
                status: 'confirmed'
            };

            const docRef = await addDoc(collection(db, 'bookings'), booking);
            alert(`Booking confirmed! Booking ID: ${docRef.id}`);
            setCurrentStep(1);
            setSelectedRoute(null);
            setSelectedSeats([]);
            setBookingData({
                passengerName: '',
                passengerEmail: '',
                passengerPhone: '',
                paymentMethod: 'card'
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Error creating booking. Please try again.');
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (loading) {
        return <div className="loading">Loading routes...</div>;
    }

    return (
        <div className="booking-system">
            <div className="booking-header">
                <h2>Book Your Bus Ticket</h2>
                <div className="booking-steps">
                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Select Route</span>
                    </div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Choose Seats</span>
                    </div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Confirm Booking</span>
                    </div>
                </div>
            </div>

            <div className="booking-content">
                {currentStep === 1 && (
                    <RouteSelection 
                        routes={routes} 
                        onRouteSelect={handleRouteSelect}
                    />
                )}
                
                {currentStep === 2 && selectedRoute && (
                    <SeatSelection 
                        route={selectedRoute}
                        onSeatSelect={handleSeatSelect}
                        onBack={goBack}
                    />
                )}
                
                {currentStep === 3 && selectedRoute && selectedSeats.length > 0 && (
                    <BookingSummary 
                        route={selectedRoute}
                        seats={selectedSeats}
                        bookingData={bookingData}
                        onBookingDataChange={handleBookingDataChange}
                        onSubmit={handleBookingSubmit}
                        onBack={goBack}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingSystem; 