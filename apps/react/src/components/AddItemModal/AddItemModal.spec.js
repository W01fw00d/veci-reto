import { expect, test } from '@playwright/test';

test('focuses the input and rejects an empty item', async ({ mount }) => {
  const component = await mount('components/AddItemModal/Default');
  const input = component.getByRole('textbox', { name: 'Add item to list' });

  await expect(input).toBeFocused();
  await component.getByRole('button', { name: 'Add item to list' }).click();

  await expect(component.getByRole('alert')).toHaveText(
    'Item must be at least 1 character long',
  );
  await expect(component.getByTestId('added-item')).toHaveValue('');
  await expect(input).toBeFocused();
});

test('trims and adds a valid item before closing', async ({ mount }) => {
  const component = await mount('components/AddItemModal/Default');

  await component.getByRole('textbox', { name: 'Add item to list' }).fill('  New item  ');
  await component.getByRole('button', { name: 'Add item to list' }).click();

  await expect(component.getByTestId('added-item')).toHaveValue('New item');
  await expect(component.getByTestId('closed')).toHaveValue('true');
});

test('closes without adding when cancelled', async ({ mount }) => {
  const component = await mount('components/AddItemModal/Default');

  await component.getByRole('button', { name: 'Cancel adding item' }).click();

  await expect(component.getByTestId('closed')).toHaveValue('true');
  await expect(component.getByTestId('added-item')).toHaveValue('');
});

test('closes when Escape is pressed', async ({ mount, page }) => {
  const component = await mount('components/AddItemModal/Default');

  await page.keyboard.press('Escape');

  await expect(component.getByTestId('closed')).toHaveValue('true');
  await expect(component.getByTestId('added-item')).toHaveValue('');
});
