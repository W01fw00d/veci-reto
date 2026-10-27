import { useState } from 'react';
import ItemList from '.';

const items = [
  { id: 1, text: 'First item' },
  { id: 2, text: 'Second item' },
];

export function Default() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <>
      <ItemList
        items={items}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <input data-testid="selected-id" readOnly value={String(selectedId)} />
    </>
  );
}
