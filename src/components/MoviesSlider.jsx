import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function MoviesSlider() {
  const movies = [
    { title: 'Movie 1', description: 'Some description for Movie 1', image: '/path/to/image1.png' },
    { title: 'Movie 2', description: 'Some description for Movie 2', image: '/path/to/image2.png' },
    { title: 'Movie 3', description: 'Some description for Movie 3', image: '/path/to/image3.png' },
    { title: 'Movie 4', description: 'Some description for Movie 4', image: '/path/to/image4.png' },
    { title: 'Movie 5', description: 'Some description for Movie 5', image: '/path/to/image5.png' },
  ];

  return (
    <div>
      <div className="w-full h-full flex justify-center items-center p-10">
        <div className="w-full h-full" style={{ backgroundImage: `url(backgroundhome.png)` }}>
          <div className="relative h-full w-full flex justify-center items-center">
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
                1448: { slidesPerView: 3, spaceBetween: 15 }, // For larger screens, more slides and a bit more space
                1024: { slidesPerView: 3, spaceBetween: 10 },
                786: { slidesPerView: 2, spaceBetween: 10 },
                478: { slidesPerView: 1, spaceBetween: 5 }, // For smaller screens, less space between slides
              }}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div className="">
                    <div className="bg-white rounded-lg shadow-lg p-5 mx-4 text-center">
                      <img src={movie.image} alt={movie.title} className="w-full rounded-t-lg" />
                      <h3 className="text-black mt-2">{movie.title}</h3>
                      <p>{movie.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 button-prev-slide cursor-pointer z-10">
              <button className="bg-gray-800 text-white rounded-full p-2">Prev</button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 button-next-slide cursor-pointer z-10">
              <button className="bg-gray-800 text-white rounded-full p-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesSlider;
