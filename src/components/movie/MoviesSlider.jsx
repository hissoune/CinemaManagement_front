import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext, useState } from "react";
import { MoviesContext } from "../../context/MoviesContext";

function MoviesSlider() {
  const { moviesloading, movies } = useContext(MoviesContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Updated filtering logic to handle array of genres
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre); // Checks if genre array includes the selected genre
    return matchesSearch && matchesGenre;
  });

  if (moviesloading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible">
      <div className="w-[80%] flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 w-1/4 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
        </select>
      </div>

      <div className="w-[80%] my-10 rounded-2xl">
        <div className="relative w-full py-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 4000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".button-next-movie-slide",
              prevEl: ".button-prev-movie-slide",
            }}
            speed={600}
            breakpoints={{
              1448: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 1, spaceBetween: 5 },
            }}
          >
            {filteredMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="bg-slate-300 shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
                  <div className="relative h-[80%]">
                    <img
                      className="w-full h-96 object-cover"
                      src={movie.posterImage}
                      alt={movie.title}
                    />
                    <div className="absolute bottom-3 left-2 bg-yellow-400 text-white text-2xl font-bold px-2 py-1 rounded-full">
                      {movie.rating}/10
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{movie.title}</h2>

                    <div className="flex justify-between items-center text-gray-400 mt-1 text-2xl">
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                        {movie.genre.join(", ")} {/* Displaying multiple genres */}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-5 transform -translate-y-1/2 button-prev-movie-slide z-10">
            <button className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition">
              Prev
            </button>
          </div>
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2 button-next-movie-slide z-10">
            <button className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesSlider;
