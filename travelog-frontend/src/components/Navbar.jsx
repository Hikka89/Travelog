import { Link, useNavigate, useLocation } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/profile', label: 'My Account' },
    { path: '/map', label: 'Map' },
    { path: '/people', label: 'People' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Логотип */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              TRAVELOG
            </span>
          </div>
          
          {/* Десктопное меню - скрыто на мобильных */}
          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.path) 
                    ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Log Out
            </button>
          </div>

          {/* Бургер-меню - видно только на мобильных */}
          <BurgerMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;