import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';

// Фейковые данные пользователей
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
        title: 'Grand Canyon Adventure',
        description: 'Breathtaking views and amazing hiking trails',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'New York City',
        description: 'The city that never sleeps',
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
        title: 'Swiss Alps',
        description: 'Beautiful alpine landscapes',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Rocky Mountains',
        description: 'Wildlife and wilderness adventure',
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
        title: 'Maldives Paradise',
        description: 'Crystal clear waters and white sand beaches',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Greek Islands',
        description: 'Beautiful architecture and amazing food',
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
        title: 'Parisian Cafes',
        description: 'Romantic atmosphere and delicious pastries',
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
        title: 'Moroccan Markets',
        description: 'Colorful souks and rich traditions',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Indian Festivals',
        description: 'Vibrant celebrations and ancient rituals',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop'
      }
    ]
  }
];



function PeoplePage({ user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const [realUsers, setRealUsers] = useState([]);
  useEffect(() => {
    const userResponse = axios.get(`http://127.0.0.1:8000/api/users`, {headers:{
      'Authorization':`Bearer ${Cookies.get('jwt')}`
    }
    });
    userResponse.then(userdata =>{
      setRealUsers(userdata.data);
      console.log(userdata);
    })
  }, []);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = useMemo(() => {
    return realUsers.filter(person =>
      person.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.second_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, realUsers]);

  console.log(filteredUsers);

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

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
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Заголовок и поиск */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Travel Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover fellow travelers and explore their adventures
          </p>
          
          {/* Поисковая строка */}
          <div className="max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name, username, or country..."
              />
            </div>
          </div>
        </div>

        {/* Результаты поиска */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Found {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Сетка карточек пользователей */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No people found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((person) => (
              <UserCard 
                key={person._id} 
                user={person} 
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Компонент карточки пользователя
function UserCard({ user, onViewProfile }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Верхняя часть с аватаркой и основной информацией */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={`data:image/webp;base64,${user.avatar}`}
            alt={user.user_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {user.first_name} {user.second_name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              @{user.user_name}
            </p>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="mr-3 flex items-center">
                <span className="mr-1">📍</span>
                {user.country}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🎂</span>
                {user.age}
              </span>
            </div>
          </div>
        </div>

        {/* Био */}
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {user.about}
        </p>

        {/* Статистика */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-1">📌</span>
              {/* {user.markers.length} memories */}
            </span>
          </div>
        </div>
      </div>

      {/* Галерея фотографий из маркеров */}
      {/*user.markers.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {user.markers.slice(0, 3).map((marker, index) => (
              <img 
                key={marker.id}
                src={marker.image} 
                alt={marker.title}
                className="w-20 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm"
              />
            ))}
            {user.markers.length > 3 && (
              <div className="w-20 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                +{user.markers.length - 3} more
              </div>
            )}
          </div>
        </div>
      )*/}

      {/* Кнопка просмотра профиля */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onViewProfile(user._id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default PeoplePage;