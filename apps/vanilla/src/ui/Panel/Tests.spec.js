import { expect, test } from '@playwright/test';
import { mountComponent } from '../../components/test-utils.js';

test('renders children and forwards section attributes', async ({ page }) => {
  const component = await mountComponent(page, 'Panel', { label: 'Settings panel' });
  const panel = component.getByRole('region', { name: 'Settings panel' });

  await expect(panel).toContainText('Panel content');
});
