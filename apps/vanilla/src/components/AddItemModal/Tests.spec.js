import { expect, test } from '@playwright/test';
import { mountComponent } from '../test-utils.js';

test('focuses the input and rejects an empty item', async ({ page }) => {
  const component = await mountComponent(page, 'AddItemModal');
  const input = component.getByRole('textbox', { name: 'Add item to list' });

  await expect(input).toBeFocused();
  await component.getByRole('button', { name: 'Add item to list' }).click();
  await expect(component.getByRole('alert')).toHaveText('Item must be at least 1 character long');
  await expect(component.getByTestId('added-item')).toHaveValue('');
  await expect(input).toBeFocused();
});

test('rejects items longer than 1000 characters', async ({ page }) => {
  const component = await mountComponent(page, 'AddItemModal');
  const input = component.getByRole('textbox', { name: 'Add item to list' });

  await input.fill('a'.repeat(1001));
  await component.getByRole('button', { name: 'Add item to list' }).click();
  await expect(component.getByRole('alert')).toHaveText('Item must be no more than 1000 characters long');
  await expect(component.getByTestId('added-item')).toHaveValue('');
  await expect(component.getByTestId('closed')).toHaveValue('false');
  await expect(input).toBeFocused();

  await input.fill('a'.repeat(1000));
  await expect(component.getByRole('alert')).toHaveCount(0);
  await component.getByRole('button', { name: 'Add item to list' }).click();
  await expect(component.getByTestId('added-item')).toHaveValue('a'.repeat(1000));
  await expect(component.getByTestId('closed')).toHaveValue('true');
});

test('trims and adds a valid item before closing', async ({ page }) => {
  const component = await mountComponent(page, 'AddItemModal');

  await component.getByRole('textbox', { name: 'Add item to list' }).fill('  New item  ');
  await component.getByRole('button', { name: 'Add item to list' }).click();
  await expect(component.getByTestId('added-item')).toHaveValue('New item');
  await expect(component.getByTestId('closed')).toHaveValue('true');
});

test('closes without adding when cancelled', async ({ page }) => {
  const component = await mountComponent(page, 'AddItemModal');

  await component.getByRole('button', { name: 'Cancel adding item' }).click();
  await expect(component.getByTestId('closed')).toHaveValue('true');
  await expect(component.getByTestId('added-item')).toHaveValue('');
});

test('closes when Escape is pressed', async ({ page }) => {
  const component = await mountComponent(page, 'AddItemModal');

  await page.keyboard.press('Escape');
  await expect(component.getByTestId('closed')).toHaveValue('true');
  await expect(component.getByTestId('added-item')).toHaveValue('');
});
