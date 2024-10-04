import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

export const SessionsContext = createContext();

// eslint-disable-next-line react/prop-types
export const SessionProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]); // Initialize as an empty array
    const [session] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) setToken(storedToken);
        setLoading(false);
    }, []);
    
    useEffect(() => {
        const getSessions = async () => {
            if (!token) return; 

            try {
                const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/sessions`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the header
                    },
                });

                setSessions(response.data);
              
                
            } catch (err) {
                console.error('Error fetching user profile:', err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            }
        };
        getSessions(); 
    }, [token]); 
             console.log(sessions);

    return (
        <SessionsContext.Provider value={{ token, sessions, session, loading, error }}>
            {children}
        </SessionsContext.Provider>
    );
}
