import { createContext, useContext, useReducer, useMemo } from 'react';
import { calculateCalories } from '../utils/calorieCalculator';
import drinksData from '../data/drinks.json';
import ingredientsData from '../data/ingredients.json';

const DrinkContext = createContext(null);

const initialState = {
  selectedDrink: null,
  customizations: {
    size: 'grande',
    milk: '2percent',
    espressoShots: 2,
    syrups: [],
    toppings: [],
  },
  activeCategory: null,
};

function drinkReducer(state, action) {
  switch (action.type) {
    case 'SELECT_DRINK': {
      const drink = action.payload;
      return {
        ...state,
        selectedDrink: drink,
        customizations: {
          size: drink.defaultSize,
          milk: drink.defaultMilk || '2percent',
          espressoShots: drink.defaultSize === 'grande' ? 2 : 1,
          syrups: [],
          toppings: [],
        },
      };
    }
    case 'SET_SIZE':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          size: action.payload,
        },
      };
    case 'SET_MILK':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          milk: action.payload,
        },
      };
    case 'SET_ESPRESSO_SHOTS':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          espressoShots: action.payload,
        },
      };
    case 'ADD_SYRUP':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          syrups: [...state.customizations.syrups, action.payload],
        },
      };
    case 'UPDATE_SYRUP': {
      const updatedSyrups = state.customizations.syrups.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      return {
        ...state,
        customizations: {
          ...state.customizations,
          syrups: updatedSyrups,
        },
      };
    }
    case 'REMOVE_SYRUP':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          syrups: state.customizations.syrups.filter((s) => s.id !== action.payload),
        },
      };
    case 'SET_TOPPING': {
      const existingIndex = state.customizations.toppings.findIndex(
        (t) => t.id === action.payload.id
      );
      let newToppings;
      if (action.payload.amount === 'none') {
        newToppings = state.customizations.toppings.filter(
          (t) => t.id !== action.payload.id
        );
      } else if (existingIndex >= 0) {
        newToppings = state.customizations.toppings.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      } else {
        newToppings = [...state.customizations.toppings, action.payload];
      }
      return {
        ...state,
        customizations: {
          ...state.customizations,
          toppings: newToppings,
        },
      };
    }
    case 'SET_CATEGORY':
      return {
        ...state,
        activeCategory: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function DrinkProvider({ children }) {
  const [state, dispatch] = useReducer(drinkReducer, initialState);

  const calories = useMemo(() => {
    if (!state.selectedDrink) return { total: 0, base: 0, delta: 0 };
    return calculateCalories(
      state.selectedDrink,
      state.customizations,
      ingredientsData
    );
  }, [state.selectedDrink, state.customizations]);

  const value = useMemo(
    () => ({
      ...state,
      drinks: drinksData.drinks,
      ingredients: ingredientsData,
      calories,
      dispatch,
    }),
    [state, calories]
  );

  return <DrinkContext.Provider value={value}>{children}</DrinkContext.Provider>;
}

export function useDrink() {
  const context = useContext(DrinkContext);
  if (!context) {
    throw new Error('useDrink must be used within a DrinkProvider');
  }
  return context;
}
