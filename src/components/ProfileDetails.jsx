import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfileDetails() {
  const { user, updateUser } = useContext(AuthContext); // Access the user and updateUser function from context
  const [isEditing, setIsEditing] = useState(false); // State to track if the user is in edit mode
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleUpdate = () => {
    const updatedUser = { name, email };
    updateUser(updatedUser); 
    setIsEditing(false); 
    alert("Profile updated successfully!");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Profile</h2>

          {/* Display user details (not editable unless in editing mode) */}
          <div className="mb-8">
            <label className="block text-gray-700 text-2xl">Name:</label>
            {isEditing ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border rounded text-xl"
              />
            ) : (
              <p className="text-2xl text-gray-900">{name}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-2xl">Email:</label>
            {isEditing ? (
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border rounded text-xl"
              />
            ) : (
              <p className="text-2xl text-gray-900">{email}</p>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-8">
            {/* Show the Edit button if not in editing mode */}
            {!isEditing && (
              <button 
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded text-lg hover:bg-blue-600 transition duration-300"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}

            {/* Show the Update button when in editing mode */}
            {isEditing && (
              <button 
                className="bg-green-500 text-white font-bold py-3 px-6 rounded text-lg hover:bg-green-600 transition duration-300"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
