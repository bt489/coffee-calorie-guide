import { motion } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';
import { getMilkCalorieDelta } from '../../utils/calorieCalculator';
import customizationsData from '../../data/customizations.json';

export default function MilkSelector() {
  const { selectedDrink, customizations, ingredients, dispatch } = useDrink();

  if (!selectedDrink || !selectedDrink.hasMilk) return null;

  const milkOptions = Object.values(ingredients.milks);

  const getCalorieDelta = (milkId) => {
    const currentMilk = customizations.milk;
    if (milkId === currentMilk) return 0;

    const sizeOz = customizationsData.sizes[customizations.size]?.oz || 16;
    const category = selectedDrink.category?.toLowerCase() || '';
    const name = selectedDrink.name?.toLowerCase() || '';

    let milkOz;
    if (category.includes('cappuccino') || name.includes('cappuccino')) {
      milkOz = Math.round(sizeOz * 0.5);
    } else {
      milkOz = Math.round(sizeOz * 0.75);
    }

    return getMilkCalorieDelta(currentMilk, milkId, milkOz, ingredients);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card rounded-2xl p-6 glow-coffee"
    >
      <h3 className="font-semibold text-espresso mb-4 text-lg">Milk</h3>
      <div className="space-y-2">
        {milkOptions.map((milk, index) => {
          const delta = getCalorieDelta(milk.id);
          const isSelected = customizations.milk === milk.id;

          return (
            <motion.button
              key={milk.id}
              onClick={() => dispatch({ type: 'SET_MILK', payload: milk.id })}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.03 }}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-200 btn-press ${
                isSelected
                  ? 'bg-coffee text-white glow-active'
                  : 'glass text-espresso hover:bg-cream-dark/50'
              }`}
            >
              <span className="font-medium">{milk.name}</span>
              {delta !== 0 && !isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    delta > 0
                      ? 'text-calorie-added bg-calorie-added/10'
                      : 'text-calorie-reduced bg-calorie-reduced/10'
                  }`}
                >
                  {delta > 0 ? '+' : ''}
                  {delta} cal
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
