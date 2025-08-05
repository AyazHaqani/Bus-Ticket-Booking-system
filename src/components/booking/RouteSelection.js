import React, { useState } from 'react';
import './RouteSelection.css';

const RouteSelection = ({ routes, onRouteSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');

    // Sample routes data for Pakistan (you can replace this with Firebase data)
    const sampleRoutes = [
        {
            id: '1',
            from: 'Karachi',
            to: 'Lahore',
            departureTime: '08:00',
            arrivalTime: '20:00',
            price: 2500,
            duration: '12h',
            busType: 'Express',
            availableSeats: 25
        },
        {
            id: '2',
            from: 'Lahore',
            to: 'Islamabad',
            departureTime: '09:30',
            arrivalTime: '13:30',
            price: 1200,
            duration: '4h',
            busType: 'Premium',
            availableSeats: 18
        },
        {
            id: '3',
            from: 'Islamabad',
            to: 'Peshawar',
            departureTime: '10:00',
            arrivalTime: '12:30',
            price: 800,
            duration: '2.5h',
            busType: 'Express',
            availableSeats: 30
        },
        {
            id: '4',
            from: 'Karachi',
            to: 'Multan',
            departureTime: '11:00',
            arrivalTime: '22:00',
            price: 1800,
            duration: '11h',
            busType: 'Standard',
            availableSeats: 22
        },
        {
            id: '5',
            from: 'Faisalabad',
            to: 'Lahore',
            departureTime: '07:00',
            arrivalTime: '09:00',
            price: 600,
            duration: '2h',
            busType: 'Standard',
            availableSeats: 40
        },
        {
            id: '6',
            from: 'Lahore',
            to: 'Faisalabad',
            departureTime: '15:00',
            arrivalTime: '17:00',
            price: 600,
            duration: '2h',
            busType: 'Standard',
            availableSeats: 35
        },
        {
            id: '7',
            from: 'Karachi',
            to: 'Quetta',
            departureTime: '14:00',
            arrivalTime: '06:00',
            price: 3000,
            duration: '16h',
            busType: 'Premium',
            availableSeats: 15
        },
        {
            id: '8',
            from: 'Peshawar',
            to: 'Islamabad',
            departureTime: '16:00',
            arrivalTime: '18:30',
            price: 800,
            duration: '2.5h',
            busType: 'Express',
            availableSeats: 28
        }
    ];

    const displayRoutes = routes.length > 0 ? routes : sampleRoutes;

    const filteredRoutes = displayRoutes.filter(route => {
        const matchesSearch = route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.to.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFrom = !filterFrom || route.from.toLowerCase().includes(filterFrom.toLowerCase());
        const matchesTo = !filterTo || route.to.toLowerCase().includes(filterTo.toLowerCase());

        return matchesSearch && matchesFrom && matchesTo;
    });

    const handleRouteSelect = (route) => {
        onRouteSelect(route);
    };

    return (
        <div className="route-selection">
            <div className="search-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search routes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-boxes">
                    <input
                        type="text"
                        placeholder="From"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        placeholder="To"
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                        className="filter-input"
                    />
                </div>
            </div>

            <div className="routes-list">
                {filteredRoutes.length === 0 ? (
                    <div className="no-routes">
                        <p>No routes found matching your criteria.</p>
                    </div>
                ) : (
                    filteredRoutes.map(route => (
                        <div key={route.id} className="route-card" onClick={() => handleRouteSelect(route)}>
                            <div className="route-info">
                                <div className="route-cities">
                                    <div className="city-pair">
                                        <span className="city">{route.from}</span>
                                        <span className="arrow">→</span>
                                        <span className="city">{route.to}</span>
                                    </div>
                                </div>
                                <div className="route-details">
                                    <div className="time-info">
                                        <div className="departure">
                                            <span className="time">{route.departureTime}</span>
                                            <span className="label">Departure</span>
                                        </div>
                                        <div className="duration">
                                            <span className="duration-text">{route.duration}</span>
                                        </div>
                                        <div className="arrival">
                                            <span className="time">{route.arrivalTime}</span>
                                            <span className="label">Arrival</span>
                                        </div>
                                    </div>
                                    <div className="route-meta">
                                        <span className="bus-type">{route.busType}</span>
                                        <span className="seats-available">{route.availableSeats} seats available</span>
                                    </div>
                                </div>
                            </div>
                            <div className="route-price">
                                <span className="price">Rs. {route.price}</span>
                                <button className="select-btn">Select</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RouteSelection; 