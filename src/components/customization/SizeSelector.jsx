import { motion } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';
import customizationsData from '../../data/customizations.json';

export default function SizeSelector() {
  const { selectedDrink, customizations, dispatch } = useDrink();

  if (!selectedDrink) return null;

  const availableSizes = selectedDrink.availableSizes || [];
  const { sizes } = customizationsData;

  const sortedSizes = availableSizes
    .map((sizeId) => sizes[sizeId])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card rounded-2xl p-6 glow-coffee"
    >
      <h3 className="font-semibold text-espresso mb-4 text-lg">Size</h3>
      <div className="flex gap-3 flex-wrap">
        {sortedSizes.map((size) => (
          <motion.button
            key={size.id}
            onClick={() => dispatch({ type: 'SET_SIZE', payload: size.id })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 btn-press ${
              customizations.size === size.id
                ? 'bg-coffee text-white glow-active'
                : 'glass text-espresso hover:bg-cream-dark/50'
            }`}
          >
            {size.name}
            <span className="ml-1.5 text-xs opacity-70">{size.oz}oz</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
