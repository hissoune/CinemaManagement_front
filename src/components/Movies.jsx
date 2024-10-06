import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MoviesContext } from "../context/MoviesContext"; // Ensure to import your context

function Movies() {
  const { moviesloading, movies } = useContext(MoviesContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  if (moviesloading) {
    return <div>Loading...</div>; 
  }

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`); 
  };

  return (
    <div className="p-20 h-screen">
      <header className="my-10 flex justify-between">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded p-2 w-1/3"
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border rounded p-2 mt-2 w-1/3"
        >
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
        </select>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
            style={{
              backgroundImage: `url(${movie.posterImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
            onClick={() => handleMovieClick(movie._id)} // Add click handler
          >
            <div className="bg-black bg-opacity-50 flex flex-col justify-end p-4 h-full">
              <h3 className="text-white text-xl font-bold">{movie.title}</h3>
              <p className="text-gray-300">{new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p className="text-yellow-400">Rating: {movie.rating}</p>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
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
