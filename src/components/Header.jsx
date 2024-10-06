import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';  // Import the Profile component

function Header() {
    const { token, user } = useContext(AuthContext); // Token to check if user is logged in
    const [showPopup, setShowPopup] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register forms

    // Toggle showing the login/register or profile popup
    const handleAccountClick = () => {
        setShowPopup(prev => !prev); // Show/hide popup
    };

    // Switch to register form
    const switchToRegister = () => {
        setIsLogin(false);
    };

    // Switch to login form
    const switchToLogin = () => {
        setIsLogin(true);
    };

    return (
        <div className='bg-[#111010] grid grid-cols-12 gap-2 p-1'>
            {/* Logo */}
            <div className="banner col-span-2 flex justify-center overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
                <img src="public/logoimge.png" className='rounded-full' alt="logo" />
            </div>

            {/* Menu */}
            <div className="col-span-8 p-4">
                <ul className="flex gap-20 text-4xl font-bold text-white ">
                    <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Films</li>
                    <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Sessions</li>
                    {user && user.role === "client" && (
                        <li className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out'>Reservations</li>
                    )}
                </ul>
            </div>

            {/* User Icon and Popup */}
            <div className="col-span-2 flex justify-center relative">
                {/* Click on user icon to trigger the popup */}
                <div className='cursor-pointer overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out' onClick={handleAccountClick}>
                    <img src="public/userIcon.png" alt="user icon" />
                </div>

                {/* Show the popup based on whether the user is logged in or not */}
                {showPopup && (
                    <div className="absolute top-24 right-10 z-10 bg-white p-4 shadow-lg rounded-lg">
                        {token ? (  // If the user is logged in, show Profile
                            <Profile user={user} />
                        ) : (  // If no user is logged in, show Login/Register forms
                            isLogin ? (
                                <Login switchToRegister={switchToRegister} />  // Show Login form
                            ) : (
                                <Register switchToLogin={switchToLogin} />  // Show Register form
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
