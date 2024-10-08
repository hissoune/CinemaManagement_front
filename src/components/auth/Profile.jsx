import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
function Profile({ user }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleDetailsClick = () => {
    navigate("/profile-details");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex justify-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src="https://picsum.photos/200"
            alt="User profile"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-white mt-4">
          {user.name}
        </h2>
        <p className="text-center text-gray-200">{user.email}</p>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
          Profile Actions
        </h3>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
            onClick={handleDetailsClick}
          >
            Details
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
