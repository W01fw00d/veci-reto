import { expect, test } from '@playwright/test';

test('renders children and forwards section attributes', async ({ mount }) => {
  const component = await mount('components/ui/Panel/Default', {
    label: 'Settings panel',
  });
  const panel = component.getByRole('region', { name: 'Settings panel' });

  await expect(panel).toContainText('Panel content');
});
