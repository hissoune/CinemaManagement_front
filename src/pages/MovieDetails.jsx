import { useParams } from 'react-router-dom';
import { useState } from 'react'; 

import RoomSeats from '../components/RoomSeats'; 
import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '../api/moviApi';
import { fetshSessionsByMovieId } from '../api/sessionsApi';

function MovieDetails() {
   const { id } = useParams(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedSession, setSelectedSession] = useState(null);



  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
    enabled: !!id
  });
const { data: sessions, isSessionLoading, Error } = useQuery({
    queryKey: ['sessions', id],
    queryFn: () => fetshSessionsByMovieId(id),
    enabled: !!id
  });
  if (isLoading) {
    return <div className="text-center py-20">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="text-center py-20">Movie not found</div>;
  }
  if (isSessionLoading) {
    return <div className="text-center py-20">Loading sessions details...</div>;
  }

  if (Error || !sessions) {
    return <div className="text-center py-20">sessions not found</div>;
  }


 

 

  const handleReserveClick = (session) => {
    setSelectedSession(session); 
    setIsPopupOpen(true); 
  };

  return (
    <div className="p-8 ">
      <div className="relative">
        <img src={movie.posterImage} alt={movie.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="relative z-10 text-white text-center py-8">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Rating:</strong> {movie.rating}</p>
          <p className="text-lg"><strong>Genres:</strong> {movie.genre.join(", ")}</p>
          <p className="text-lg max-w-2xl mx-auto mt-4">{movie.description}</p>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-center text-3xl font-bold mb-4">Available Sessions</h2>
        {sessions.length > 0 ? (
          <ul className='border-orange-800 border p-5 my-5'>
            {sessions.map(session => (
              <div key={session._id} className="flex flex-col rounded-lg bg-slate-800 max-w-96 p-8 my-6 border border-slate-600 shadow-xl">
                <div className="pb-8 m-0 mb-8 text-center text-slate-100 border-b border-slate-600">
                  <h1 className="flex justify-center gap-1 mt-4 font-bold text-white text-6xl">
                    <span className="text-3xl">$</span>{session.price}
                  </h1>
                </div>
                <div className="p-0">
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                      <span className="p-1 border rounded-full border-slate-500 bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-300"></svg>
                      </span>
                      <p className="text-slate-300">
                        Created By: <span className='text-2xl font-bold mx-2'>{session.creator.name}</span>
                      </p>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="p-1 border rounded-full border-slate-500 bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-300"></svg>
                      </span>
                      <p className="text-slate-300">
                        Date & Time: <span>{new Date(session.dateTime).toLocaleString()}</span>
                      </p>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="p-1 border rounded-full border-slate-500 bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-300"></svg>
                      </span>
                      <p className="text-slate-300">
                        Room: <span className='text-2xl font-bold mx-2'>{session.room.name}</span>
                      </p>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="p-1 border rounded-full border-slate-500 bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-300"></svg>
                      </span>
                      <p className="text-slate-300">
                        Available Seats:
                        <span className='text-2xl font-bold mx-2'>
                          {session.room.seats.filter(seat => seat.available).length}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="p-0 mt-12">
                  <button 
                    className="min-w-32 w-full rounded-md bg-orange-500 text-white py-2 px-4 transition-all shadow-md hover:bg-orange-600 focus:bg-orange-400" 
                    type="button"
                    onClick={() => handleReserveClick(session)} 
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700">No sessions available for this movie.</p>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <RoomSeats seats={selectedSession.room.seats} session={selectedSession} /> 
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
