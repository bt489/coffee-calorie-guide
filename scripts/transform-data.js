import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CSV
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    return obj;
  });
}

// Extract size and milk from Beverage_prep
function parseBeveragePrep(prep) {
  const sizes = ['Short', 'Tall', 'Grande', 'Venti', 'Trenta'];
  const milks = [
    { key: 'nonfat', pattern: /Nonfat Milk/i },
    { key: '2percent', pattern: /2% Milk/i },
    { key: 'whole', pattern: /Whole Milk/i },
    { key: 'soymilk', pattern: /Soymilk/i },
    { key: 'coconutmilk', pattern: /Coconut/i },
    { key: 'almondmilk', pattern: /Almond/i },
    { key: 'oatmilk', pattern: /Oat/i },
  ];

  let size = 'grande';
  for (const s of sizes) {
    if (prep.toLowerCase().includes(s.toLowerCase())) {
      size = s.toLowerCase();
      break;
    }
  }

  let milk = '2percent'; // default
  for (const m of milks) {
    if (m.pattern.test(prep)) {
      milk = m.key;
      break;
    }
  }

  return { size, milk };
}

// Create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Main transform
function transform() {
  const csvPath = path.join(__dirname, '../src/data/starbucks-raw.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  // Group by drink name
  const drinkMap = new Map();
  const categories = new Set();

  for (const row of rows) {
    const category = row['Beverage_category'];
    const name = row['Beverage'];
    const { size, milk } = parseBeveragePrep(row['Beverage_prep']);
    const calories = parseInt(row['Calories']) || 0;

    categories.add(category);

    const drinkKey = `${category}|${name}`;
    if (!drinkMap.has(drinkKey)) {
      drinkMap.set(drinkKey, {
        id: createSlug(name),
        name: name,
        category: category,
        categoryId: createSlug(category),
        sizes: {},
        milkOptions: new Set(),
      });
    }

    const drink = drinkMap.get(drinkKey);

    // Store calorie data by size and milk
    if (!drink.sizes[size]) {
      drink.sizes[size] = {};
    }
    drink.sizes[size][milk] = {
      calories,
      totalFat: parseFloat(row[' Total Fat (g)']) || 0,
      saturatedFat: parseFloat(row['Saturated Fat (g)']) || 0,
      sodium: parseInt(row[' Sodium (mg)']) || 0,
      carbs: parseInt(row[' Total Carbohydrates (g) ']) || 0,
      sugar: parseInt(row[' Sugars (g)']) || 0,
      protein: parseFloat(row[' Protein (g) ']) || 0,
      caffeine: parseInt(row['Caffeine (mg)']) || 0,
    };

    drink.milkOptions.add(milk);
  }

  // Convert to drinks.json format
  const drinks = [];
  for (const [key, drink] of drinkMap) {
    const availableSizes = Object.keys(drink.sizes);
    const defaultSize = availableSizes.includes('grande') ? 'grande' : availableSizes[0];
    const defaultMilk = drink.milkOptions.has('2percent') ? '2percent' : [...drink.milkOptions][0];

    // Get base calories for default configuration
    const baseCalories = drink.sizes[defaultSize]?.[defaultMilk]?.calories || 0;

    drinks.push({
      id: drink.id,
      name: drink.name,
      categoryId: drink.categoryId,
      category: drink.category,
      availableSizes,
      defaultSize,
      defaultMilk,
      baseCalories,
      nutritionByConfig: drink.sizes,
      hasMilk: drink.milkOptions.size > 1,
    });
  }

  // Create categories.json
  const categoriesData = [...categories].map(cat => ({
    id: createSlug(cat),
    name: cat,
  }));

  // Write files
  const dataDir = path.join(__dirname, '../src/data');

  fs.writeFileSync(
    path.join(dataDir, 'drinks.json'),
    JSON.stringify({ drinks }, null, 2)
  );

  fs.writeFileSync(
    path.join(dataDir, 'categories.json'),
    JSON.stringify({ categories: categoriesData }, null, 2)
  );

  console.log(`Transformed ${drinks.length} drinks in ${categoriesData.length} categories`);
}

transform();
