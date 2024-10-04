import MoviesSlider from "../components/MoviesSlider"
import SessionsSlayder from "../components/SessionsSlayder"


function Home() {
  return (
    <>
     
     <div className="min-h-[80vh] bg-gray-900 flex flex-col items-center justify-center">
  <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-white font-serif font-bold mb-8">
    This Week
  </h1>
  <div className="w-full ">
    <SessionsSlayder />
  </div>
</div>

<div className="min-h-[80vh] bg-gray-800 flex flex-col items-center justify-center">
  <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-white font-serif font-bold mb-8">
    Movies
  </h1>
  <div className="w-full ">
    <MoviesSlider />
  </div>
</div>

      
    </>
  )
}

export default Home
