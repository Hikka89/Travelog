function App() {
  
  return (
<div class="flex justify-around">


    <div class="flex text-center min-h-full flex-col justify-center px-6 py-12 lg:px-8 basis-1/2">
      <div class="sm:mx-auto sm:w-full">
        <p class="text-3xl text-gray-900 dark:text-white">WELCOME</p>
        <p class="text-xl text-gray-900 dark:text-white">to</p>
        <p class="text-8xl font-bold text-gray-900 dark:text-white">TRAVELOG</p>
        <p class="text-xl text-gray-900 dark:text-white">save your memories</p>
      </div>

      <div class="mt-20 inline-flex justify-center rounded-md" role="group">
        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
          Sign in
        </button>
        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
          Sign up
        </button>
      </div>
    </div>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 basis-1/2">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-40 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" class="space-y-6">
        <div>
          <label for="username" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Username</label>
          <div class="mt-2">
            <input id="username" type="text" name="username" required autocomplete="username" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Sign in</button>
          <div class="text-sm text-center">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
        </div>
      </form> 
    </div>
    </div>


</div>
  )
}

export default App
