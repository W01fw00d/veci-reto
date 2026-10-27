import { expect, test } from '@playwright/test';

test('marks the selected item and reports selection changes', async ({ mount }) => {
  const component = await mount('components/ItemList/Default');
  const listbox = component.getByRole('listbox', { name: 'Items' });
  const firstItem = component.getByRole('option', { name: 'Select First item' });
  const secondItem = component.getByRole('option', { name: 'Select Second item' });

  await expect(listbox).toHaveAttribute('aria-multiselectable', 'false');
  await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  await expect(secondItem).toHaveAttribute('aria-selected', 'false');

  await secondItem.click();

  await expect(component.getByTestId('selected-id')).toHaveValue('2');
  await expect(secondItem).toHaveAttribute('aria-selected', 'true');
  await expect(firstItem).toHaveAttribute('aria-selected', 'false');
});
