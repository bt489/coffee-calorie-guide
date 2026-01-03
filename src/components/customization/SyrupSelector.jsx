import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrink } from '../../context/DrinkContext';
import QuantityControl from '../common/QuantityControl';

export default function SyrupSelector() {
  const { customizations, ingredients, dispatch } = useDrink();
  const [showPicker, setShowPicker] = useState(false);

  const syrupOptions = Object.values(ingredients.syrups);

  const handleAddSyrup = (syrupId) => {
    const syrup = ingredients.syrups[syrupId];
    dispatch({
      type: 'ADD_SYRUP',
      payload: { id: syrupId, name: syrup.name, pumps: 4 },
    });
    setShowPicker(false);
  };

  const handleUpdatePumps = (syrupId, pumps) => {
    if (pumps === 0) {
      dispatch({ type: 'REMOVE_SYRUP', payload: syrupId });
    } else {
      const syrup = customizations.syrups.find((s) => s.id === syrupId);
      dispatch({
        type: 'UPDATE_SYRUP',
        payload: { ...syrup, pumps },
      });
    }
  };

  const handleRemoveSyrup = (syrupId) => {
    dispatch({ type: 'REMOVE_SYRUP', payload: syrupId });
  };

  const availableSyrups = syrupOptions.filter(
    (s) => !customizations.syrups.some((sel) => sel.id === s.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="glass-card rounded-2xl p-6 glow-coffee"
    >
      <h3 className="font-semibold text-espresso mb-4 text-lg">Syrups</h3>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {customizations.syrups.map((syrup) => {
            const syrupData = ingredients.syrups[syrup.id];
            const calories = syrup.pumps * (syrupData?.caloriesPerPump || 20);

            return (
              <motion.div
                key={syrup.id}
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                layout
                className="flex items-center justify-between glass rounded-xl p-4"
              >
                <div className="flex-1">
                  <div className="font-medium text-espresso">
                    {syrup.name}
                  </div>
                  <motion.div
                    key={calories}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-sm text-caramel font-medium"
                  >
                    +{calories} cal
                  </motion.div>
                </div>
                <div className="flex items-center gap-4">
                  <QuantityControl
                    value={syrup.pumps}
                    onChange={(pumps) => handleUpdatePumps(syrup.id, pumps)}
                    min={0}
                    max={12}
                  />
                  <motion.button
                    onClick={() => handleRemoveSyrup(syrup.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-lg font-bold"
                  >
                    ×
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {customizations.syrups.length < 3 && (
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {showPicker ? (
              <motion.div
                key="picker"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-coffee-light">Choose a syrup:</span>
                  <motion.button
                    onClick={() => setShowPicker(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-coffee-light hover:text-espresso text-sm font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableSyrups.map((syrup, index) => (
                    <motion.button
                      key={syrup.id}
                      onClick={() => handleAddSyrup(syrup.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-left px-4 py-3 rounded-xl glass hover:bg-coffee hover:text-white transition-all text-sm btn-press"
                    >
                      {syrup.name}
                      <span className="text-xs opacity-70 ml-1.5">
                        +{syrup.caloriesPerPump}/pump
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="add-button"
                onClick={() => setShowPicker(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 border-2 border-dashed border-coffee/40 rounded-xl text-coffee hover:bg-cream-dark/30 hover:border-coffee transition-all font-medium"
              >
                + Add Syrup
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
