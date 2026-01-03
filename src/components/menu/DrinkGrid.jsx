import { motion, AnimatePresence } from 'framer-motion';
import DrinkCard from './DrinkCard';

export default function DrinkGrid({ drinks }) {
  if (drinks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 text-gray-500"
      >
        <p className="text-lg">No drinks found in this category.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      layout
    >
      <AnimatePresence mode="popLayout">
        {drinks.map((drink, index) => (
          <DrinkCard key={drink.id} drink={drink} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
