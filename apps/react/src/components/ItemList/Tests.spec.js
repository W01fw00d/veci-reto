import { expect, test } from '@playwright/test';

test('supports adding and removing multiple selected items', async ({ mount }) => {
  const component = await mount('components/ItemList/Default');
  const listbox = component.getByRole('listbox', { name: 'Items' });
  const firstItem = component.getByRole('option', { name: 'Select First item' });
  const secondItem = component.getByRole('option', { name: 'Select Second item' });

  await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
  await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  await expect(secondItem).toHaveAttribute('aria-selected', 'false');

  await secondItem.click();

  await expect(component.getByTestId('selected-ids')).toHaveValue('[1,2]');
  await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  await expect(secondItem).toHaveAttribute('aria-selected', 'true');

  await firstItem.click();

  await expect(component.getByTestId('selected-ids')).toHaveValue('[2]');
  await expect(firstItem).toHaveAttribute('aria-selected', 'false');
  await expect(secondItem).toHaveAttribute('aria-selected', 'true');

  await secondItem.click();

  await expect(component.getByTestId('selected-ids')).toHaveValue('[]');
  await expect(secondItem).toHaveAttribute('aria-selected', 'false');
});

test('deletes an item on double click and removes it from the selection', async ({ mount }) => {
  const component = await mount('components/ItemList/Default');
  const firstItem = component.getByRole('option', { name: 'Select First item' });
  const secondItem = component.getByRole('option', { name: 'Select Second item' });

  await secondItem.dblclick();

  await expect(component.getByRole('option')).toHaveCount(1);
  await expect(firstItem).toBeVisible();
  await expect(component.getByTestId('selected-ids')).toHaveValue('[1]');
});

test('shows an empty state after deleting the last item', async ({ mount }) => {
  const component = await mount('components/ItemList/Default');

  await component.getByRole('option', { name: 'Select First item' }).dblclick();
  await component.getByRole('option', { name: 'Select Second item' }).dblclick();

  await expect(component.getByRole('status')).toHaveText('No saved items found');
  await expect(component.getByRole('listbox')).toHaveCount(0);
});
