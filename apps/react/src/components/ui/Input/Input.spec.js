import { expect, test } from '@playwright/test';

test('renders an accessible input and accepts text', async ({ mount }) => {
  const component = await mount('components/ui/Input/Default', {
    label: 'Item name',
    placeholder: 'Enter an item',
  });
  const input = component.getByRole('textbox', { name: 'Item name' });

  await expect(input).toHaveAttribute('placeholder', 'Enter an item');
  await input.fill('Sample');
  await expect(input).toHaveValue('Sample');
});
