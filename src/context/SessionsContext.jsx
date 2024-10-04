import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

export const SessionsContext = createContext();

// eslint-disable-next-line react/prop-types
export const SessionProvider = ({ children }) => {
    
    const [sessions, setSessions] = useState([]); 
    const [session] = useState(null);
    const [error, setError] = useState(null);

   
    
    useEffect(() => {
        const getSessions = async () => {
           

            try {
                const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/public/sessions`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setSessions(response.data);
              
                
            } catch (err) {
                console.error('Error fetching user profile:', err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            }
        };
        getSessions(); 
    }, []); 
             console.log(sessions);

    return (
        <SessionsContext.Provider value={{  sessions, session, error }}>
            {children}
        </SessionsContext.Provider>
    );
}
