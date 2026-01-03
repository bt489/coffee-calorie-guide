import { test, expect } from '@playwright/test';

test.describe('Size Customization', () => {
  test('should allow changing size', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    // Click on a size button
    await page.getByRole('button', { name: /tall.*12oz/i }).click();

    // Tall button should be selected (has bg-coffee class)
    await expect(page.getByRole('button', { name: /tall.*12oz/i })).toHaveClass(/bg-coffee/);
  });

  test('should show size options', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    await expect(page.getByText('Size')).toBeVisible();
    await expect(page.getByRole('button', { name: /tall/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /grande/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /venti/i })).toBeVisible();
  });
});

test.describe('Milk Customization', () => {
  test('should allow changing milk type', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    // Find and click whole milk button
    const wholeMilkBtn = page.getByRole('button', { name: 'Whole Milk' });
    await wholeMilkBtn.click();

    // Should be selected
    await expect(wholeMilkBtn).toHaveClass(/bg-coffee/);
  });

  test('should show milk options', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    await expect(page.getByRole('heading', { name: 'Milk' })).toBeVisible();
    await expect(page.getByRole('button', { name: '2% Milk' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Whole Milk' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Nonfat Milk' })).toBeVisible();
  });

  test('should update calories when switching milk', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    const calorieDisplay = page.locator('[data-testid="calorie-display"]');

    // Get initial calories
    await page.waitForTimeout(500);
    const initialText = await calorieDisplay.textContent();
    const initialCal = parseInt(initialText?.match(/\d+/)?.[0] || '0');

    // Switch to almondmilk (should reduce calories)
    await page.getByRole('button', { name: 'Almondmilk' }).click();

    // Wait for calories to change
    await expect(async () => {
      const text = await calorieDisplay.textContent();
      const cal = parseInt(text?.match(/\d+/)?.[0] || '0');
      expect(cal).toBeLessThan(initialCal);
    }).toPass({ timeout: 5000 });
  });
});

test.describe('Espresso Shot Customization', () => {
  test('should show espresso section', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    await expect(page.getByRole('heading', { name: 'Espresso' })).toBeVisible();
    await expect(page.getByText('Shots', { exact: true })).toBeVisible();
  });

  test('should have +/- buttons for shots', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    const espressoHeading = page.getByRole('heading', { name: 'Espresso' });
    const section = espressoHeading.locator('xpath=ancestor::div[contains(@class, "glass-card")]');

    await expect(section.getByRole('button', { name: '+' })).toBeVisible();
    await expect(section.getByRole('button', { name: '-' })).toBeVisible();
  });
});

test.describe('Syrup Customization', () => {
  test('should add syrup and show calories', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    const calorieDisplay = page.locator('[data-testid="calorie-display"]');
    await page.waitForTimeout(500);
    const initialText = await calorieDisplay.textContent();
    const initialCal = parseInt(initialText?.match(/\d+/)?.[0] || '0');

    // Click Add Syrup
    await page.getByRole('button', { name: '+ Add Syrup' }).click();
    await page.waitForTimeout(300);

    // Select a syrup
    await page.getByRole('button', { name: /Hazelnut Syrup/i }).click();

    // Wait for calories to change
    await expect(async () => {
      const text = await calorieDisplay.textContent();
      const cal = parseInt(text?.match(/\d+/)?.[0] || '0');
      expect(cal).toBeGreaterThan(initialCal);
    }).toPass({ timeout: 5000 });
  });

  test('should show Add Syrup button', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    await expect(page.getByRole('button', { name: '+ Add Syrup' })).toBeVisible();
  });

  test('should hide Add Syrup after adding 3 syrups', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    // Add 3 syrups
    const syrups = ['Hazelnut', 'Toffee Nut', 'Classic'];
    for (const syrup of syrups) {
      await page.getByRole('button', { name: '+ Add Syrup' }).click();
      await page.waitForTimeout(200);
      await page.getByRole('button', { name: new RegExp(syrup, 'i') }).click();
      await page.waitForTimeout(300);
    }

    // Add Syrup button should be hidden
    await expect(page.getByRole('button', { name: '+ Add Syrup' })).not.toBeVisible();
  });
});

test.describe('Topping Customization', () => {
  test('should show topping options', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    await expect(page.getByText('Toppings')).toBeVisible();
    await expect(page.getByText('Whipped Cream')).toBeVisible();
  });

  test('should have amount buttons for toppings', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    // Each topping row should have None, Light, Standard, Extra
    await expect(page.getByRole('button', { name: 'None' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Light' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Standard' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Extra' }).first()).toBeVisible();
  });

  test('should update calories when adding topping', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    const calorieDisplay = page.locator('[data-testid="calorie-display"]');
    await page.waitForTimeout(500);
    const initialText = await calorieDisplay.textContent();
    const initialCal = parseInt(initialText?.match(/\d+/)?.[0] || '0');

    // Click Standard on first topping (Whipped Cream)
    await page.getByRole('button', { name: 'Standard' }).first().click();

    // Wait for calories to change
    await expect(async () => {
      const text = await calorieDisplay.textContent();
      const cal = parseInt(text?.match(/\d+/)?.[0] || '0');
      expect(cal).toBeGreaterThan(initialCal);
    }).toPass({ timeout: 5000 });
  });
});

test.describe('Calorie Display', () => {
  test('should show calorie count', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    const calorieDisplay = page.locator('[data-testid="calorie-display"]');
    await expect(calorieDisplay).toBeVisible();
    await expect(calorieDisplay).toContainText('Calories');
  });

  test('should show breakdown after customizations', async ({ page }) => {
    await page.goto('/drink/caff-latte');

    // Add a syrup to trigger breakdown
    await page.getByRole('button', { name: '+ Add Syrup' }).click();
    await page.getByRole('button', { name: /Hazelnut/i }).click();
    await page.waitForTimeout(500);

    // Breakdown should appear
    await expect(page.getByText('Breakdown')).toBeVisible();
    await expect(page.getByText('Base drink')).toBeVisible();
  });
});
