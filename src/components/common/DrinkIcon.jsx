// SVG icons for different drink categories
const icons = {
  coffee: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M12 20h32v4h6a6 6 0 0 1 0 12h-6v4a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V20zm32 12h4a2 2 0 0 0 0-4h-4v4z" />
      <path d="M16 12h24v4H16z" opacity="0.5" />
    </svg>
  ),
  espresso: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <ellipse cx="32" cy="44" rx="16" ry="4" opacity="0.3" />
      <path d="M20 24h24l-2 20a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4l-2-20z" />
      <path d="M18 20h28v4H18z" />
      <path d="M28 10c0-2 1-4 4-4s4 2 4 4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M24 12c0-2 1-4 4-4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  latte: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M16 18h32l-4 32a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4L16 18z" />
      <ellipse cx="32" cy="18" rx="16" ry="4" opacity="0.7" />
      <ellipse cx="32" cy="26" rx="10" ry="3" fill="white" opacity="0.4" />
      <path d="M26 8c2-4 4-4 6 0s4 4 6 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
  frappuccino: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M20 16h24l-4 38a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4L20 16z" />
      <ellipse cx="32" cy="16" rx="12" ry="3" opacity="0.7" />
      <circle cx="32" cy="6" r="6" opacity="0.5" />
      <circle cx="26" cy="8" r="3" fill="white" opacity="0.3" />
      <path d="M28 28l8-4m-8 8l8-4m-8 8l8-4" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  ),
  tea: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M14 22h28v4h6a6 6 0 0 1 0 12h-6v2a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V22zm28 12h4a2 2 0 0 0 0-4h-4v4z" />
      <path d="M20 28v10m6-12v14m6-14v14m6-12v10" stroke="white" strokeWidth="1" opacity="0.3" />
      <rect x="26" y="14" width="4" height="8" rx="1" opacity="0.5" />
    </svg>
  ),
  refresher: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M18 12h28l-4 44a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4L18 12z" />
      <ellipse cx="32" cy="12" rx="14" ry="3" opacity="0.7" />
      <circle cx="26" cy="32" r="4" fill="white" opacity="0.4" />
      <circle cx="36" cy="40" r="3" fill="white" opacity="0.3" />
      <circle cx="30" cy="46" r="2" fill="white" opacity="0.3" />
      <path d="M24 20l4 4m8-4l-4 4" stroke="white" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
  smoothie: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M20 14h24l-4 40a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4L20 14z" />
      <ellipse cx="32" cy="14" rx="12" ry="3" opacity="0.7" />
      <circle cx="32" cy="4" r="4" opacity="0.5" />
      <path d="M24 24c4 4 12 4 16 0" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
      <path d="M26 34c3 3 9 3 12 0" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  coldBrew: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M18 10h28l-4 46a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4L18 10z" />
      <ellipse cx="32" cy="10" rx="14" ry="3" opacity="0.7" />
      <rect x="24" y="18" width="16" height="20" rx="2" fill="white" opacity="0.2" />
      <circle cx="28" cy="44" r="3" fill="white" opacity="0.3" />
      <circle cx="36" cy="48" r="2" fill="white" opacity="0.3" />
    </svg>
  ),
  hotChocolate: (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
      <path d="M12 24h32v4h6a6 6 0 0 1 0 12h-6v4a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V24zm32 12h4a2 2 0 0 0 0-4h-4v4z" />
      <ellipse cx="28" cy="30" rx="6" ry="3" fill="white" opacity="0.5" />
      <ellipse cx="34" cy="32" rx="4" ry="2" fill="white" opacity="0.4" />
      <path d="M24 14c2-4 4-4 6 0s4 4 6 0s4-4 6 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
};

// Map category names to icons
const categoryIconMap = {
  'coffee': 'coffee',
  'classic-espresso-drinks': 'espresso',
  'frappuccino-blended-beverages': 'frappuccino',
  'frappuccino-blended-coffee': 'frappuccino',
  'frappuccino-blended-cr-me': 'frappuccino',
  'frappuccino-light-blended-beverages': 'frappuccino',
  'shaken-iced-beverages': 'refresher',
  'tazo-tea-drinks': 'tea',
  'smoothies': 'smoothie',
  'signature-espresso-drinks': 'latte',
};

// Color schemes for different categories
const categoryColors = {
  'coffee': { bg: 'bg-amber-800', icon: 'text-amber-100' },
  'classic-espresso-drinks': { bg: 'bg-amber-900', icon: 'text-amber-100' },
  'frappuccino-blended-beverages': { bg: 'bg-amber-600', icon: 'text-amber-100' },
  'frappuccino-blended-coffee': { bg: 'bg-amber-700', icon: 'text-amber-100' },
  'frappuccino-blended-cr-me': { bg: 'bg-pink-300', icon: 'text-pink-900' },
  'frappuccino-light-blended-beverages': { bg: 'bg-sky-300', icon: 'text-sky-900' },
  'shaken-iced-beverages': { bg: 'bg-rose-400', icon: 'text-rose-100' },
  'tazo-tea-drinks': { bg: 'bg-green-600', icon: 'text-green-100' },
  'smoothies': { bg: 'bg-orange-400', icon: 'text-orange-100' },
  'signature-espresso-drinks': { bg: 'bg-amber-800', icon: 'text-amber-100' },
};

export default function DrinkIcon({ categoryId, size = 'md', className = '' }) {
  const iconKey = categoryIconMap[categoryId] || 'coffee';
  const colors = categoryColors[categoryId] || { bg: 'bg-starbucks-green', icon: 'text-white' };
  const icon = icons[iconKey] || icons.coffee;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bg} rounded-full flex items-center justify-center p-3 ${className}`}
    >
      <div className={colors.icon}>{icon}</div>
    </div>
  );
}
