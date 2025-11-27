import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Фейковые данные пользователей (те же что и в PeoplePage)
const mockUsers = [
  {
    id: 1,
    username: 'traveler_john',
    firstName: 'John',
    lastName: 'Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    country: 'United States',
    age: 28,
    bio: 'Passionate traveler exploring the world one country at a time. Love hiking and photography.',
    markers: [
      {
        id: 1,
        lat: 36.1069,
        lng: -112.1129,
        title: 'Grand Canyon Adventure',
        description: 'Breathtaking views and amazing hiking trails. The Grand Canyon is one of the most spectacular natural wonders in the world.',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        lat: 40.7128,
        lng: -74.0060,
        title: 'New York City',
        description: 'The city that never sleeps. Explored Times Square, Central Park, and the Statue of Liberty.',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: 2,
    username: 'mountain_mike',
    firstName: 'Mike',
    lastName: 'Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    country: 'Australia',
    age: 32,
    bio: 'Mountain climber and nature photographer. Conquered 15 peaks so far!',
    markers: [    
      {
        id: 1,
        lat: 46.5586,
        lng: 8.0356,
        title: 'Swiss Alps',
        description: 'Beautiful alpine landscapes and challenging climbs. The air is so fresh up here!',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        lat: 40.3428,
        lng: -105.6836,
        title: 'Rocky Mountains',
        description: 'Wildlife and wilderness adventure. Saw bears, elk, and amazing mountain views.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: 3,
    username: 'beach_lover_sara',
    firstName: 'Sara',
    lastName: 'Martinez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    country: 'Spain',
    age: 29,
    bio: 'Beach enthusiast and scuba diving instructor. Love tropical destinations.',
    markers: [
      {
        id: 1,
        lat: 3.2028,
        lng: 73.2207,
        title: 'Maldives Paradise',
        description: 'Crystal clear waters and white sand beaches. Perfect for snorkeling and relaxation.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        lat: 37.4467,
        lng: 25.3289,
        title: 'Greek Islands',
        description: 'Beautiful architecture and amazing food. The sunsets here are magical.',
        image: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: 4,
    username: 'urban_explorer_tom',
    firstName: 'Tom',
    lastName: 'Wilson',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
    country: 'United Kingdom',
    age: 31,
    bio: 'City explorer and food blogger. Discovering hidden gems in urban landscapes.',
    markers: [    
      {
        id: 1,
        lat: 48.8566,
        lng: 2.3522,
        title: 'Parisian Cafes',
        description: 'Romantic atmosphere and delicious pastries. Found the best croissants in Montmartre.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: 5,
    username: 'cultural_anna',
    firstName: 'Anna',
    lastName: 'Kowalski',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    country: 'Poland',
    age: 27,
    bio: 'Cultural anthropologist documenting traditions around the world.',
    markers: [
      {
        id: 1,
        lat: 31.6295,
        lng: -7.9811,
        title: 'Moroccan Markets',
        description: 'Colorful souks and rich traditions. The spices and crafts here are incredible.',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        lat: 28.6139,
        lng: 77.2090,
        title: 'Indian Festivals',
        description: 'Vibrant celebrations and ancient rituals. The colors and energy are unforgettable.',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop'
      }
    ]
  }
];

function UserProfilePage({ user, onLogout }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Находим пользователя по ID
  const profileUser = mockUsers.find(u => u.id === parseInt(userId));

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar user={user} onLogout={onLogout} />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">The user you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/people')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBackToPeople = () => {
    navigate('/people');
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsExpanded(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Кнопка назад */}
        <div className="mb-6">
          <button
            onClick={handleBackToPeople}
            className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Community
          </button>
        </div>

        {/* Profile Card - только для просмотра */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col xl:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="flex-shrink-0 flex flex-col items-center w-full xl:w-auto">
              <img 
                src={profileUser.avatar} 
                alt="Profile" 
                className="w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
              
              {/* Статистика */}
              <div className="xl:hidden w-full mt-6">
                <StatsSection markersCount={profileUser.markers.length} />
              </div>
            </div>
            
            {/* Основная информация профиля */}
            <div className="flex-grow w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Основные данные пользователя */}
                <div className="flex-grow">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {profileUser.username}
                  </h1>
                  
                  <ProfileInfo user={profileUser} markersCount={profileUser.markers.length} />
                  
                  {/* Bio Section */}
                  <div className="mt-6">
                    <BioDisplay user={profileUser} />
                  </div>
                </div>
                
                {/* Статистика - теперь справа на больших экранах */}
                <div className="hidden xl:block w-80 flex-shrink-0">
                  <StatsSection markersCount={profileUser.markers.length} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Markers Section - только для просмотра */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Travel Memories ({profileUser.markers.length})
            </h2>
          </div>
          
          {profileUser.markers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🌎</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No travel memories yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {profileUser.markers.map((marker) => (
                <ViewOnlyMarkerCard 
                  key={marker.id} 
                  marker={marker} 
                  onMarkerClick={handleMarkerClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded View Modal */}
      {isExpanded && selectedMarker && (
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
                src={selectedMarker.image} 
                alt={selectedMarker.title}
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
                {selectedMarker.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 whitespace-pre-wrap break-words">
                {selectedMarker.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Coordinates:</strong> {selectedMarker.lat?.toFixed(6)}, {selectedMarker.lng?.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Компоненты (аналогичные Profile, но без редактирования)

function StatsSection({ markersCount }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 h-fit">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Travel Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Countries visited</span>
          <span className="font-medium text-gray-900 dark:text-white">{Math.ceil(markersCount / 2)}</span>
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
            {markersCount > 5 ? 'Explorer' : markersCount > 2 ? 'Traveler' : 'Beginner'}
          </span>
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

function BioDisplay({ user }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Me</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {user.bio || "No bio yet."}
      </p>
    </div>
  );
}

// Карточка маркера только для просмотра
function ViewOnlyMarkerCard({ marker, onMarkerClick }) {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={marker.image} 
          alt={marker.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onMarkerClick(marker)}
        />
      </div>
      
      <div className="p-4">
        <h3 
          className="font-bold text-lg text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 leading-tight"
          onClick={() => onMarkerClick(marker)}
          title={marker.title}
        >
          {marker.title}
        </h3>
        <p 
          className="text-gray-600 dark:text-gray-300 mb-3 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 line-clamp-3 leading-relaxed"
          onClick={() => onMarkerClick(marker)}
          title={marker.description}
        >
          {marker.description}
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          📍 {marker.lat?.toFixed(4)}, {marker.lng?.toFixed(4)}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;