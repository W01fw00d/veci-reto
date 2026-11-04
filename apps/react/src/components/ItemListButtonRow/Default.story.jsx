import { useState } from 'react';
import ItemListButtonRow from '.';
import { ItemsProvider } from '../../contexts/ItemsContext';

export default function Default() {
  const [actions, setActions] = useState(/** @type {string[]} */([]));
  /** @param {string} action */
  const record = (action) => setActions((current) => [...current, action]);

  return (
    <ItemsProvider>
      <ItemListButtonRow
        onAdd={() => record('add')}
      />
      <input data-testid="actions" readOnly value={JSON.stringify(actions)} />
    </ItemsProvider>
  );
}
