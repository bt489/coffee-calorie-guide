import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDrink } from '../context/DrinkContext';
import DrinkImage from '../components/common/DrinkImage';
import CalorieDisplay from '../components/nutrition/CalorieDisplay';
import SizeSelector from '../components/customization/SizeSelector';
import MilkSelector from '../components/customization/MilkSelector';
import EspressoOptions from '../components/customization/EspressoOptions';
import SyrupSelector from '../components/customization/SyrupSelector';
import ToppingSelector from '../components/customization/ToppingSelector';

export default function DrinkDetailPage() {
  const { drinkId } = useParams();
  const { drinks, selectedDrink, dispatch } = useDrink();

  useEffect(() => {
    const drink = drinks.find((d) => d.id === drinkId);
    if (drink) {
      dispatch({ type: 'SELECT_DRINK', payload: drink });
    }
  }, [drinkId, drinks, dispatch]);

  if (!selectedDrink) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="glass-card rounded-2xl p-8 inline-block">
          <p className="text-coffee-light text-lg">Loading drink...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-coffee hover:text-coffee-dark transition-colors font-medium group"
        >
          <motion.span
            className="inline-block"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ←
          </motion.span>
          <span className="group-hover:underline">Back to Menu</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Drink Info */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl overflow-hidden glow-coffee sticky top-24"
          >
            <DrinkImage
              drinkId={selectedDrink.id}
              categoryId={selectedDrink.categoryId}
              size="lg"
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-espresso">
                {selectedDrink.name}
              </h1>
              <p className="text-coffee-light mt-1">{selectedDrink.category}</p>
            </div>

            {/* Calorie Display */}
            <div className="px-6 pb-6">
              <CalorieDisplay />
            </div>
          </motion.div>
        </div>

        {/* Right Column - Customization */}
        <div className="lg:col-span-2 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-espresso"
          >
            Customize Your Drink
          </motion.h2>

          <SizeSelector />
          <MilkSelector />
          <EspressoOptions />
          <SyrupSelector />
          <ToppingSelector />
        </div>
      </div>
    </motion.div>
  );
}
