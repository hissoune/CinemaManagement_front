import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

function MoviesSlider() {
  const { moviesloading, movies } = useContext(MoviesContext);

  if (moviesloading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center items-center overflow-visible"> {/* Overflow visible to show the cards outside */}
      <div
        className="w-[80%] h-96 bg-[#074F69] overflow-visible relative my-10 rounded-2xl" 
      >
        <div className="absolute top-1 w-full mx-10 py-10">
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
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
            speed={600}
            breakpoints={{
              1448: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 1, spaceBetween: 5 },
            }}
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={index}>
              <div className="max-w-xs bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
                <div className="relative h-60">
                  <img
                    className="w-full h-full object-cover"
                    src={movie.posterImage}
                    alt={movie.title}
                  />
                  <div className="absolute bottom-3 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {movie.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{movie.title}</h2>

                  <div className="flex justify-between items-center text-gray-400 text-sm mt-1">
                    <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{movie.genre}</span>
                  </div>

                  

                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>


              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-1/2 left-5 transform -translate-y-1/2 button-prev-slide z-10">
            <button className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition">
              Prev
            </button>
          </div>
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2 button-next-slide z-10">
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
