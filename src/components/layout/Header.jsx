import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-dark text-white sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-gradient-to-br from-caramel to-coffee-light rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-xl">☕</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold group-hover:text-caramel transition-colors">
                Coffee Calorie Guide
              </h1>
              <p className="text-xs text-cream-dark/80">Track your favorite drinks</p>
            </div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
