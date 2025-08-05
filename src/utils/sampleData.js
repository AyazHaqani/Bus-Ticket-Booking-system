import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Sample bus routes data for Pakistan
const sampleRoutes = [
    {
        from: 'Karachi',
        to: 'Lahore',
        departureTime: '08:00',
        arrivalTime: '20:00',
        price: 2500,
        duration: '12h',
        busType: 'Express',
        availableSeats: 25,
        frequency: 'Daily',
        description: 'Direct express service from Karachi to Lahore via Motorway'
    },
    {
        from: 'Lahore',
        to: 'Islamabad',
        departureTime: '09:30',
        arrivalTime: '13:30',
        price: 1200,
        duration: '4h',
        busType: 'Premium',
        availableSeats: 18,
        frequency: 'Multiple daily',
        description: 'Premium service with WiFi and refreshments'
    },
    {
        from: 'Islamabad',
        to: 'Peshawar',
        departureTime: '10:00',
        arrivalTime: '12:30',
        price: 800,
        duration: '2.5h',
        busType: 'Express',
        availableSeats: 30,
        frequency: 'Multiple daily',
        description: 'Express service via Motorway M1'
    },
    {
        from: 'Karachi',
        to: 'Multan',
        departureTime: '11:00',
        arrivalTime: '22:00',
        price: 1800,
        duration: '11h',
        busType: 'Standard',
        availableSeats: 22,
        frequency: 'Daily',
        description: 'Overnight service with comfortable seating'
    },
    {
        from: 'Faisalabad',
        to: 'Lahore',
        departureTime: '07:00',
        arrivalTime: '09:00',
        price: 600,
        duration: '2h',
        busType: 'Standard',
        availableSeats: 40,
        frequency: 'Multiple daily',
        description: 'Frequent service between Faisalabad and Lahore'
    },
    {
        from: 'Lahore',
        to: 'Faisalabad',
        departureTime: '15:00',
        arrivalTime: '17:00',
        price: 600,
        duration: '2h',
        busType: 'Standard',
        availableSeats: 35,
        frequency: 'Multiple daily',
        description: 'Convenient return service to Faisalabad'
    },
    {
        from: 'Karachi',
        to: 'Quetta',
        departureTime: '14:00',
        arrivalTime: '06:00',
        price: 3000,
        duration: '16h',
        busType: 'Premium',
        availableSeats: 15,
        frequency: 'Daily',
        description: 'Overnight premium service with sleeper seats'
    },
    {
        from: 'Peshawar',
        to: 'Islamabad',
        departureTime: '16:00',
        arrivalTime: '18:30',
        price: 800,
        duration: '2.5h',
        busType: 'Express',
        availableSeats: 28,
        frequency: 'Multiple daily',
        description: 'Evening express service to Islamabad'
    },
    {
        from: 'Multan',
        to: 'Lahore',
        departureTime: '08:30',
        arrivalTime: '12:30',
        price: 1000,
        duration: '4h',
        busType: 'Standard',
        availableSeats: 32,
        frequency: 'Daily',
        description: 'Morning service from Multan to Lahore'
    },
    {
        from: 'Lahore',
        to: 'Karachi',
        departureTime: '20:00',
        arrivalTime: '08:00',
        price: 2500,
        duration: '12h',
        busType: 'Premium',
        availableSeats: 20,
        frequency: 'Daily',
        description: 'Overnight premium service with sleeper seats'
    }
];

// Function to add sample routes to Firestore
export const addSampleRoutes = async () => {
    try {
        const routesCollection = collection(db, 'routes');

        for (const route of sampleRoutes) {
            await addDoc(routesCollection, {
                ...route,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        console.log('Sample routes added successfully!');
        return true;
    } catch (error) {
        console.error('Error adding sample routes:', error);
        return false;
    }
};

// Function to check if routes exist
export const checkRoutesExist = async () => {
    try {
        const routesCollection = collection(db, 'routes');
        const snapshot = await getDocs(routesCollection);
        return !snapshot.empty;
    } catch (error) {
        console.error('Error checking routes:', error);
        return false;
    }
}; 