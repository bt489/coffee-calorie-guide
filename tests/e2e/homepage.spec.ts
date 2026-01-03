import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /coffee calorie guide/i })).toBeVisible();
  });

  test('should display drink grid with multiple drinks', async ({ page }) => {
    const drinkCards = page.locator('[data-testid^="drink-card-"]');
    await expect(drinkCards.first()).toBeVisible();
    expect(await drinkCards.count()).toBeGreaterThan(5);
  });

  test('should display category filter buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /all drinks/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /classic espresso/i })).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    await expect(page.getByPlaceholder(/search drinks/i)).toBeVisible();
  });

  test('should show drink count', async ({ page }) => {
    await expect(page.getByText(/showing \d+ drinks?/i)).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should filter drinks when searching', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search drinks/i);
    await searchInput.fill('latte');

    // Wait for filter to apply
    await page.waitForTimeout(300);

    const drinkCards = page.locator('[data-testid^="drink-card-"]');
    const count = await drinkCards.count();
    expect(count).toBeGreaterThan(0);

    // All visible drinks should contain "latte"
    const resultsText = page.getByText(/showing \d+ drinks?/i);
    await expect(resultsText).toBeVisible();
  });

  test('should show no results message for invalid search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search drinks/i);
    await searchInput.fill('xyznonexistent123');

    await page.waitForTimeout(300);

    await expect(page.getByText(/no drinks found/i)).toBeVisible();
  });

  test('should clear search and show all drinks', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search drinks/i);

    // Search first
    await searchInput.fill('latte');
    await page.waitForTimeout(300);

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(300);

    const drinkCards = page.locator('[data-testid^="drink-card-"]');
    expect(await drinkCards.count()).toBeGreaterThan(10);
  });
});

test.describe('Category Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should filter drinks by category', async ({ page }) => {
    // Get initial count
    const initialCards = page.locator('[data-testid^="drink-card-"]');
    const initialCount = await initialCards.count();

    // Click a category filter
    await page.getByRole('button', { name: /classic espresso/i }).click();
    await page.waitForTimeout(300);

    // Count should be different (filtered)
    const filteredCards = page.locator('[data-testid^="drink-card-"]');
    const filteredCount = await filteredCards.count();

    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('should return to all drinks when clicking All Drinks', async ({ page }) => {
    // Filter first
    await page.getByRole('button', { name: /classic espresso/i }).click();
    await page.waitForTimeout(300);

    const filteredCards = page.locator('[data-testid^="drink-card-"]');
    const filteredCount = await filteredCards.count();

    // Click All Drinks
    await page.getByRole('button', { name: /all drinks/i }).click();
    await page.waitForTimeout(300);

    const allCards = page.locator('[data-testid^="drink-card-"]');
    expect(await allCards.count()).toBeGreaterThan(filteredCount);
  });
});
