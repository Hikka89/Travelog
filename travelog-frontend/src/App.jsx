import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';


const mockUser = {
  username: "traveler123",
  password: "password123",
  firstName: "John",
  lastName: "Doe",
  country: "USA",
  age: 28,
  bio: "Passionate traveler exploring the world one destination at a time.",
  markersCount: 2,
  avatar: "/avatar.png",
  markers: [
    {
      id: 1,
      title: "Eiffel Tower",
      description: "Beautiful view from the top",
      image: "/eiffel.jpg"
    },
    {
      id: 2,
      title: "Tokyo Streets",
      description: "Vibrant night life", 
      image: "/tokyo.jpg"
    }
  ]
};

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/profile" /> : <AuthPage onLogin={handleLogin} mockUser={mockUser} />
          } 
        />
        <Route 
          path="/profile" 
          element={
            user ? (
              <Profile 
                user={user} 
                onUpdateProfile={handleUpdateProfile}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route path="/map" element={<div>Map Page - Coming Soon</div>} />
        <Route path="/people" element={<div>People Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;