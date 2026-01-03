import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DrinkImage from '../common/DrinkImage';

export default function DrinkCard({ drink, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <Link
        to={`/drink/${drink.id}`}
        data-testid={`drink-card-${drink.id}`}
        className="block glass-card rounded-2xl overflow-hidden glow-coffee glow-coffee-hover transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="relative overflow-hidden">
            <DrinkImage
              drinkId={drink.id}
              categoryId={drink.categoryId}
              size="lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-espresso group-hover:text-coffee transition-colors duration-200 line-clamp-2 text-lg">
              {drink.name}
            </h3>
            <p className="text-sm text-coffee-light mt-1.5 line-clamp-1">{drink.category}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-coffee">
                {drink.baseCalories} cal
              </span>
              <span className="text-xs text-espresso/60 capitalize glass px-3 py-1.5 rounded-full font-medium">
                {drink.defaultSize}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
