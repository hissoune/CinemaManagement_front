import axios from 'axios';

export const fetchSessions = async () => {
    const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/public/sessions`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
