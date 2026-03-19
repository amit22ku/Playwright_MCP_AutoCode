import { test, expect } from '@playwright/test';

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate to Client Work via Services and verify heading', async ({ page }) => {
    // Step 1: Navigate to EPAM home page
    await page.goto('https://www.epam.com/');

    // Optional: Accept cookies if the banner is shown
    const acceptAll = page.getByRole('button', { name: 'Accept All' });
    if (await acceptAll.isVisible().catch(() => false)) {
      await acceptAll.click();
    }

    // Step 2: Select "Services" from the header menu
    await page.getByRole('link', { name: 'Services' }).first().click();

    // Step 3: Click the "Explore Our Client Work" link
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

    // Step 4: Verify that the "Client Work" text is visible on the page
    await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
  });
});
