import { expect, test } from '@playwright/test';
import { mountComponent } from '../../components/test-utils.js';

test('exposes an accessible dialog and closes on Escape', async ({ page }) => {
  const component = await mountComponent(page, 'Modal');
  const dialog = component.getByRole('dialog', { name: 'Example dialog' });

  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await page.keyboard.press('Escape');
  await expect(component.getByTestId('close-count')).toHaveValue('1');
});

test('closes on backdrop clicks but not clicks inside the dialog', async ({ page }) => {
  const component = await mountComponent(page, 'Modal');
  const dialog = component.getByRole('dialog', { name: 'Example dialog' });

  await component.getByRole('button', { name: 'Dialog content' }).click();
  await expect(component.getByTestId('close-count')).toHaveValue('0');
  await dialog.locator('..').click({ position: { x: 1, y: 1 } });
  await expect(component.getByTestId('close-count')).toHaveValue('1');
});
