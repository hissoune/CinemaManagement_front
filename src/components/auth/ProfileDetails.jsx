import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfileDetails() {
  const { user, updateUser } = useContext(AuthContext); 
  const [isEditing, setIsEditing] = useState(false); 
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar || "https://randomuser.me/api/portraits/men/94.jpg");

  const [error, setError] = useState("");

  const handleEditClick = () => setIsEditing(true); 

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (!name || !email) {
      setError("Both name and email are required");
      return;
    }
    const updatedUser = { name, email, avatar };
    updateUser(updatedUser); 
    setIsEditing(false); 
    alert("Profile updated successfully!");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Profile</h2>

          {/* Avatar Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-8">
            <label className="block text-gray-700 text-xl mb-2">Name:</label>
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
            <label className="block text-gray-700 text-xl mb-2">Email:</label>
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
            {!isEditing ? (
              <button 
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded text-lg hover:bg-blue-600 transition duration-300"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            ) : (
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
