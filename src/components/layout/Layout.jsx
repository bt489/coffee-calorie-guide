import { motion } from 'framer-motion';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-1 max-w-7xl w-full mx-auto px-6 py-8"
      >
        {children}
      </motion.main>
      <footer className="glass-dark text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-cream-dark text-sm">
            Nutritional information is approximate and may vary by location.
          </p>
          <p className="mt-3 text-xs text-white/60 max-w-2xl mx-auto">
            This app is not affiliated with, endorsed by, or sponsored by Starbucks Corporation.
            All product names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
