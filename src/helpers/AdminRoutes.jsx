
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const AdminRoutes = ({ children }) => {
    const { user, userloading } = useContext(AuthContext); 


    if (userloading) {
        return <div>Loading...</div>;
    }

    return (user.role == 'admin')? children : <Navigate to="/forbiden" />; 
};

