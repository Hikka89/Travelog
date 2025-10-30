import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage({ onLogin, mockUser }) {
  const [activeForm, setActiveForm] = useState('signin');
  const [error, setError] = useState('');
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

  return (
    <div className="flex justify-around">
      <div className="mt-40 flex text-center min-h-full flex-col justify-center px-6 py-12 lg:px-8 basis-1/2">
        <div className="sm:mx-auto sm:w-full">
          <p className="text-3xl text-gray-900 dark:text-white">WELCOME</p>
          <p className="text-xl text-gray-900 dark:text-white">to</p>
          <p className="text-8xl font-bold text-gray-900 dark:text-white">TRAVELOG</p>
          <p className="text-xl text-gray-900 dark:text-white">save your memories</p>
        </div>

        <div className="mt-20 inline-flex justify-center rounded-md" role="group">
          <button 
            type="button" 
            onClick={() => setActiveForm('signin')}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${
              activeForm === 'signin' 
                ? 'bg-blue-700 text-white dark:bg-blue-600' 
                : 'bg-white text-gray-900 dark:bg-gray-800'
            }`}
          >
            Sign in
          </button>
          <button 
            type="button" 
            onClick={() => setActiveForm('signup')}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${
              activeForm === 'signup' 
                ? 'bg-blue-700 text-white dark:bg-blue-600' 
                : 'bg-white text-gray-900 dark:bg-gray-800'
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 basis-1/2">
        {activeForm === 'signin' ? (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-40 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Username
                  </label>
                  <div className="mt-2">
                    <input 
                      id="username" 
                      type="text" 
                      name="username" 
                      required 
                      autoComplete="username" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input 
                      id="password" 
                      type="password" 
                      name="password" 
                      required 
                      autoComplete="current-password" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Sign in
                  </button>
                  <div className="text-sm text-center">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-40 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Create your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input 
                      id="email" 
                      type="email" 
                      name="email" 
                      required 
                      autoComplete="email" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Username
                  </label>
                  <div className="mt-2">
                    <input 
                      id="username" 
                      type="text" 
                      name="username" 
                      required 
                      autoComplete="username" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Password
                  </label>
                  <div className="mt-2">
                    <input 
                      id="password" 
                      type="password" 
                      name="password" 
                      required 
                      autoComplete="new-password" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input 
                      id="confirmPassword" 
                      type="password" 
                      name="confirmPassword" 
                      required 
                      autoComplete="new-password" 
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
                    />
                  </div>
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;