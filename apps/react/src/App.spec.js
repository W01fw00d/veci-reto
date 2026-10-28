import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the initial list and supports multiple selection, deletion, and undo', async ({ page }) => {
  const options = page.getByRole('option');
  const undo = page.getByRole('button', { name: 'Undo last change' });
  const deleteButton = page.getByRole('button', { name: 'Delete selected items' });

  await expect(page.getByRole('heading', { name: 'This is a technical proof' })).toBeVisible();
  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  await expect(options.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(undo).toBeDisabled();
  await expect(deleteButton).toBeEnabled();

  await page.getByRole('option', { name: 'Select Item 3' }).click();
  await expect(page.getByRole('option', { name: 'Select Item 3' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await deleteButton.click();
  await expect(options).toHaveText(['Item 2', 'Item 4']);
  await expect(deleteButton).toBeDisabled();
  await expect(undo).toBeEnabled();

  await undo.click();
  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  await expect(page.getByRole('option', { name: 'Select Item 3' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(deleteButton).toBeEnabled();
  await expect(undo).toBeDisabled();
});

test('rejects empty items and adds trimmed text as the selected item', async ({ page }) => {
  await page.getByRole('button', { name: 'Open add item form' }).click();

  const dialog = page.getByRole('dialog', { name: 'Add item to list' });
  const input = dialog.getByRole('textbox', { name: 'Add item to list' });
  const submit = dialog.getByRole('button', { name: 'Add item to list' });

  await expect(input).toBeFocused();
  await submit.click();
  await expect(dialog.getByRole('alert')).toHaveText(
    'Item must be at least 1 character long',
  );
  await expect(input).toBeFocused();

  await input.fill('   ');
  await submit.click();
  await expect(dialog.getByRole('alert')).toBeVisible();

  await input.fill('  New item  ');
  await expect(dialog.getByRole('alert')).toHaveCount(0);
  await submit.click();

  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('option')).toHaveText([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'New item',
  ]);
  await expect(page.getByRole('option', { name: 'Select New item' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('button', { name: 'Undo last change' })).toBeEnabled();
});

test('closes the add dialog with cancel, Escape, or a backdrop click without adding an item', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Open add item form' });
  const options = page.getByRole('option');

  await opener.click();
  await page.getByRole('button', { name: 'Cancel adding item' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();

  await opener.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();

  await opener.click();
  await page.getByRole('dialog').locator('..').click({ position: { x: 1, y: 1 } });
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await expect(options).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'Undo last change' })).toBeDisabled();
});

test('undoes changes in order, including restoring the initial list from an empty list', async ({ page }) => {
  const options = page.getByRole('option');
  const undo = page.getByRole('button', { name: 'Undo last change' });
  const deleteButton = page.getByRole('button', { name: 'Delete selected items' });

  await page.getByRole('button', { name: 'Open add item form' }).click();
  await page.getByRole('textbox', { name: 'Add item to list' }).fill('Temporary');
  await page.getByRole('button', { name: 'Add item to list' }).click();
  await deleteButton.click();

  await undo.click();
  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Temporary']);
  await expect(page.getByRole('option', { name: 'Select Temporary' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await undo.click();
  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  for (const item of ['Item 2', 'Item 3', 'Item 4']) {
    await page.getByRole('option', { name: `Select ${item}` }).click();
  }

  await deleteButton.click();
  await expect(options).toHaveCount(0);
  await expect(deleteButton).toBeDisabled();
  await expect(undo).toBeEnabled();

  await undo.click();
  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  await expect(page.getByRole('option', { name: 'Select Item 4' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await expect(undo).toBeDisabled();
});

test('deletes only the selected items and disables delete when selection is empty', async ({ page }) => {
  const deleteButton = page.getByRole('button', { name: 'Delete selected items' });
  const options = page.getByRole('option');

  await page.getByRole('option', { name: 'Select Item 1' }).click();
  await expect(deleteButton).toBeDisabled();

  await page.getByRole('option', { name: 'Select Item 2' }).click();
  await page.getByRole('option', { name: 'Select Item 4' }).click();
  await expect(deleteButton).toBeEnabled();

  await deleteButton.click();
  await expect(options).toHaveText(['Item 1', 'Item 3']);
  await expect(options.nth(0)).toHaveAttribute('aria-selected', 'false');
  await expect(options.nth(1)).toHaveAttribute('aria-selected', 'false');
  await expect(deleteButton).toBeDisabled();
});

test('deletes an item on double click and supports undo', async ({ page }) => {
  const options = page.getByRole('option');
  const itemToDelete = page.getByRole('option', { name: 'Select Item 2' });
  const undo = page.getByRole('button', { name: 'Undo last change' });

  await itemToDelete.dblclick();

  await expect(options).toHaveText(['Item 1', 'Item 3', 'Item 4']);
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(undo).toBeEnabled();

  await undo.click();

  await expect(options).toHaveText(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  await expect(page.getByRole('option', { name: 'Select Item 1' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('option', { name: 'Select Item 2' })).toHaveAttribute(
    'aria-selected',
    'false',
  );
  await expect(undo).toBeDisabled();
});
