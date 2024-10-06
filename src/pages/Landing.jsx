import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Landing() {
  return (
    <div className="w-full">
          <Header />
          
          <section className=" bg-slate-800" >
              <div className="h-auto">
                       <Outlet   className="p-16"/>
    
              </div>

        </section>
    </div>
  )
}

export default Landing
