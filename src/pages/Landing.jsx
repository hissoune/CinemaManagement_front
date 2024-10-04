import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Landing() {
  return (
    <div className="w-full">
          <Header />
          
          <section className="bg-no-repeat  bg-cover" style={{ backgroundImage: `url(public/backgroundhome.png)` }}>
              <div className="h-screen">
                       <Outlet   className="p-16"/>
    
              </div>

        </section>
    </div>
  )
}

export default Landing
