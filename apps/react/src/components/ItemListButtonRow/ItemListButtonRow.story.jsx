import { useState } from 'react';
import ItemListButtonRow from './ItemListButtonRow.jsx';

export function Default({ canUndo = true, canDelete = true } = {}) {
  const [actions, setActions] = useState(/** @type {string[]} */([]));
  /** @param {string} action */
  const record = (action) => setActions((current) => [...current, action]);

  return (
    <>
      <ItemListButtonRow
        canDelete={canDelete}
        canUndo={canUndo}
        onAdd={() => record('add')}
        onDelete={() => record('delete')}
        onUndo={() => record('undo')}
      />
      <input data-testid="actions" readOnly value={JSON.stringify(actions)} />
    </>
  );
}
