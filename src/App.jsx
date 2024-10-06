import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionsContext";
import Forbiden from "./pages/Forbiden";  // Fixed the typo here
import { MoviesProvider } from "./context/MoviesContext";
import ProfileDetails from "./components/ProfileDetails";
// import ProtectedRoutes from "./helpers/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <MoviesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}>
              <Route
                index
                element={
                 
                    <Home />
                 
                }
                />
                <Route path="/profile-details"
                element={<ProfileDetails/>}
                />
              <Route path="/forbiden" element={<Forbiden />} />  
            </Route>
          </Routes>
          </BrowserRouter>
          </MoviesProvider>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;
