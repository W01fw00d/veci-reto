import { expect, test } from '@playwright/test';
import { mountComponent } from '../../components/test-utils.js';

test('renders an accessible input and accepts text', async ({ page }) => {
  const component = await mountComponent(page, 'TextInput', {
    label: 'Item name',
    placeholder: 'Enter an item',
  });
  const input = component.getByRole('textbox', { name: 'Item name' });

  await expect(input).toHaveAttribute('placeholder', 'Enter an item');
  await input.fill('Sample');
  await expect(input).toHaveValue('Sample');
});
