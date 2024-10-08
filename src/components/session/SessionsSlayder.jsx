import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "../../api/sessionsApi";
import Loading from "../Loading";

export default function SessionsSlider() {
  const { data: sessions, error, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  if (isLoading) {
    return <div className="text-white"><Loading/></div>; 
  }

  if (!sessions || sessions.length === 0) {
    return <div className="text-white">No sessions available.</div>; 
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className="w-full p-10 bg-gradient-to-r from-gray-900 to-gray-800">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
         spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={800}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        breakpoints={{
          1440: { slidesPerView: 3 },
          1024: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
      >
        {sessions.map((session) => (
          <SwiperSlide key={session.id}>
            <div className="bg-gradient-to-b  from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img 
                className="w-full h-72 object-cover" 
                src={`http://localhost:3000/uploads/${session.movie.posterImage}`} 
                alt={session.movie.title} 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{session.movie.title}</h3>
                <p className="text-gray-300">{new Date(session.dateTime).toLocaleString()}</p>
                <p className="text-lg text-gray-200"><strong>Room:</strong> {session.room.name}</p>
                <p className="text-lg text-gray-200"><strong>Price:</strong> ${session.price}</p>
              
              </div>

              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 button-prev-slide">
                <button className="bg-green-600 text-white rounded-full p-2 shadow-lg hover:bg-green-700 transition duration-300">Prev</button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 button-next-slide">
                <button className="bg-green-600 text-white rounded-full p-2 shadow-lg hover:bg-green-700 transition duration-300">Next</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
