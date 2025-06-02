{/* Header */}
      <header className="bg-white bg-opacity-90 shadow-lg px-6 py-4 flex flex-wrap gap-y-2 items-center fixed w-auto top-0 z-50">
  <Link to="/" className="text-3xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors duration-300 mr-8">
    Agri-Connect
  </Link>
  <div className="flex flex-wrap gap-3 ml-184">
    <Link
      to="/login"
      className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Signup
    </Link>
  </div>
</header>