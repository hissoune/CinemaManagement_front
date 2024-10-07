import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import { AuthContext } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
function Profile({ user }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    logout();
  };

  // Navigate to the profile details page when "Details" is clicked
  const handleDetailsClick = () => {
    navigate("/profile-details");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Profile</h2>
        
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-2">
            <strong className="text-gray-900">Name:</strong> {user.name}
          </p>
          <p className="text-xl text-gray-700 mb-6">
            <strong className="text-gray-900">Email:</strong> {user.email}
          </p>

          <div className="flex justify-center gap-4">
            {/* Button to navigate to details page */}
            <button 
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={handleDetailsClick}
            >
              Details
            </button>

            {/* Logout button */}
            <button 
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
