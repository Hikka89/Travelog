import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import MapPage from './components/MapPage';
import UserProfilePage from './components/UserProfilePage';
import PeoplePage from './components/PeoplePage'; 
import Navbar from './components/Navbar';

const mockUser = {
  username: 'traveler123',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  country: 'USA',
  age: 28,
  bio: 'Passionate traveler exploring the world one destination at a time.',
  avatar: '/src/assets/avatar.png',
  markersCount: 3,
  markers: [
    {
      id: 1,
      lat: 51.505,
      lng: -0.09,
      title: 'London Adventure',
      description: 'Beautiful day exploring London parks and museums.',
      image: '/src/assets/eiffel.jpg'
    },
    {
      id: 2,
      lat: 48.8566,
      lng: 2.3522,
      title: 'Paris Memories',
      description: 'Romantic evening near Eiffel Tower.',
      image: '/src/assets/tokyo.jpg'
    }
  ]
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    console.log('Login successful');
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logging out');
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleAddMarker = (newMarker) => {
    setUser(prev => ({
      ...prev,
      markers: [...prev.markers, newMarker],
      markersCount: prev.markersCount + 1
    }));
  };

  console.log('Current auth status:', isAuthenticated);
  console.log('Current user:', user);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/profile" replace /> : 
              <AuthPage onLogin={handleLogin} mockUser={mockUser} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile 
                user={user} 
                onUpdateProfile={handleUpdateProfile} 
                onLogout={handleLogout} 
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/map" 
            element={
              isAuthenticated ? 
              <MapPage 
                user={user} 
                onLogout={handleLogout} 
                onAddMarker={handleAddMarker}
              /> : 
              <Navigate to="/" replace />
            } 
          />

          <Route 
            path="/user/:userId" 
            element={
              isAuthenticated ? 
              <UserProfilePage 
                user={user} 
                onLogout={handleLogout}
              /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/people" 
            element={
              isAuthenticated ? 
              <PeoplePage 
                user={user} 
                onLogout={handleLogout}
              /> : 
              <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;