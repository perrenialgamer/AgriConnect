import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12 bg-white rounded-xl shadow-lg">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-xl shadow-md p-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Agri-Connect!
        </h1>
        <p className="text-lg md:text-xl font-light">
          Your digital partner in cultivating a prosperous agricultural future.
        </p>
      </div>

      {/* What is Agri-Connect? Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          What is Agri-Connect?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          Agri-Connect is a pioneering platform dedicated to empowering farmers and agricultural vendors
          across India, starting with the vibrant community of Dhanbad, Jharkhand. We bridge the information
          gap by providing cutting-edge digital tools and resources designed to optimize farming practices,
          enhance market access, and foster a thriving agricultural community.
        </p>
      </section>

      {/* Key Features Section (Using the Dashboard Card Style) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Feature Card 1: Real-Time Weather */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-indigo-600 mb-4 text-center">☀️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Real-Time Weather Forecasting</h3>
              <p className="text-gray-700 text-center">
                Stay ahead of the weather with accurate, localized forecasts. Plan your sowing, harvesting, and irrigation activities with confidence, minimizing risks and maximizing yield.
              </p>
            </div>
            <Link
              to="/weather"
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Explore Weather
            </Link>
          </div>

          {/* Feature Card 2: Live Crop Market Prices */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-green-600 mb-4 text-center">📈</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Live Crop Market Prices</h3>
              <p className="text-gray-700 text-center">
                Access up-to-the-minute market rates for various crops. Make informed decisions about when and where to sell or buy, ensuring the best possible returns.
              </p>
            </div>
            <Link
              to="/crops-prices"
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Check Prices
            </Link>
          </div>

          {/* Feature Card 3: Intelligent Crop Suggestor */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-yellow-500 mb-4 text-center">💡</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Intelligent Crop Suggestor</h3>
              <p className="text-gray-700 text-center">
                Receive personalized crop recommendations based on your local climate, soil type, and market demand. Optimize your planting for higher profitability.
              </p>
            </div>
            <Link
              to="/crops-suggestor"
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Get Suggestions
            </Link>
          </div>

          {/* Feature Card 4: Farmer-Vendor Network */}
          
          {/* <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-blue-600 mb-4 text-center">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Farmer-Vendor Network</h3>
              <p className="text-gray-700 text-center">
                Connect directly with farmers and vendors. Facilitate smoother transactions, discover new opportunities, and build strong, reliable partnerships.
              </p>
            </div>
            <Link
              to="/login" // Or to a specific "network" page if it exists
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Join the Network
            </Link>
          </div> */}

          {/* Feature Card 5: Best Practices & Community */}
          {/* <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-purple-600 mb-4 text-center">📚</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Best Practices & Community</h3>
              <p className="text-gray-700 text-center">
                Access a curated library of farming best practices and engage with a vibrant community forum. Learn, share, and grow together.
              </p>
            </div>
            <Link
              to="/community" // Or a generic dashboard link if community is a feature
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Explore Knowledge
            </Link>
          </div> */}

          {/* Feature Card 6: User-Friendly Dashboard */}
          {/* <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-5xl text-red-500 mb-4 text-center">🖥️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Personalized Dashboard</h3>
              <p className="text-gray-700 text-center">
                A customized view of essential information, quick actions, and relevant alerts tailored to your role as a farmer or vendor.
              </p>
            </div>
            <Link
              to="/home" // Link to the actual dynamic home page if logged in
              className="mt-6 inline-block w-full text-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              View Dashboard
            </Link>
          </div> */}

        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md p-8 text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Grow with Agri-Connect?
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Join our growing community and harness the power of technology for agriculture.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
        >
          Register Your Account
        </Link>
      </section> */}
    </div>
  );
}

export default Home
