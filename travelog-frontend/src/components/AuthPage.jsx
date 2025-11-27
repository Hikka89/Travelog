import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';

function AuthPage({ onLogin, mockUser }) {
  const [activeForm, setActiveForm] = useState('signin');
  const [error, setError] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === mockUser.username && password === mockUser.password) {
      setError('');
      onLogin(mockUser);
      navigate('/profile');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('Registration functionality coming soon!');
  };

  const handleResetPassword = (email, newPassword) => {
    console.log(`Password reset for: ${email}, new password: ${newPassword}`);
    // В реальном приложении здесь был бы API call для смены пароля
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Мобильная версия - вертикальное расположение */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Логотип и приветствие */}
          <div className="text-center mb-8 w-full max-w-md">
            <p className="text-2xl text-gray-900 dark:text-white mb-2">WELCOME</p>
            <p className="text-lg text-gray-900 dark:text-white mb-4">to</p>
            <p className="text-6xl font-bold text-gray-900 dark:text-white mb-4">TRAVELOG</p>
            <p className="text-lg text-gray-900 dark:text-white mb-6">save your memories</p>
            
            {/* Кнопки переключения форм */}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button 
                type="button" 
                onClick={() => setActiveForm('signin')}
                className={`px-6 py-3 text-sm font-medium border border-gray-200 rounded-s-lg transition-colors ${
                  activeForm === 'signin' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
              >
                Sign in
              </button>
              <button 
                type="button" 
                onClick={() => setActiveForm('signup')}
                className={`px-6 py-3 text-sm font-medium border border-gray-200 rounded-e-lg transition-colors ${
                  activeForm === 'signup' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Форма */}
          <div className="w-full max-w-md">
            {renderForm(activeForm, error, handleSignIn, handleSignUp, () => setIsForgotPasswordOpen(true))}
          </div>
        </div>

        {/* Десктопная версия - горизонтальное расположение */}
        <div className="hidden lg:flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
            {/* Левая часть - логотип и кнопки */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-md">
                <p className="text-3xl text-gray-900 dark:text-white mb-2">WELCOME</p>
                <p className="text-xl text-gray-900 dark:text-white mb-4">to</p>
                <p className="text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6">TRAVELOG</p>
                <p className="text-xl text-gray-900 dark:text-white mb-8">save your memories</p>
                
                {/* Кнопки переключения форм */}
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button 
                    type="button" 
                    onClick={() => setActiveForm('signin')}
                    className={`px-6 py-3 text-sm font-medium border border-gray-200 rounded-s-lg transition-colors ${
                      activeForm === 'signin' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    Sign in
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setActiveForm('signup')}
                    className={`px-6 py-3 text-sm font-medium border border-gray-200 rounded-e-lg transition-colors ${
                      activeForm === 'signup' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>

            {/* Правая часть - форма */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                {renderForm(activeForm, error, handleSignIn, handleSignUp, () => setIsForgotPasswordOpen(true))}
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно восстановления пароля */}
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onResetPassword={handleResetPassword}
        />
      </div>
    </div>
  );
}

// Функция для рендеринга форм
function renderForm(activeForm, error, handleSignIn, handleSignUp, onForgotPassword) {
  return (
    <>
      {activeForm === 'signin' ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Username
              </label>
              <input 
                id="username" 
                type="text" 
                name="username" 
                required 
                autoComplete="username" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Password
              </label>
              <input 
                id="password" 
                type="password" 
                name="password" 
                required 
                autoComplete="current-password" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              Sign in
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Create your account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Email address
              </label>
              <input 
                id="email" 
                type="email" 
                name="email" 
                required 
                autoComplete="email" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Username
              </label>
              <input 
                id="username" 
                type="text" 
                name="username" 
                required 
                autoComplete="username" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Password
              </label>
              <input 
                id="password" 
                type="password" 
                name="password" 
                required 
                autoComplete="new-password" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Confirm Password
              </label>
              <input 
                id="confirmPassword" 
                type="password" 
                name="confirmPassword" 
                required 
                autoComplete="new-password" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400" 
                placeholder="Confirm your password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              Sign up
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AuthPage;