import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

export const ReservationContext = createContext();

// eslint-disable-next-line react/prop-types
export const ReservationProvider = ({ children }) => {
        const [token, setToken] = useState(null);

    const [reservations, setReservations] = useState([]);
    const [reservLoading, setReservLoading] = useState(true);
    const [error, setError] = useState(null);
 useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) setToken(storedToken);
        
    }, []);
   

    const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_EXPRESS_BACKEND}/reservations`,
            {
                seats: reservationData.seats,
                session: reservationData.session,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        setReservations((prevReservations) => [...prevReservations, response.data]);
        console.log('Reservation created:', response.data);
    } catch (err) {
        console.error('Error creating reservation:', err.response?.data || err.message);
        setError(err);
    }
};
    const confirmReservation = async (reservId) => {
    try {
        await axios.put(`${import.meta.env.VITE_EXPRESS_BACKEND}/reservations/confirme/${reservId}`)
    } catch (err) {
         console.error('Error creating reservation:', err.response?.data || err.message);
        setError(err);
    }
}

    useEffect(() => {
         const fetchReservations = async () => {
        try {
            setReservLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/reservations`,
                            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            ); 
            setReservations(response.data);
        } catch (err) {
            console.error("Error fetching reservations:", err);
            setError(err);
        } finally {
            setReservLoading(false);
        }
    };
        fetchReservations();
    }, [token]);

    return (
        <ReservationContext.Provider value={{ reservations, reservLoading, createReservation, error,confirmReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};
