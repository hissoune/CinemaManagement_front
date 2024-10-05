import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 


export const MoviesContext = createContext();

// eslint-disable-next-line react/prop-types
export const MoviesProvider = ({ children }) => {
    
    const [movies, setMovies] = useState([]);
    const [moviesloading, setMoviesloading] = useState(true);
    const [error, setError] = useState(true);
    





     useEffect(() => {
        const getSessions = async () => {
           

            try {
                const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/public/movies`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setMovies(response.data);
              
                
            } catch (err) {
                console.error('Error fetching user profile:', err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            }
        };
         getSessions(); 
         setMoviesloading(false)
    }, []); 




    return (
        <MoviesContext.Provider value={{ movies,error,moviesloading }}>
            { children }
        </MoviesContext.Provider>
    );

}

