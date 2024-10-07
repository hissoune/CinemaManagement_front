import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
    const {loading,token } = useContext(AuthContext); 


    if (loading) {
        return <div>Loading...</div>;
    }

    return token ? children : <Navigate to="/forbiden" />; 
};

export default ProtectedRoutes;
