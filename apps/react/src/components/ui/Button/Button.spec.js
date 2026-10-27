import { expect, test } from '@playwright/test';

test('renders its label and responds to clicks', async ({ mount }) => {
  const component = await mount('components/ui/Button/Default');
  const button = component.getByRole('button', { name: 'Save' });

  await expect(button).toHaveAttribute('type', 'button');
  await button.click();

  await expect(component.getByTestId('clicks')).toHaveValue('1');
});

test('honors disabled and variant props', async ({ mount }) => {
  const component = await mount('components/ui/Button/Default', {
    disabled: true,
    variant: 'secondary',
  });

  await expect(component.getByRole('button', { name: 'Save' })).toBeDisabled();
  await expect(component.getByTestId('clicks')).toHaveValue('0');
});
