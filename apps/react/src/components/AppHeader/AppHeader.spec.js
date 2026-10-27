import { expect, test } from '@playwright/test';

test('renders the page title and supporting description', async ({ mount }) => {
  const component = await mount('components/AppHeader/Default');

  await expect(
    component.getByRole('heading', { level: 1 }),
  ).toHaveText('This is a technical proof');
  await expect(component.locator('header p')).toContainText(
    'Lorem ipsum dolor sit amet consectetur',
  );
});
