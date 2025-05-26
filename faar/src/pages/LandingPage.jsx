import React from 'react';
import { Link } from 'react-router-dom';
import feildImage from '../storage/feild.jpg'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 font-sans text-gray-800">
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

      {/* Hero Section */}
     <section
  className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
  style={{ backgroundImage: `url(${feildImage})` }}
>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Agri-Connect: Empowering Farmers for a Prosperous Future
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-200">
            Connecting farmers with technology, market insights, and a thriving community.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-yellow-400 text-gray-900 text-xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-400"
          >
            Get Started Today!
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Revolutionizing Agriculture with Technology
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Agri-Connect is a next-generation platform built to revolutionize agriculture by providing farmers with
            real-time weather updates, live market prices, expert advice, and a community space to connect and share.
            We leverage cutting-edge technology to bridge the information gap in agriculture, empowering rural
            communities across India, starting with Dhanbad, Jharkhand, to make smarter, faster, and more profitable decisions.
          </p>
        </div>
      </section>

      {/* Why Choose Section (Cards/Features) */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-100 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Agri-Connect?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-5xl text-indigo-600 mb-4 text-center">📊</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Real-time Insights</h3>
              <p className="text-gray-700 text-center">
                Access instant weather forecasts, live crop market prices, and crucial alerts directly on your device.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-5xl text-green-600 mb-4 text-center">🌱</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Expert Guidance</h3>
              <p className="text-gray-700 text-center">
                Get tailored crop suggestions and access a comprehensive library of best farming practices.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-5xl text-yellow-500 mb-4 text-center">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Community & Support</h3>
              <p className="text-gray-700 text-center">
                Connect with fellow farmers, share knowledge, and collaborate for collective growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image with Call to Action */}
      <section
        className="relative py-24 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-green-800 opacity-70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of farmers already benefiting from Agri-Connect's digital tools.
            Start your journey towards a more productive and profitable future.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Join Agri-Connect
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4 text-lg font-semibold">Agri-Connect</p>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Agri-Connect. All rights reserved.</p>
          <div className="mt-4 text-sm text-gray-500 flex justify-center">
            <p  className="hover:text-white mx-2">Privacy Policy</p> |
            <p className="hover:text-white mx-2">Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;