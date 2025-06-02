import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import feildImage from '../storage/feild.jpg';

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 font-sans text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="px-6 py-4 fixed w-300 top-0 z-50 bg-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <nav className="max-w-7xl mx-15 flex justify-between items-center">
          <Link to="/" className="flex items-center shrink-0">
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Leaf size={32} className="mr-2 text-green-600" />
            </motion.div>
            <motion.span 
              className="text-3xl font-bold text-indigo-700"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Agri-Connect
            </motion.span>
          </Link>
          
          <div className="flex gap-3 ml-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="px-6 py-2 font-semibold rounded-lg shadow-md bg-indigo-600 text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="px-6 py-2 font-semibold rounded-lg shadow-md bg-green-600 text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Signup
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${feildImage})` }}
      >
        <motion.div 
          className="absolute inset-0 bg-black opacity-60"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Agri-Connect: Empowering Farmers for a Prosperous Future
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connecting farmers with technology, market insights, and a thriving community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-yellow-400 text-gray-900 text-lg sm:text-xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
            >
              Get Started Today!
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Revolutionizing Agriculture with Technology
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Agri-Connect is a next-generation platform built to revolutionize agriculture by providing farmers with
            real-time weather updates, live market prices, expert advice, and a community space to connect and share.
            We leverage cutting-edge technology to bridge the information gap in agriculture, empowering rural
            communities across India, starting with Dhanbad, Jharkhand, to make smarter, faster, and more profitable decisions.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-100 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Why Choose Agri-Connect?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: '📊',
                title: 'Real-time Insights',
                description: 'Access instant weather forecasts, live crop market prices, and crucial alerts directly on your device.'
              },
              {
                emoji: '🌱',
                title: 'Expert Guidance',
                description: 'Get tailored crop suggestions and access a comprehensive library of best farming practices.'
              },
              {
                emoji: '🤝',
                title: 'Community & Support',
                description: 'Connect with fellow farmers, share knowledge, and collaborate for collective growth.'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="text-5xl mb-4 text-center"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-24 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <motion.div 
          className="absolute inset-0 bg-green-800 opacity-70"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Ready to Transform Your Farming?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join thousands of farmers already benefiting from Agri-Connect's digital tools.
            Start your journey towards a more productive and profitable future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="inline-block px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Join Agri-Connect
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Leaf size={24} className="text-green-400 mr-2" />
              <span className="text-lg font-semibold">Agri-Connect</span>
            </motion.div>
            
            <p className="text-gray-400 mb-4">&copy; {new Date().getFullYear()} Agri-Connect. All rights reserved.</p>
            
            <div className="mt-2 text-sm flex justify-center">
              <motion.p 
                className="mx-2 text-gray-500 hover:text-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.p>
              <span className="text-gray-500">|</span>
              <motion.p 
                className="mx-2 text-gray-500 hover:text-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default LandingPage;