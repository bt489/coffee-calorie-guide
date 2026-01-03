import { motion } from 'framer-motion';

export default function QuantityControl({ value, onChange, min = 0, max = 10, label }) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-coffee-light">{label}</span>}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={handleDecrement}
          disabled={value <= min}
          whileHover={value > min ? { scale: 1.1 } : {}}
          whileTap={value > min ? { scale: 0.9 } : {}}
          className="w-9 h-9 rounded-full glass text-espresso font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-coffee hover:text-white transition-all btn-press flex items-center justify-center text-lg"
        >
          -
        </motion.button>
        <motion.span
          key={value}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-8 text-center font-bold text-espresso text-lg"
        >
          {value}
        </motion.span>
        <motion.button
          onClick={handleIncrement}
          disabled={value >= max}
          whileHover={value < max ? { scale: 1.1 } : {}}
          whileTap={value < max ? { scale: 0.9 } : {}}
          className="w-9 h-9 rounded-full glass text-espresso font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-coffee hover:text-white transition-all btn-press flex items-center justify-center text-lg"
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
