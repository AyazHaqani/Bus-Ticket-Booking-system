import React, { useState } from 'react';
import './SeatSelection.css';

const SeatSelection = ({ route, onSeatSelect, onBack }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [maxSeats] = useState(4); // Maximum seats per booking

    // Generate seat layout (4 rows x 4 columns = 16 seats)
    const generateSeats = () => {
        const seats = [];
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                const seatNumber = `${row}${col.toString().padStart(2, '0')}`;
                seats.push({
                    id: seatNumber,
                    row: row,
                    col: col,
                    isOccupied: Math.random() < 0.3, // 30% chance of being occupied
                    isSelected: false
                });
            }
        }
        return seats;
    };

    const [seats, setSeats] = useState(generateSeats());

    const handleSeatClick = (seatId) => {
        const updatedSeats = seats.map(seat => {
            if (seat.id === seatId) {
                if (seat.isOccupied) return seat;

                if (seat.isSelected) {
                    return { ...seat, isSelected: false };
                } else {
                    if (selectedSeats.length >= maxSeats) {
                        alert(`You can only select up to ${maxSeats} seats.`);
                        return seat;
                    }
                    return { ...seat, isSelected: true };
                }
            }
            return seat;
        });

        setSeats(updatedSeats);

        const newSelectedSeats = updatedSeats
            .filter(seat => seat.isSelected)
            .map(seat => seat.id);
        setSelectedSeats(newSelectedSeats);
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }
        onSeatSelect(selectedSeats);
    };

    const totalPrice = selectedSeats.length * route.price;

    return (
        <div className="seat-selection">
            <div className="seat-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back to Routes
                </button>
                <h3>Select Your Seats</h3>
                <div className="route-summary">
                    <span>{route.from} → {route.to}</span>
                    <span className="route-time">{route.departureTime} - {route.arrivalTime}</span>
                </div>
            </div>

            <div className="seat-layout-container">
                <div className="seat-legend">
                    <div className="legend-item">
                        <div className="seat-example available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="seat-example selected"></div>
                        <span>Selected</span>
                    </div>
                    <div className="legend-item">
                        <div className="seat-example occupied"></div>
                        <span>Occupied</span>
                    </div>
                </div>

                <div className="bus-layout">
                    <div className="driver-area">
                        <div className="driver-seat">Driver</div>
                    </div>

                    <div className="seats-grid">
                        {seats.map(seat => (
                            <div
                                key={seat.id}
                                className={`seat ${seat.isOccupied ? 'occupied' : ''} ${seat.isSelected ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(seat.id)}
                                title={`Seat ${seat.id}`}
                            >
                                {seat.id}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="seat-selection-summary">
                <div className="selected-seats-info">
                    <h4>Selected Seats: {selectedSeats.length}</h4>
                    {selectedSeats.length > 0 && (
                        <div className="selected-seats-list">
                            {selectedSeats.map(seatId => (
                                <span key={seatId} className="selected-seat-tag">
                                    Seat {seatId}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="price-summary">
                    <div className="price-breakdown">
                        <span>Seats: {selectedSeats.length} × Rs. {route.price}</span>
                        <span className="total-price">Total: Rs. {totalPrice}</span>
                    </div>
                    <button
                        className="continue-btn"
                        onClick={handleContinue}
                        disabled={selectedSeats.length === 0}
                    >
                        Continue to Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection; 