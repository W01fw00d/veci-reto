import { useState } from 'react';
import Button from '.';

/**
 * @param {{
 *   disabled?: boolean,
 *   variant?: 'primary' | 'secondary' | 'icon' | 'listOption'
 * }} props
 */
export function Default({ disabled = false, variant = 'primary' } = {}) {
  const [clicks, setClicks] = useState(0);

  return (
    <>
      <Button disabled={disabled} onClick={() => setClicks((value) => value + 1)} variant={variant}>
        Save
      </Button>
      <input data-testid="clicks" readOnly value={String(clicks)} />
    </>
  );
}
