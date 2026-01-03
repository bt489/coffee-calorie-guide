import { test, expect } from '@playwright/test';

test.describe('Drink Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/drink/caff-latte');
  });

  test('should display drink name and category', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /caffè latte/i })).toBeVisible();
    await expect(page.getByText(/classic espresso/i)).toBeVisible();
  });

  test('should display calorie count', async ({ page }) => {
    const calorieDisplay = page.locator('[data-testid="calorie-display"]');
    await expect(calorieDisplay).toBeVisible();

    // Should show a number
    const calorieText = await calorieDisplay.textContent();
    expect(calorieText).toMatch(/\d+/);
  });

  test('should display size selector', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /size/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /grande/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /tall/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /venti/i })).toBeVisible();
  });

  test('should display milk selector for milk drinks', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /milk/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /2% milk/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /whole milk/i })).toBeVisible();
  });

  test('should display espresso options', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /espresso/i })).toBeVisible();
    await expect(page.getByText('Shots', { exact: true })).toBeVisible();
  });

  test('should display syrups section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /syrups/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /add syrup/i })).toBeVisible();
  });

  test('should display toppings section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /toppings/i })).toBeVisible();
    await expect(page.getByText(/whipped cream/i)).toBeVisible();
  });

  test('should navigate back to menu', async ({ page }) => {
    await page.getByRole('link', { name: /back to menu/i }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Navigation', () => {
  test('should navigate from homepage to drink detail', async ({ page }) => {
    await page.goto('/');

    // Click on a drink card
    await page.locator('[data-testid="drink-card-caff-latte"]').click();

    await expect(page).toHaveURL('/drink/caff-latte');
    await expect(page.getByRole('heading', { name: /caffè latte/i })).toBeVisible();
  });

  test('should handle direct URL navigation', async ({ page }) => {
    await page.goto('/drink/caff-latte');
    await expect(page.getByRole('heading', { name: /caffè latte/i })).toBeVisible();
  });
});
