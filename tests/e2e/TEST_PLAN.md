# E2E Test Plan - Coffee Calorie Guide

## Overview

This document outlines the end-to-end testing strategy for the Coffee Calorie Guide application using Playwright.

---

## Application Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Browse, search, and filter drinks |
| `/drink/:drinkId` | DrinkDetailPage | Customize drink and view calorie calculations |

---

## Main User Flows

### Flow 1: Browse & Discover Drinks
**Description:** User lands on homepage and explores available drinks.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/` | Homepage loads with drink grid |
| 2 | Verify header | "Coffee Calorie Guide" title visible |
| 3 | Verify drink cards | Multiple drink cards displayed with name, category, base calories |
| 4 | Verify category nav | Category filter buttons visible (All Drinks, Coffee, Espresso, etc.) |

### Flow 2: Search Drinks
**Description:** User searches for a specific drink.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/` | Homepage loads |
| 2 | Type "latte" in search box | Drink grid filters to show only drinks containing "latte" |
| 3 | Verify results count | "Showing X drinks" text updates |
| 4 | Clear search | All drinks shown again |

### Flow 3: Filter by Category
**Description:** User filters drinks by category.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/` | Homepage loads |
| 2 | Click "Classic Espresso Drinks" category | Only espresso drinks shown |
| 3 | Verify "All Drinks" button state | Not active/selected |
| 4 | Click "All Drinks" | All drinks shown again |

### Flow 4: Select & View Drink Details
**Description:** User selects a drink to view its details.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/` | Homepage loads |
| 2 | Click on "Caffè Latte" card | Navigate to `/drink/caff-latte` |
| 3 | Verify drink name | "Caffè Latte" heading visible |
| 4 | Verify calorie display | Base calories shown (e.g., "240") |
| 5 | Verify customization sections | Size, Milk, Espresso, Syrups, Toppings sections visible |
| 6 | Click "Back to Menu" | Navigate back to `/` |

### Flow 5: Customize Drink Size
**Description:** User changes drink size and observes calorie change.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Note initial calories | Record calorie value (e.g., 240 for Grande) |
| 3 | Click "Tall" size button | Size button becomes active |
| 4 | Verify calorie update | Calories decrease (smaller size = fewer calories) |
| 5 | Click "Venti" size button | Size button becomes active |
| 6 | Verify calorie update | Calories increase (larger size = more calories) |

### Flow 6: Customize Milk Type
**Description:** User changes milk type and observes calorie change.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Note initial calories with 2% Milk | Record calorie value |
| 3 | Click "Whole Milk" option | Milk option becomes active |
| 4 | Verify calorie increase | Calories should increase (whole milk has more calories) |
| 5 | Click "Nonfat Milk" option | Milk option becomes active |
| 6 | Verify calorie decrease | Calories should decrease |
| 7 | Click "Almondmilk" option | Milk option becomes active |
| 8 | Verify calorie delta badge | Shows "-XX cal" indicator |

### Flow 7: Adjust Espresso Shots
**Description:** User adds or removes espresso shots.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Note initial shot count | Default is 2 for Grande |
| 3 | Click "+" button | Shot count increases to 3 |
| 4 | Verify calorie delta | "+5 cal" indicator shown |
| 5 | Click "-" button twice | Shot count decreases to 1 |
| 6 | Verify calorie delta | "-5 cal" indicator shown |

### Flow 8: Add Syrups
**Description:** User adds syrups to their drink.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Note initial calories | Record base calorie value |
| 3 | Click "+ Add Syrup" button | Syrup picker appears |
| 4 | Click "Vanilla Syrup" | Syrup added with 4 pumps default |
| 5 | Verify calorie increase | Calories increase by ~80 (4 pumps x 20 cal) |
| 6 | Click "+" on pump control | Pumps increase to 5 |
| 7 | Verify calorie update | Calories increase by additional 20 |
| 8 | Click "×" remove button | Syrup removed |
| 9 | Verify calorie decrease | Calories return to previous value |

### Flow 9: Add Toppings
**Description:** User adds toppings to their drink.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Find "Whipped Cream" topping | Topping row visible |
| 3 | Click "Standard" amount | Button becomes active |
| 4 | Verify calorie increase | Calories increase by ~80 |
| 5 | Click "Light" amount | Button becomes active |
| 6 | Verify calorie decrease | Calories decrease (half of standard) |
| 7 | Click "None" amount | Button becomes active |
| 8 | Verify calorie decrease | Topping calories removed |

### Flow 10: Complete Customization Flow
**Description:** User fully customizes a drink with multiple options.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/drink/caff-latte` | Drink detail page loads |
| 2 | Select "Venti" size | Size updated |
| 3 | Select "Oatmilk" | Milk updated |
| 4 | Add 1 extra espresso shot | 3 shots total |
| 5 | Add "Caramel Syrup" (4 pumps) | Syrup added |
| 6 | Add "Whipped Cream" (Standard) | Topping added |
| 7 | Verify breakdown section | Shows Base, Syrups, Toppings, Shots |
| 8 | Verify total calories | Sum of all components displayed |

---

## Test Categories

### Critical Path Tests (P0)
Must pass for release:
- [ ] Homepage loads with drinks
- [ ] Drink detail page loads
- [ ] Size selection updates calories
- [ ] Milk selection updates calories
- [ ] Navigation between pages works

### Core Feature Tests (P1)
Important functionality:
- [ ] Search filters drinks correctly
- [ ] Category filter works
- [ ] Espresso shots adjustment works
- [ ] Syrup add/remove/adjust works
- [ ] Topping selection works
- [ ] Calorie breakdown displays correctly

### Edge Case Tests (P2)
Less common scenarios:
- [ ] Empty search results display message
- [ ] Maximum syrup limit (3) enforced
- [ ] Minimum/maximum shot limits enforced
- [ ] Direct URL navigation to drink works
- [ ] Invalid drink ID shows appropriate message

### Visual/Animation Tests (P3)
UI polish:
- [ ] Hover states on buttons
- [ ] Card animations on load
- [ ] Calorie counter animation on change
- [ ] Smooth page transitions

---

## Test Data

### Sample Drinks for Testing

| Drink ID | Name | Has Milk | Has Espresso | Base Calories |
|----------|------|----------|--------------|---------------|
| `caff-latte` | Caffè Latte | Yes | Yes | 240 |
| `brewed-coffee` | Brewed Coffee | No | No | 5 |
| `vanilla-latte-or-other-flavoured-latte` | Vanilla Latte | Yes | Yes | 340 |
| `cappuccino` | Cappuccino | Yes | Yes | 140 |

### Milk Options for Testing

| Milk ID | Name | Calories/oz |
|---------|------|-------------|
| `2percent` | 2% Milk | 15 |
| `whole` | Whole Milk | 19 |
| `nonfat` | Nonfat Milk | 10 |
| `almondmilk` | Almondmilk | 8 |
| `oatmilk` | Oatmilk | 15 |

### Size Options

| Size ID | Name | Ounces |
|---------|------|--------|
| `short` | Short | 8 |
| `tall` | Tall | 12 |
| `grande` | Grande | 16 |
| `venti` | Venti | 20 |

---

## File Structure

```
tests/
└── e2e/
    ├── TEST_PLAN.md          # This file
    ├── homepage.spec.ts      # Homepage tests
    ├── drink-detail.spec.ts  # Drink detail page tests
    ├── customization.spec.ts # Drink customization tests
    ├── navigation.spec.ts    # Navigation/routing tests
    └── fixtures/
        └── test-data.ts      # Shared test data
```

---

## Playwright Configuration Notes

### Recommended Settings
- **Base URL:** `http://localhost:5173` (or `5174` if port in use)
- **Browsers:** Chromium, Firefox, WebKit
- **Viewport:** Desktop (1280x720), Mobile (375x667)
- **Retries:** 2 on CI, 0 locally

### Selectors Strategy
Use data-testid attributes for reliable selection:
- `data-testid="drink-card-{drinkId}"`
- `data-testid="size-button-{sizeId}"`
- `data-testid="milk-button-{milkId}"`
- `data-testid="calorie-display"`
- `data-testid="search-input"`
- `data-testid="category-{categoryId}"`

---

## Next Steps

1. Install Playwright: `npm init playwright@latest`
2. Add data-testid attributes to components
3. Implement test specs based on this plan
4. Set up CI/CD integration
5. Add visual regression testing (optional)
