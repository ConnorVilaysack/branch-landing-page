import { motion } from 'motion/react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src="/branch-logo.png" alt="Branch" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">
              Branch
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#demo" className="text-gray-500 hover:text-gray-900 transition-colors">
              Demo
            </a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </a>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
