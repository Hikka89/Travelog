import { useState, useRef } from 'react';
import Navbar from './Navbar';

function Profile({ user, onUpdateProfile, onLogout, onUpdateMarkers, onDeleteMarker }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    country: user?.country || '',
    age: user?.age || '',
    bio: user?.bio || ''
  });
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      country: user?.country || '',
      age: user?.age || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        onUpdateProfile({ ...user, avatar: newAvatar });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Количество меток берется из массива markers
  const markersCount = user?.markers?.length || 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col xl:flex-row items-start gap-6">
            {/* Avatar Section - теперь занимает меньше места */}
            <div className="flex-shrink-0 flex flex-col items-center w-full xl:w-auto">
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <button
                  onClick={handleAvatarClick}
                  className="absolute inset-0 backdrop-blur-sm bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-sm font-medium">Change</span>
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={handleAvatarClick}
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Change Photo
              </button>
              
              {/* Статистика перенесена под аватарку на больших экранах */}
              <div className="xl:hidden w-full mt-6">
                <StatsSection markersCount={markersCount} />
              </div>
            </div>
            
            {/* Основная информация профиля */}
            <div className="flex-grow w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Основные данные пользователя */}
                <div className="flex-grow">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {user.username}
                  </h1>
                  
                  {isEditing ? (
                    <EditForm formData={formData} setFormData={setFormData} />
                  ) : (
                    <ProfileInfo user={user} markersCount={markersCount} />
                  )}
                  
                  {/* Bio Section */}
                  <div className="mt-6">
                    {isEditing ? (
                      <BioEdit formData={formData} setFormData={setFormData} />
                    ) : (
                      <BioDisplay user={user} />
                    )}
                  </div>
                  
                  {/* Edit Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                      <EditButtons onSave={handleSave} onCancel={handleCancel} />
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium w-full sm:w-auto"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Статистика - теперь справа на больших экранах */}
                <div className="hidden xl:block w-80 flex-shrink-0">
                  <StatsSection markersCount={markersCount} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Markers Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Travel Memories ({markersCount})
            </h2>
          </div>
          
          {markersCount === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🌎</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No markers yet. Start exploring the map to create your first travel memory!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {user.markers?.map((marker) => (
                <MarkerCard 
                  key={marker.id} 
                  marker={marker} 
                  onUpdate={onUpdateMarkers}
                  onDelete={onDeleteMarker}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Вынесем повторяющиеся части в отдельные компоненты для чистоты

function StatsSection({ markersCount }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 h-fit">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Travel Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Countries visited</span>
          <span className="font-medium text-gray-900 dark:text-white">1</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Total memories</span>
          <span className="font-medium text-gray-900 dark:text-white">{markersCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Member since</span>
          <span className="font-medium text-gray-900 dark:text-white">2024</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Travel level</span>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
            Explorer
          </span>
        </div>
      </div>
    </div>
  );
}

function EditForm({ formData, setFormData }) {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData(prev => ({...prev, country: e.target.value}))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Age"
          />
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({ user, markersCount }) {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {user.firstName} {user.lastName}
      </p>
      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
        <span className="flex items-center">
          <span className="mr-1">📍</span>
          {user.country}
        </span>
        <span className="flex items-center">
          <span className="mr-1">🎂</span>
          Age: {user.age}
        </span>
        <span className="flex items-center">
          <span className="mr-1">📌</span>
          {markersCount} markers
        </span>
      </div>
    </div>
  );
}

function BioEdit({ formData, setFormData }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        About Me
      </label>
      <textarea
        value={formData.bio}
        onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        rows="4"
        placeholder="Tell about yourself..."
      />
    </>
  );
}

function BioDisplay({ user }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Me</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {user.bio || "No bio yet. Tell us about yourself!"}
      </p>
    </div>
  );
}

function EditButtons({ onSave, onCancel }) {
  return (
    <>
      <button
        onClick={onSave}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex-1 sm:flex-none"
      >
        Save Changes
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 flex-1 sm:flex-none"
      >
        Cancel
      </button>
    </>
  );
}

function MarkerCard({ marker, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editData, setEditData] = useState({
    title: marker.title,
    description: marker.description
  });
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(marker.id, { ...marker, ...editData });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: marker.title,
      description: marker.description
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
      if (onDelete) {
        onDelete(marker.id);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        if (onUpdate) {
          onUpdate(marker.id, { ...marker, image: newImage });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        {/* Image with change overlay */}
        <div className="relative group">
          <img 
            src={marker.image} 
            alt={marker.title}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => setIsExpanded(true)}
          />
          <button
            onClick={handleImageClick}
            className="absolute top-2 right-2 bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Change photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        <div className="p-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Title"
                maxLength={50}
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Description"
                maxLength={200}
              />
              <div className="flex justify-between gap-2">
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex-1"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 flex-1"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 
                className="font-bold text-lg text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 leading-tight"
                onClick={() => setIsExpanded(true)}
                title={marker.title}
              >
                {marker.title}
              </h3>
              <p 
                className="text-gray-600 dark:text-gray-300 mb-3 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 line-clamp-3 leading-relaxed"
                onClick={() => setIsExpanded(true)}
                title={marker.description}
              >
                {marker.description}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                📍 {marker.lat?.toFixed(4)}, {marker.lng?.toFixed(4)}
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expanded View Modal */}
      {isExpanded && (
        <div 
          className="fixed backdrop-blur-sm inset-0 bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={marker.image} 
                alt={marker.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 backdrop-blur-sm bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 break-words">
                {marker.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 whitespace-pre-wrap break-words">
                {marker.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Coordinates:</strong> {marker.lat?.toFixed(6)}, {marker.lng?.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;