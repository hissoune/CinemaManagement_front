import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionsContext";
import Forbiden from "./pages/Forbiden";  // Fixed the typo here
// import ProtectedRoutes from "./helpers/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}>
              <Route
                index
                element={
                 
                    <Home />
                 
                }
              />
              <Route path="/forbiden" element={<Forbiden />} />  
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;
