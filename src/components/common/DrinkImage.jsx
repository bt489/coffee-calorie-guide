import { useState } from 'react';
import DrinkIcon from './DrinkIcon';

// Curated Unsplash photo IDs for each drink category
// These are free to use under Unsplash license
const categoryImages = {
  'coffee': [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=400&h=400&fit=crop',
  ],
  'classic-espresso-drinks': [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
  ],
  'signature-espresso-drinks': [
    'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
  ],
  'frappuccino-blended-beverages': [
    'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
  ],
  'frappuccino-blended-coffee': [
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530373239216-42518e6b4063?w=400&h=400&fit=crop',
  ],
  'frappuccino-blended-cr-me': [
    'https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586195831450-0b649e49e9a6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&h=400&fit=crop',
  ],
  'frappuccino-light-blended-beverages': [
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&h=400&fit=crop',
  ],
  'shaken-iced-beverages': [
    'https://images.unsplash.com/photo-1553909489-ec4a9fea9b1d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
  ],
  'tazo-tea-drinks': [
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop',
  ],
  'smoothies': [
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop',
  ],
};

// Default coffee images for unknown categories
const defaultImages = [
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop',
];

// Get a consistent image for a drink based on its ID
function getImageForDrink(drinkId, categoryId) {
  const images = categoryImages[categoryId] || defaultImages;
  // Use drink ID to get a consistent index
  const hash = drinkId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
}

export default function DrinkImage({ drinkId, categoryId, size = 'md', className = '' }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageForDrink(drinkId, categoryId);

  const sizeClasses = {
    sm: 'w-full h-32',
    md: 'w-full h-48',
    lg: 'w-full aspect-square',
  };

  if (imageError) {
    // Fallback to icon on error
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-starbucks-green-light to-starbucks-cream flex items-center justify-center ${className}`}>
        <DrinkIcon categoryId={categoryId} size={size === 'lg' ? 'lg' : 'md'} />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt="Drink"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}
