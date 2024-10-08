import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './auth/Profile';  
import { Link } from 'react-router-dom';

function Header() {
    const { token, user } = useContext(AuthContext); 
    const [showSidebar, setShowSidebar] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 
    const sidebarRef = useRef(null); 

    const handleAccountClick = () => {
        setShowSidebar(prev => !prev); 
    };

    const switchToRegister = () => {
        setIsLogin(false);
    };

    const switchToLogin = () => {
        setIsLogin(true);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={showSidebar}
                            onClick={handleAccountClick}
                        >
                            <span className="sr-only">Open main menu</span>
                            {showSidebar ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-auto" src="public/logoimge.png" alt="Your Company" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex space-x-4">
                                <Link to="/movies" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Movies
                                </Link>
                                <Link to="/sessions" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Sessions
                                </Link>
                                {user && user.role === "client" && (
                                    <Link to="/reservations" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Reservations
                                    </Link>
                                )}
                                {user && user.role === "admin" && (
                                    <Link to="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <button
                                type="button"
                                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                onClick={handleAccountClick}
                            >
                                <img className="h-8 w-8 rounded-full" src="public/userIcon.png" alt="User Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 z-10 w-48 h-full bg-white shadow-lg transition-transform transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ transitionDuration: '0.5s' }} 
            >
                <div className="p-4">
                    {showSidebar ? (
                        token ? (
                            <Profile user={user} />
                        ) : (
                            isLogin ? (
                                <Login switchToRegister={switchToRegister} />
                            ) : (
                                <Register switchToLogin={switchToLogin} />
                            )
                        )
                    ) : null}
                </div>
            </div>
        </nav>
    );
}

export default Header;
