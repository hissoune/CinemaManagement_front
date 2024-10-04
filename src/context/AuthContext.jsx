import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) setToken(storedToken);
        setLoading(false);
    }, []);

    useEffect(() => {
        const getUserProfile = async () => {
            if (!token) return; 
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/auth/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                  
                });
                setUser(response.data);
                
                
            } catch (err) {
                console.error('Error fetching user profile:', err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        getUserProfile(); 
    }, [token]); 

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_EXPRESS_BACKEND}/auth/login`,
                credentials,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('authToken', response.data.token);
                window.location.reload();
            } else {
                throw new Error('No token received from the server');
            }
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
