import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext } from "react";
import { SessionsContext } from "../context/SessionsContext";

export default function SessionsSlayder() {
  const { sessions, loading } = useContext(SessionsContext); // Destructure loading and sessions

  if (loading) {
    return <div className="text-white">Loading...</div>; // Show loading state while fetching data
  }

  if (sessions.length === 0) {
    return <div className="text-white">No sessions available.</div>; // Handle no sessions case
  }

  // Log each session's movie poster image URL
  sessions.forEach(session => {
    console.log(session.movie.posterImage); // This will print the URL for each session's movie
  });

  return (
    <div>
      <div className="w-full p-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: true,
          }}
          speed={3000}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          breakpoints={{
            1448: { slidesPerView: 1 },
            1024: { slidesPerView: 5 },
            786: { slidesPerView: 4 },
            478: { slidesPerView: 3 },
          }}
        >
          {sessions.map((session, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1 ">
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 button-prev-slide cursor-pointer z-10">
                    <button className="bg-gray-800 text-white rounded-full p-2">Prev</button>
                  </div>
                </div>
                <div className="col-span-10">
                  <div className="grid grid-cols-12 bg-gradient-to-r from-black to-slate-500 rounded-2xl border-y-green-600 border-2 p-6">
                    <div className="col-span-6 flex justify-center">
                      <div className=" text-xl gap-4 text-white">
                        <h1 className="text-3xl font-bold text-center">{session.movie.title}</h1>
                        <p className="text-sm p-4">
                          {session.movie.description.length > 100
                            ? session.movie.description.substring(0, 100) + "..."
                            : session.movie.description}
                        </p>
                        <p className="text-lg">
                          <strong>Room:</strong> {session.room.name}
                        </p>
                        <p className="text-lg">
                          <strong>Price:</strong> ${session.price}
                        </p>
                        <p className="text-lg">
                          <strong>Date & Time:</strong>{" "}
                          {new Date(session.dateTime).toLocaleString()}
                        </p>
                      </div>
                              </div>
                              <div className="col-span-6">
                                   <img
                      className="w-full h-96 col-span-6  object-cover "
                          src={`http://localhost:3000/uploads/${session.movie.posterImage}`} 
                      alt={session.movie.title}
                     
                    />
                              </div>
                              
                   
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 button-next-slide cursor-pointer z-10">
                    <button className="bg-gray-800 text-white rounded-full p-2">Next</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
