import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './auth/Profile';  
import { Link } from 'react-router-dom';

function Header() {
    const { token, user } = useContext(AuthContext); 
    const [showPopup, setShowPopup] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 
    const handleAccountClick = () => {
        setShowPopup(prev => !prev); 
    };

    const switchToRegister = () => {
        setIsLogin(false);
    };

    const switchToLogin = () => {
        setIsLogin(true);
    };

    return (
        <div className='bg-[#111010] grid grid-cols-12 gap-2 p-1'>
            <div className="banner col-span-2 flex justify-center overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
                <img src="public/logoimge.png" className='rounded-full' alt="logo" />
            </div>

            <div className="col-span-8 p-4">
                <ul className="flex gap-20 text-4xl font-bold text-white ">
                    <Link to={'/movies'} >
                    <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Movies</li>

                    </Link>
                    <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Sessions</li>
                    {user && user.role === "client" && (
                        <Link to={'/reservations'}>
                        <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Reservations</li>

                        </Link>
                    )}
                </ul>
            </div>

            <div className="col-span-2 flex justify-center relative">
                <div className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out' onClick={handleAccountClick}>
                    <img src="public/userIcon.png" alt="user icon" />
                </div>

                {showPopup && (
                    <div className="absolute top-24 right-10 z-10 bg-white p-4 shadow-lg rounded-lg">
                        {token ? (  
                            <Profile user={user} />
                        ) : (  
                            isLogin ? (
                                <Login switchToRegister={switchToRegister} />  
                            ) : (
                                <Register switchToLogin={switchToLogin} /> 
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
