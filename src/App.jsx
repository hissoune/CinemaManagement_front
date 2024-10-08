import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import Forbiden from "./pages/Forbiden";  // Fixed the typo here
import ProfileDetails from "./components/auth/ProfileDetails";
import Movies from "./pages/Movies";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import MovieDetails from "./pages/MovieDetails";
import { ReservationProvider } from "./context/ReservationContext";
import Reservations from "./pages/Reservations";
import Dashboard from "./pages/Dashboard/Dashboard";
import Statics from "./pages/Dashboard/Statics";
import { AdminRoutes } from "./helpers/AdminRoutes";
import ClientRoutes from "./helpers/ClientRoutes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sessions from "./pages/Sessions";
const queryClient = new QueryClient();
function App() {
  return (
    <AuthProvider>
              <QueryClientProvider client={queryClient}>
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
                                                element={
                                                  <ClientRoutes>
                                                  <MovieDetails />
                                                    </ClientRoutes>
                                                }
                                              />
                                              <Route path="/reservations" element={

                                                <ClientRoutes>
                                                <Reservations />
                                                  </ClientRoutes>
                                              
                } />
                <Route path="/sessions" element={
                  <Sessions/>
                } />
                                           
                            </Route>
                                          <Route path="/forbiden" element={<Forbiden />} /> 
                                            <Route path="/dashboard" element={
                                                <AdminRoutes>
                                                <Dashboard />
                                                </AdminRoutes>
                                            }>
                                              
                                                        <Route index element={
                                                          <AdminRoutes>
                                                            <Statics />
                                                            </AdminRoutes>
                                                        
                                                        } />

                                              </Route>
                                        
                        </Routes>
                    </BrowserRouter>
                  </ReservationProvider>
              </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
