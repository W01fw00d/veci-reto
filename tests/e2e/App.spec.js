// Shared end-to-end scenarios run against both app projects.
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

test('matches the target typography, list row, and action sizes', async ({ page }) => {
  await expect(page.locator('body')).toHaveCSS('line-height', '24px');
  await expect(page.locator('main')).toHaveCSS('padding-top', '32px');
  await expect(page.getByRole('option').first()).toHaveCSS('height', '40px');
  await expect(page.getByRole('option').first()).toHaveCSS('border-radius', '0px');
  await expect(page.getByRole('button', { name: 'Undo last change' })).toHaveCSS('height', '60px');
  await expect(page.getByRole('button', { name: 'Delete selected items' })).toHaveCSS('height', '60px');
});

test('loads Montserrat and the shared favicon from local assets', async ({ page }) => {
  const fontReady = await page.evaluate(async () => {
    await document.fonts.load('400 16px Montserrat');
    await document.fonts.load('500 16px Montserrat');
    return document.fonts.check('400 16px Montserrat') && document.fonts.check('500 16px Montserrat');
  });
  expect(fontReady).toBe(true);

  const fontResponse = await page.request.get('/fonts/montserrat-latin.woff2');
  expect(fontResponse.ok()).toBe(true);
  expect(fontResponse.headers()['content-type']).toContain('font/woff2');

  const faviconResponse = await page.request.get('/favicon.svg');
  expect(faviconResponse.ok()).toBe(true);
  expect(faviconResponse.headers()['content-type']).toContain('image/svg+xml');
});

test('preserves bottom spacing below the button row in a short viewport', async ({ page }) => {
  await page.setViewportSize({ width: 750, height: 480 });

  const panel = page.locator('main section');
  const buttonRow = page.getByRole('button', { name: 'Undo last change' }).locator('..');
  const panelBox = await panel.boundingBox();
  const buttonRowBox = await buttonRow.boundingBox();

  if (!panelBox || !buttonRowBox) {
    throw new Error('The panel and button row must be visible');
  }

  expect(panelBox.y + panelBox.height - buttonRowBox.y - buttonRowBox.height).toBeGreaterThanOrEqual(48);
});

test('aligns the wrapped add button with delete on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 677 });

  const deleteBox = await page.getByRole('button', { name: 'Delete selected items' }).boundingBox();
  const addBox = await page.getByRole('button', { name: 'Open add item form' }).boundingBox();

  if (!deleteBox || !addBox) {
    throw new Error('The add and delete buttons must be visible');
  }

  expect(addBox.y).toBeGreaterThan(deleteBox.y);
  expect(Math.abs(addBox.x - deleteBox.x)).toBeLessThanOrEqual(1);
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

test('rejects items over 1000 characters and accepts the maximum length', async ({ page }) => {
  await page.getByRole('button', { name: 'Open add item form' }).click();

  const dialog = page.getByRole('dialog', { name: 'Add item to list' });
  const input = dialog.getByRole('textbox', { name: 'Add item to list' });
  const submit = dialog.getByRole('button', { name: 'Add item to list' });

  await input.fill('a'.repeat(1001));
  await submit.click();
  await expect(dialog.getByRole('alert')).toHaveText(
    'Item must be no more than 1000 characters long',
  );
  await expect(dialog).toHaveCount(1);
  await expect(input).toBeFocused();

  await input.fill('a'.repeat(1000));
  await expect(dialog.getByRole('alert')).toHaveCount(0);
  await submit.click();

  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('option').last()).toHaveText('a'.repeat(1000));
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

test('shows the empty state until a new item is added', async ({ page }) => {
  const deleteButton = page.getByRole('button', { name: 'Delete selected items' });
  const emptyState = page.getByRole('status');

  for (const item of ['Item 2', 'Item 3', 'Item 4']) {
    await page.getByRole('option', { name: `Select ${item}` }).click();
  }
  await deleteButton.click();

  await expect(page.getByRole('option')).toHaveCount(0);
  await expect(emptyState).toHaveText('No saved items found');

  await page.getByRole('button', { name: 'Open add item form' }).click();
  await page.getByRole('button', { name: 'Cancel adding item' }).click();
  await expect(emptyState).toHaveText('No saved items found');

  await page.getByRole('button', { name: 'Open add item form' }).click();
  await page.getByRole('textbox', { name: 'Add item to list' }).fill('New item');
  await page.getByRole('button', { name: 'Add item to list' }).click();

  await expect(page.getByRole('option')).toHaveText(['New item']);
  await expect(emptyState).toHaveCount(0);
});
