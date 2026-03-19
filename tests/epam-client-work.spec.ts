import { test, expect } from '@playwright/test';

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate via Services -> Explore Our Client Work and verify Client Work heading', async ({ page }) => {
    // 1) Navigate to https://www.epam.com/
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Handle cookie/consent banners if they appear (best-effort)
    await page
      .getByRole('button', { name: /accept|agree|allow all/i })
      .click({ timeout: 3000 })
      .catch(() => {});

    // 2) Select "Services" from the header menu
    const servicesLink = page.getByRole('link', { name: /^Services$/ });
    await servicesLink.waitFor({ state: 'visible' });
    await servicesLink.hover().catch(() => {});

    // 3) Click the "Explore Our Client Work" link
    const exploreClientWorkLink = page.getByRole('link', {
      name: /Explore Our Client Work/i,
    });

    // If the mega menu didn't open on hover, click "Services" and try again.
    if (!(await exploreClientWorkLink.isVisible().catch(() => false))) {
      await servicesLink.click();
    }

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      exploreClientWorkLink.click(),
    ]);

    // 4) Verify that the "Client Work" text is visible on the page
    await expect(page.getByRole('heading', { name: /Client Work/i })).toBeVisible();
  });
});
