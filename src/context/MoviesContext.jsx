import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 


const MoviesContext = createContext();

export const MoviesProvider = ({ Children }) => {
    
    const [movies, setMovies] = useState([]);






    useEffect(() => {
            
     
     



       },[])




    return (
        <MoviesContext.Provider value={{ movies }}>
            {{ Children }}
        </MoviesContext.Provider>
    );

}