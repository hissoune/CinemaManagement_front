import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Home() {
  return (
      <>
          <Header/>
     <section className="bg-gradient-to-t from-slate-50 to-black h-screen">
          <Outlet />
     </section>
    </>
  )
}

export default Home
