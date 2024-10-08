import { useQuery } from '@tanstack/react-query';
import { fetchSessions } from '../api/sessionsApi';
import Loading from "../components/Loading";

function Sessions() {
  const { data: sessions, error, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions 
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loading />
      </div>
    ); 
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl">No sessions available.</h2>
      </div>
    ); 
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">
        <h1 className="text-lg">{error.message}</h1>
      </div>
    ); 
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Available Sessions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img 
              src={session.movie.posterImage} 
              alt={session.movie.title} 
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{session.movie.title}</h3>
              <p className="text-gray-300">{session.date}</p>
              <button className="mt-3 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sessions;
