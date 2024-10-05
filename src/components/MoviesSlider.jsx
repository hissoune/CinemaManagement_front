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
    <div className="w-full flex justify-center items-center overflow-visible">
      <div
        className="w-[80%]   my-10 rounded-2xl" 
      >
        <div className="relative w-full mx-10 py-10">
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
              <div className=" bg-slate-300  shadow-lg  overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out ">
                <div className="relative h-[80%]">
                  <img
                    className="w-full h-full object-cover"
                    src={movie.posterImage}
                    alt={movie.title}
                  />
                  <div className="absolute bottom-3 left-2  bg-yellow-400 text-white text-2xl font-bold px-2 py-1 rounded-full">
                    {movie.rating}/10
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{movie.title}</h2>

                  <div className="flex justify-between items-center text-gray-400 mt-1 text-2xl">
                    <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{movie.genre}</span>
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
