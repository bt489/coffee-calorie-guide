import customizationsData from '../data/customizations.json';

/**
 * Calculate total calories based on drink and customizations
 */
export function calculateCalories(drink, customizations, ingredients) {
  const { size, milk, espressoShots, syrups, toppings } = customizations;

  // Get base calories from the drink's nutrition data for this size/milk combo
  const nutritionConfig = drink.nutritionByConfig?.[size]?.[milk];

  let baseCalories;
  let referenceMilk = drink.defaultMilk || '2percent';

  // If we have exact data for this config, use it
  if (nutritionConfig?.calories !== undefined) {
    baseCalories = nutritionConfig.calories;
  } else {
    // Try to find a reference config to calculate from
    // First try: same size with default milk
    let referenceConfig = drink.nutritionByConfig?.[size]?.[referenceMilk];
    let referenceSize = size;

    // Second try: default size with default milk
    if (!referenceConfig) {
      referenceConfig = drink.nutritionByConfig?.[drink.defaultSize]?.[referenceMilk];
      referenceSize = drink.defaultSize;
    }

    // Third try: find any available config for the size
    if (!referenceConfig && drink.nutritionByConfig?.[size]) {
      const sizeConfigs = drink.nutritionByConfig[size];
      const firstMilk = Object.keys(sizeConfigs)[0];
      if (firstMilk) {
        referenceConfig = sizeConfigs[firstMilk];
        referenceMilk = firstMilk;
      }
    }

    // Get reference calories
    const referenceCalories = referenceConfig?.calories || drink.baseCalories || 0;

    // Calculate milk calorie adjustment if the drink has milk
    if (drink.hasMilk && milk !== referenceMilk) {
      const milkOz = getMilkOzForDrink(drink, size);
      const milkDelta = getMilkCalorieDelta(referenceMilk, milk, milkOz, ingredients);
      baseCalories = Math.max(0, referenceCalories + milkDelta);
    } else {
      baseCalories = referenceCalories;
    }

    // Adjust for size difference if we used a different reference size
    if (referenceSize !== size && referenceConfig) {
      const referenceSizeOz = customizationsData.sizes[referenceSize]?.oz || 16;
      const targetSizeOz = customizationsData.sizes[size]?.oz || 16;
      const sizeRatio = targetSizeOz / referenceSizeOz;
      baseCalories = Math.round(baseCalories * sizeRatio);
    }
  }

  let totalCalories = baseCalories;
  let breakdown = {
    base: baseCalories,
    syrups: 0,
    toppings: 0,
    shots: 0,
    milk: 0,
  };

  // Add syrup calories
  for (const syrup of syrups) {
    const syrupData = ingredients.syrups[syrup.id];
    if (syrupData) {
      const syrupCals = syrup.pumps * syrupData.caloriesPerPump;
      breakdown.syrups += syrupCals;
      totalCalories += syrupCals;
    }
  }

  // Add topping calories
  for (const topping of toppings) {
    const toppingData = ingredients.toppings[topping.id];
    if (toppingData) {
      const multiplier = getAmountMultiplier(topping.amount);
      const toppingCals = Math.round(toppingData.caloriesStandard * multiplier);
      breakdown.toppings += toppingCals;
      totalCalories += toppingCals;
    }
  }

  // Calculate espresso shot delta
  const defaultShots = getDefaultShots(size);
  const shotDelta = espressoShots - defaultShots;
  if (shotDelta !== 0) {
    const shotCals = shotDelta * (ingredients.espresso.signature?.caloriesPerShot || 5);
    breakdown.shots = shotCals;
    totalCalories += shotCals;
  }

  const delta = totalCalories - baseCalories;

  return {
    total: Math.round(totalCalories),
    base: Math.round(baseCalories),
    delta,
    breakdown,
  };
}

/**
 * Get approximate milk oz in a drink based on drink type and size
 */
function getMilkOzForDrink(drink, size) {
  const sizeOz = customizationsData.sizes[size]?.oz || 16;

  // Lattes are mostly milk (about 75-80% after espresso)
  // Cappuccinos have less milk (about 50%)
  // Most other milk drinks are similar to lattes
  const category = drink.category?.toLowerCase() || '';
  const name = drink.name?.toLowerCase() || '';

  if (category.includes('cappuccino') || name.includes('cappuccino')) {
    return Math.round(sizeOz * 0.5);
  }

  // Default: assume about 75% of the drink is milk (rest is espresso + foam)
  return Math.round(sizeOz * 0.75);
}

function getAmountMultiplier(amount) {
  const multipliers = {
    none: 0,
    light: 0.5,
    standard: 1,
    extra: 1.5,
  };
  return multipliers[amount] || 1;
}

function getDefaultShots(size) {
  const defaults = {
    short: 1,
    tall: 1,
    grande: 2,
    venti: 2,
    trenta: 2,
  };
  return defaults[size] || 2;
}

/**
 * Calculate calorie difference between two milk options
 */
export function getMilkCalorieDelta(fromMilk, toMilk, ozAmount, ingredients) {
  const fromCals = ingredients.milks[fromMilk]?.caloriesPerOz || 0;
  const toCals = ingredients.milks[toMilk]?.caloriesPerOz || 0;
  return Math.round((toCals - fromCals) * ozAmount);
}
