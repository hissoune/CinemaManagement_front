import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/moviApi'; 
import { useState } from "react";
import Loading from "../components/Loading";

function Movies() {
  const navigate = useNavigate(); 

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const { data: movies = [], isLoading, error } = useQuery({
    queryKey: ['movies'], 
    queryFn: fetchMovies
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`); 
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  if (error) {
    return <h1 className="text-red-500">{error.message}</h1>;
  }

  if (isLoading) {
    return <div><Loading /></div>; 
  }

  return (
    <div className="p-10 h-screen bg-gray-900 text-white">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-md p-3 w-full sm:w-1/3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border rounded-md p-3 mt-4 sm:mt-0 w-full sm:w-1/4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
        </select>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-gray-800"
            style={{
              backgroundImage: `url(${movie.posterImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
            }}
            onClick={() => handleMovieClick(movie._id)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 transition-opacity duration-300 hover:opacity-100 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{movie.title}</h3>
              <p className="text-gray-400 mb-1">{new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p className="text-yellow-400 mb-1">Rating: {movie.rating}</p>
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg text-sm">
                {movie.genre.join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
