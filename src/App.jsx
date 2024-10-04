import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import { AuthProvider } from "./context/AuthContext"
import { SessionProvider } from "./context/SessionsContext"

function App() {

  return (
    <AuthProvider>
    <SessionProvider>

                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Landing />}>
                            <Route index element={<Home/>} />
                          </Route>
                        </Routes>
                        </BrowserRouter>
      </SessionProvider>
      </AuthProvider>


  )
}

export default App
