import { motion, AnimatePresence } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';

export default function CalorieDisplay() {
  const { calories } = useDrink();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 text-center glow-coffee"
      data-testid="calorie-display"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={calories.total}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="text-6xl font-bold text-coffee calorie-pulse"
        >
          {calories.total}
        </motion.div>
      </AnimatePresence>
      <div className="text-lg text-coffee-light mt-2 font-medium">Calories</div>

      <AnimatePresence>
        {calories.delta !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 inline-block text-sm font-medium px-3 py-1 rounded-full ${
              calories.delta > 0
                ? 'text-calorie-added bg-calorie-added/10'
                : 'text-calorie-reduced bg-calorie-reduced/10'
            }`}
          >
            {calories.delta > 0 ? '+' : ''}
            {calories.delta} from base
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breakdown */}
      <AnimatePresence>
        {(calories.breakdown?.syrups > 0 ||
          calories.breakdown?.toppings > 0 ||
          calories.breakdown?.shots !== 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-5 border-t border-coffee/10 text-left text-sm"
          >
            <div className="text-coffee-light mb-3 font-medium">Breakdown:</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-coffee-light">Base drink</span>
                <span className="font-medium text-espresso">{calories.base}</span>
              </div>
              {calories.breakdown?.syrups > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between text-caramel"
                >
                  <span>Syrups</span>
                  <span className="font-medium">+{calories.breakdown.syrups}</span>
                </motion.div>
              )}
              {calories.breakdown?.toppings > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between text-caramel"
                >
                  <span>Toppings</span>
                  <span className="font-medium">+{calories.breakdown.toppings}</span>
                </motion.div>
              )}
              {calories.breakdown?.shots !== 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between text-caramel"
                >
                  <span>Espresso shots</span>
                  <span className="font-medium">
                    {calories.breakdown.shots > 0 ? '+' : ''}
                    {calories.breakdown.shots}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
