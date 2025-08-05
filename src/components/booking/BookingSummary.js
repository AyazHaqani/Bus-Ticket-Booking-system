import React from 'react';
import './BookingSummary.css';

const BookingSummary = ({ route, seats, bookingData, onBookingDataChange, onSubmit, onBack }) => {
    const totalAmount = seats.length * route.price;

    const handleInputChange = (field, value) => {
        onBookingDataChange(field, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!bookingData.passengerName.trim()) {
            alert('Please enter passenger name.');
            return;
        }
        if (!bookingData.passengerEmail.trim()) {
            alert('Please enter passenger email.');
            return;
        }
        if (!bookingData.passengerPhone.trim()) {
            alert('Please enter passenger phone number.');
            return;
        }

        onSubmit();
    };

    return (
        <div className="booking-summary">
            <div className="summary-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back to Seat Selection
                </button>
                <h3>Confirm Your Booking</h3>
            </div>

            <div className="summary-content">
                <div className="booking-details">
                    <div className="route-summary-card">
                        <h4>Route Details</h4>
                        <div className="route-info">
                            <div className="route-cities">
                                <span className="from">{route.from}</span>
                                <span className="arrow">→</span>
                                <span className="to">{route.to}</span>
                            </div>
                            <div className="route-times">
                                <div className="time-info">
                                    <span className="label">Departure:</span>
                                    <span className="time">{route.departureTime}</span>
                                </div>
                                <div className="time-info">
                                    <span className="label">Arrival:</span>
                                    <span className="time">{route.arrivalTime}</span>
                                </div>
                                <div className="time-info">
                                    <span className="label">Duration:</span>
                                    <span className="time">{route.duration}</span>
                                </div>
                            </div>
                            <div className="route-meta">
                                <span className="bus-type">{route.busType}</span>
                                <span className="price-per-seat">Rs. {route.price} per seat</span>
                            </div>
                        </div>
                    </div>

                    <div className="seats-summary-card">
                        <h4>Selected Seats</h4>
                        <div className="seats-list">
                            {seats.map(seatId => (
                                <span key={seatId} className="seat-tag">
                                    Seat {seatId}
                                </span>
                            ))}
                        </div>
                        <div className="seats-count">
                            Total Seats: {seats.length}
                        </div>
                    </div>

                    <div className="price-summary-card">
                        <h4>Price Breakdown</h4>
                        <div className="price-details">
                            <div className="price-row">
                                <span>Seats ({seats.length} × Rs. {route.price})</span>
                                <span>Rs. {totalAmount}</span>
                            </div>
                            <div className="price-row total">
                                <span>Total Amount</span>
                                <span>Rs. {totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="passenger-form">
                    <h4>Passenger Information</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="passengerName">Full Name *</label>
                            <input
                                type="text"
                                id="passengerName"
                                value={bookingData.passengerName}
                                onChange={(e) => handleInputChange('passengerName', e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passengerEmail">Email Address *</label>
                            <input
                                type="email"
                                id="passengerEmail"
                                value={bookingData.passengerEmail}
                                onChange={(e) => handleInputChange('passengerEmail', e.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passengerPhone">Phone Number *</label>
                            <input
                                type="tel"
                                id="passengerPhone"
                                value={bookingData.passengerPhone}
                                onChange={(e) => handleInputChange('passengerPhone', e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                value={bookingData.paymentMethod}
                                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            >
                                <option value="card">Credit/Debit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cash">Cash on Board</option>
                            </select>
                        </div>

                        <div className="booking-actions">
                            <button type="button" className="cancel-btn" onClick={onBack}>
                                Cancel
                            </button>
                            <button type="submit" className="confirm-btn">
                                Confirm Booking - Rs. {totalAmount}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingSummary; 