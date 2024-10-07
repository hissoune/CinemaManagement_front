
import axios from 'axios';

export const fetchMovies = async () => {
    const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/public/movies`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const createMovie = async (newMovie) => {
    const response = await axios.post(`${import.meta.env.VITE_EXPRESS_BACKEND}/movies/create`, newMovie, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateMovie = async ({ id, updatedMovie }) => {
    const response = await axios.put(`${import.meta.env.VITE_EXPRESS_BACKEND}/movies/update/${id}`, updatedMovie, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_EXPRESS_BACKEND}/public/movies/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const removeMovie = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_EXPRESS_BACKEND}/movies/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
