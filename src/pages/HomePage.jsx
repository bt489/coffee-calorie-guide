import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDrink } from '../context/DrinkContext';
import CategoryNav from '../components/menu/CategoryNav';
import DrinkGrid from '../components/menu/DrinkGrid';

export default function HomePage() {
  const { drinks } = useDrink();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrinks = useMemo(() => {
    let result = drinks;

    if (activeCategory) {
      result = result.filter((drink) => drink.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (drink) =>
          drink.name.toLowerCase().includes(query) ||
          drink.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [drinks, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          placeholder="Search drinks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl glass glow-coffee focus:glow-active outline-none transition-all duration-200 text-espresso placeholder:text-coffee-light/60 text-lg"
        />
      </motion.div>

      {/* Category Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-coffee-light"
      >
        Showing {filteredDrinks.length} drink{filteredDrinks.length !== 1 ? 's' : ''}
      </motion.div>

      {/* Drink Grid */}
      <DrinkGrid drinks={filteredDrinks} />
    </div>
  );
}
