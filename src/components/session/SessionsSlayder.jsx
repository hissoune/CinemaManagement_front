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

  if (sessions.length === 0) {
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
          1440: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
      >
        {sessions.map((session, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-64 object-cover"
                src={`http://localhost:3000/uploads/${session.movie.posterImage}`}
                alt={session.movie.title}
              />

              <div className="p-6">
                <h1 className="text-2xl font-bold text-white hover:text-green-400 transition duration-300 mb-2">{session.movie.title}</h1>
                <p className="text-gray-300 mb-4">
                  {session.movie.description.length > 100
                    ? session.movie.description.substring(0, 100) + "..."
                    : session.movie.description}
                </p>
                <p className="text-lg text-gray-200"><strong>Room:</strong> {session.room.name}</p>
                <p className="text-lg text-gray-200"><strong>Price:</strong> ${session.price}</p>
                <p className="text-lg text-gray-200"><strong>Date & Time:</strong> {new Date(session.dateTime).toLocaleString()}</p>
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
