import { motion } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';

const AMOUNT_OPTIONS = [
  { id: 'none', name: 'None', multiplier: 0 },
  { id: 'light', name: 'Light', multiplier: 0.5 },
  { id: 'standard', name: 'Standard', multiplier: 1 },
  { id: 'extra', name: 'Extra', multiplier: 1.5 },
];

export default function ToppingSelector() {
  const { customizations, ingredients, dispatch } = useDrink();

  const toppingOptions = Object.values(ingredients.toppings);

  const handleToppingChange = (toppingId, amount) => {
    dispatch({
      type: 'SET_TOPPING',
      payload: { id: toppingId, amount },
    });
  };

  const getSelectedAmount = (toppingId) => {
    const topping = customizations.toppings.find((t) => t.id === toppingId);
    return topping?.amount || 'none';
  };

  const getCalories = (toppingId, amount) => {
    const topping = ingredients.toppings[toppingId];
    const option = AMOUNT_OPTIONS.find((o) => o.id === amount);
    if (!topping || !option) return 0;
    return Math.round(topping.caloriesStandard * option.multiplier);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-2xl p-6 glow-coffee"
    >
      <h3 className="font-semibold text-espresso mb-4 text-lg">Toppings</h3>

      <div className="space-y-5">
        {toppingOptions.map((topping, toppingIndex) => {
          const selectedAmount = getSelectedAmount(topping.id);
          const calories = getCalories(topping.id, selectedAmount);

          return (
            <motion.div
              key={topping.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + toppingIndex * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-espresso">
                  {topping.name}
                </span>
                {calories > 0 && (
                  <motion.span
                    key={calories}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-sm text-caramel font-medium bg-caramel/10 px-2 py-0.5 rounded-full"
                  >
                    +{calories} cal
                  </motion.span>
                )}
              </div>
              <div className="flex gap-2">
                {AMOUNT_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleToppingChange(topping.id, option.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-200 btn-press ${
                      selectedAmount === option.id
                        ? 'bg-coffee text-white glow-active'
                        : 'glass text-espresso hover:bg-cream-dark/50'
                    }`}
                  >
                    {option.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
