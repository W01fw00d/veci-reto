import { expect, test } from '@playwright/test';
import { mountComponent } from '../test-utils.js';

test('renders the page title and supporting description', async ({ page }) => {
  const component = await mountComponent(page, 'AppHeader');

  await expect(component.getByRole('heading', { level: 1 })).toHaveText('This is a technical proof');
  await expect(component.locator('header p')).toContainText('Lorem ipsum dolor sit amet consectetur');
});
