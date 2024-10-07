import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"

function Dashboard() {
  return (
      <div className="grid grid-cols-12 gap-2 ">
          <div className={`col-span-2 h-screen`}>
              <Sidebar/>
              </div>
          <div className="col-span-10 h-screen">
                  <Outlet/>
  
          </div>
    </div>
  )
}

export default Dashboard
