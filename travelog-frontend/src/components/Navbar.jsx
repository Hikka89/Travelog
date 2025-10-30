import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">TRAVELOG</span>
          </div>
          
          <div className="flex space-x-8">
            <Link 
              to="/profile" 
              className="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 text-sm font-medium dark:text-indigo-400"
            >
              My Account
            </Link>
            <Link 
              to="/map" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Map
            </Link>
            <Link 
              to="/people" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-indigo-400"
            >
              People
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-red-400"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;