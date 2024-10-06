import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react'; 
import { MoviesContext } from '../context/MoviesContext';
import { SessionsContext } from '../context/SessionsContext';
import RoomSeats from '../components/RoomSeats'; 

function MovieDetails() {
  const { id } = useParams(); 
  const { movies, moviesloading } = useContext(MoviesContext); 
  const { sessions, loading } = useContext(SessionsContext); 

  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedSession, setSelectedSession] = useState(null);

  if (moviesloading || loading) { 
    return <div>Loading movie details...</div>; 
  }

  const movie = movies.find((movie) => movie._id === id); 

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const movieSessions = sessions.filter(session => session.movie._id === id);

  const handleReserveClick = (session) => {
    setSelectedSession(session); 
    setIsPopupOpen(true); 
  };

  return (
    <div className="p-5">
      <div className='grid grid-cols-12 gap-3 h-screen'>
        <div className='col-span-6 h-1/2'>
          <img src={movie.posterImage} alt={movie.title} className="w-full h-auto mb-4" />
        </div>
        <div className='col-span-6'>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Genres:</strong> {movie.genre.join(", ")}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
        <div className="col-span-12 my-8 p-10">
          <h2 className="text-center text-2xl font-bold">Available Sessions</h2>
          {movieSessions.length > 0 ? (
            <ul className='border-orange-800 border p-5 my-5'>
              {movieSessions.map(session => (
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
                          Created By: <span className='text-2xl font-bold mx-2'> {session.creator.name}</span>
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
                      className="min-w-32 w-full rounded-md bg-white py-2 px-4 border border-transparent text-center text-sm text-slate-600 transition-all shadow-md hover:shadow-lg focus:bg-white/90 focus:shadow-none active:bg-white/90 hover:bg-white/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
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
            <p>No sessions available for this movie.</p>
          )}
        </div>
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
