import { useState } from 'react';
import Navbar from './Navbar';

function Profile({ user, onUpdateProfile, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    age: user.age,
    bio: user.bio
  });

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      age: user.age,
      bio: user.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.username}
                  </h1>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Last Name"
                      />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Country"
                      />
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Age"
                      />
                    </div>
                  ) : (
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-700 dark:text-gray-300">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{user.country}</p>
                      <p className="text-gray-600 dark:text-gray-400">Age: {user.age}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user.markersCount} markers placed
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
              
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full mt-4 border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  rows="3"
                  placeholder="Tell about yourself..."
                />
              ) : (
                <p className="mt-4 text-gray-600 dark:text-gray-300">{user.bio}</p>
              )}
              
              {isEditing && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            My Markers ({user.markers?.length || 0})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.markers?.map((marker) => (
              <MarkerCard key={marker.id} marker={marker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkerCard({ marker }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: marker.title,
    description: marker.description
  });

  const handleSave = () => {
    //логика сохранения изменений
    setIsEditing(false);
  };

  const handleDelete = () => {
    //логика удаления
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img 
        src={marker.image} 
        alt={marker.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        {isEditing ? (
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full border rounded px-2 py-1 mb-2 dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            {marker.title}
          </h3>
        )}
        
        {isEditing ? (
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full border rounded px-2 py-1 mb-3 dark:bg-gray-700 dark:text-white"
            rows="2"
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {marker.description}
          </p>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 dark:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;