import { motion } from 'framer-motion';
import categoriesData from '../../data/categories.json';

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const { categories } = categoriesData;

  return (
    <div className="mb-8">
      <motion.div
        className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={() => onCategoryChange(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 btn-press ${
            activeCategory === null
              ? 'bg-coffee text-white glow-active'
              : 'glass text-espresso hover:bg-cream-dark/50 glow-coffee'
          }`}
        >
          All Drinks
        </motion.button>
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 btn-press ${
              activeCategory === category.id
                ? 'bg-coffee text-white glow-active'
                : 'glass text-espresso hover:bg-cream-dark/50 glow-coffee'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
