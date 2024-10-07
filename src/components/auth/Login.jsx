import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// eslint-disable-next-line react/prop-types
function Login({ switchToRegister }) {  
     const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
                    login({ email, password });  

        } catch (error) {
            throw new error;
        }

        console.log('Login details:', { email, password });
    };

    return (
        <div className="login-popup">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Login
                </button>
                <button
                    type="button"
                    onClick={switchToRegister}  
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                    Register as a New Client
                </button>
            </form>
        </div>
    );
}

export default Login;
