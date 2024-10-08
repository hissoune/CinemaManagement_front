import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Register({ switchToLogin }) {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register details:', { email, password, confirmPassword });
    };

    return (
        <div className="register-popup">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-4">Register</h2>
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
                <div>
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        required
                    />
                </div>
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
