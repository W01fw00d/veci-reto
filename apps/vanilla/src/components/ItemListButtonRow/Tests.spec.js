import { expect, test } from '@playwright/test';
import { mountComponent } from '../test-utils.js';

test('enables actions and invokes their callbacks', async ({ page }) => {
  const component = await mountComponent(page, 'ItemListButtonRow');
  const undo = component.getByRole('button', { name: 'Undo last change' });
  const deleteButton = component.getByRole('button', { name: 'Delete selected items' });
  const add = component.getByRole('button', { name: 'Open add item form' });

  await expect(undo).toBeEnabled();
  await expect(deleteButton).toBeEnabled();
  await undo.click();
  await deleteButton.click();
  await add.click();
  await expect(component.getByTestId('actions')).toHaveValue('["undo","delete","add"]');
});

test('disables undo and delete when unavailable', async ({ page }) => {
  const component = await mountComponent(page, 'ItemListButtonRow', {
    canUndo: false,
    canDelete: false,
  });

  await expect(component.getByRole('button', { name: 'Undo last change' })).toBeDisabled();
  await expect(component.getByRole('button', { name: 'Delete selected items' })).toBeDisabled();
  await expect(component.getByRole('button', { name: 'Open add item form' })).toBeEnabled();
});
