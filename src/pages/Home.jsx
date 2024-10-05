
import MoviesSlider from "../components/MoviesSlider";
import SessionsSlayder from "../components/SessionsSlayder";



function Home() {
  return (
    <>
      <div className="relative w-full h-[50vh]">
       

        
           <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(/public/cinema-movie-night-3d-vector-clapper-board-director-s-megaphone-ticket-3d-glasses-movie-tape_606402-430.jpg)' }}>
  <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide uppercase">
      Experience the Magic of Cinema
    </h1>
  </div>
</div>


        
      </div>

      <div className="min-h-[80vh] bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-white font-serif font-bold mb-8">
          This Week
        </h1>
        <div className="w-full">
          <SessionsSlayder />
        </div>
      </div>

      <div className="h-auto bg-gray-800 flex flex-col items-center justify-center py-10">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-white font-serif font-bold mb-8">
          Movies
        </h1>
        <div className="w-full">
          <MoviesSlider />
        </div>
      </div>
    </>
  );
}

export default Home;
