import { useState } from 'react';
import AddItemModal from '.';

export function Default() {
  const [addedItem, setAddedItem] = useState('');
  const [closed, setClosed] = useState(false);

  return (
    <>
      <AddItemModal
        onAdd={setAddedItem}
        onClose={() => setClosed(true)}
      />
      <form hidden>
        <input data-testid="added-item" readOnly value={addedItem} />
        <input data-testid="closed" readOnly value={String(closed)} />
      </form>
    </>
  );
}
