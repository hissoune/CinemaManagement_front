import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext';

function MovieDetails() {
  const { id } = useParams(); 
  const { movies, moviesloading } = useContext(MoviesContext); 

  if (moviesloading) {
    return <div>Loading movie details...</div>; 
  }

  const movie = movies.find((movie) => movie._id === id); 

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
      <div className="p-5">
          <div className='grid grid-cols-12 gap-3 h-screen'>
          <div className='col-span-6 h-1/2'> <img src={movie.posterImage} alt={movie.title} className="w-full h-auto mb-4" /></div>
          <div className='col-span-6'>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Genres:</strong> {movie.genre.join(", ")}</p>
          <p><strong>Description:</strong> {movie.description}</p>
              </div>
              </div>
    </div>
  );
}

export default MovieDetails;
