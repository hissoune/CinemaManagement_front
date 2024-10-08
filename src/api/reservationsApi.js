import axios from 'axios';

export const fetchReservations = async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/reservations`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const createReservation = async ({ reservationData, token }) => {
    const response = await axios.post(
        `${import.meta.env.VITE_EXPRESS_BACKEND}/reservations`,
        {
            seats: reservationData.seats,
            session: reservationData.session,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

export const confirmReservation = async ({ reservationId, token }) => {
  
    
    const response = await axios.put(`${import.meta.env.VITE_EXPRESS_BACKEND}/reservations/confirme/${reservationId}`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const cancelReservation = async ({ reservationId, token }) => {
    const response = await axios.delete(`${import.meta.env.VITE_EXPRESS_BACKEND}/reservations/delete/${reservationId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
