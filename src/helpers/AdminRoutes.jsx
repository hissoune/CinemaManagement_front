
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const AdminRoutes = ({ children }) => {
    const { user, userloading ,loading,token} = useContext(AuthContext); 
    if (loading) {
        return <div>Loading...</div>;
   }

    if (token && userloading ) {
        return <div>Loading...</div>;
    }

    return (token && user.role == 'admin') ? children : <Navigate to="/forbiden" />; 
};

