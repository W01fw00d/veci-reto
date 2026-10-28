import { expect, test } from '@playwright/test';
import { mountComponent } from '../../components/test-utils.js';

test('renders its label and responds to clicks', async ({ page }) => {
  const component = await mountComponent(page, 'Button');
  const button = component.getByRole('button', { name: 'Save' });

  await expect(button).toHaveAttribute('type', 'button');
  await button.click();
  await expect(component.getByTestId('clicks')).toHaveValue('1');
});

test('honors disabled and variant props', async ({ page }) => {
  const component = await mountComponent(page, 'Button', {
    disabled: true,
    variant: 'secondary',
  });

  await expect(component.getByRole('button', { name: 'Save' })).toBeDisabled();
  await expect(component.getByTestId('clicks')).toHaveValue('0');
});
