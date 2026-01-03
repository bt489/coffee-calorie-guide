import { motion } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';
import QuantityControl from '../common/QuantityControl';

export default function EspressoOptions() {
  const { selectedDrink, customizations, ingredients, dispatch } = useDrink();

  const isEspressoDrink =
    selectedDrink?.category?.toLowerCase().includes('espresso') ||
    selectedDrink?.category?.toLowerCase().includes('latte') ||
    selectedDrink?.category?.toLowerCase().includes('mocha') ||
    selectedDrink?.category?.toLowerCase().includes('macchiato');

  if (!selectedDrink || !isEspressoDrink) return null;

  const handleShotsChange = (shots) => {
    dispatch({ type: 'SET_ESPRESSO_SHOTS', payload: shots });
  };

  const defaultShots = customizations.size === 'grande' || customizations.size === 'venti' ? 2 : 1;
  const shotDelta = customizations.espressoShots - defaultShots;
  const shotCalories = shotDelta * (ingredients.espresso.signature?.caloriesPerShot || 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-2xl p-6 glow-coffee"
    >
      <h3 className="font-semibold text-espresso mb-4 text-lg">Espresso</h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-espresso">Shots</span>
          {shotCalories !== 0 && (
            <motion.span
              key={shotCalories}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                shotCalories > 0
                  ? 'text-calorie-added bg-calorie-added/10'
                  : 'text-calorie-reduced bg-calorie-reduced/10'
              }`}
            >
              {shotCalories > 0 ? '+' : ''}
              {shotCalories} cal
            </motion.span>
          )}
        </div>
        <QuantityControl
          value={customizations.espressoShots}
          onChange={handleShotsChange}
          min={0}
          max={6}
        />
      </div>

      <p className="text-sm text-coffee-light mt-3">
        Default: {defaultShots} shot{defaultShots !== 1 ? 's' : ''} for {customizations.size}
      </p>
    </motion.div>
  );
}
