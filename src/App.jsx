import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionsContext";
import Forbiden from "./pages/Forbiden";  // Fixed the typo here
import { MoviesProvider } from "./context/MoviesContext";
import ProfileDetails from "./components/ProfileDetails";
import Movies from "./pages/Movies";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import MovieDetails from "./pages/MovieDetails";
import { ReservationProvider } from "./context/ReservationContext";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <MoviesProvider>
          <ReservationProvider>
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
                  
                  element={
                    <ProtectedRoutes>
                      <ProfileDetails />
                    </ProtectedRoutes>}
                />
                 <Route path="/movies"
                element={<Movies/>}
                />
                  <Route path="/movies/:id"
                element={<MovieDetails/>}
                  />
                  <Route path="/reservations" element={<Reservations/>}/>
              <Route path="/forbiden" element={<Forbiden />} />  
            </Route>
          </Routes>
            </BrowserRouter>
            </ReservationProvider>
          </MoviesProvider>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;
