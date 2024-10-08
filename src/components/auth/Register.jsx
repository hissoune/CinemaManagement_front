import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

// eslint-disable-next-line react/prop-types
function Register({ switchToLogin }) {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const { register } = useContext(AuthContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await register({ name, email, password });
        } catch (err) {
            setError(err); 
        }
    };

    return (
        <div className="register-popup">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                
                <div>
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        placeholder='User Name'
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        placeholder='Email'
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
                        placeholder='Password'
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Register
                </button>

                <button
                    type="button"
                    onClick={switchToLogin} 
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
}

export default Register;
