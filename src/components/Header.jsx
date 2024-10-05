import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register'; 

function Header() {
    const { token,userloading, user } = useContext(AuthContext); 
    const [showPopup, setShowPopup] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 

    const handleAccountClick = () => {
        setShowPopup(prev => !prev); 
        setIsLogin(true); 
    }

    const switchToRegister = () => {
        setIsLogin(false); 
    }

    const switchToLogin = () => {
        setIsLogin(true); 
    }
    if (userloading) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-[#111010] grid grid-cols-12 gap-2 p-1'>
            <div className="banner col-span-2 flex justify-center">
                <div>
                    <img src="public/logoimge.png" alt="logo" />
                </div>
            </div>
            <div className="col-span-8 p-4">
                <ul className="flex justify-around text-2xl text-white">
                    <li>Films</li>
                    <li>Sessions</li>
                    {(user.role == "client") ? <li>Reservations</li>
                        :
                        <li></li>
                }
                    
                </ul>
            </div>
            <div className="col-span-2 flex justify-center relative">
                {(!token) ? (
                    <div className='cursor-pointer' onClick={handleAccountClick}>
                        <img src="public/userIcon.png" alt="user img" />
                    </div>
                ) : (
                    <div>
                        <p className="text-white">Welcome, {user ? user.name : 'fuck you'}</p>
                    </div>
                )}

                {showPopup && (
                    <div className="absolute top-24 right-10 z-10 bg-white p-4 shadow-lg rounded-lg">
                        {isLogin ? (
                            <Login switchToRegister={switchToRegister} />
                        ) : (
                            <Register switchToLogin={switchToLogin} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
