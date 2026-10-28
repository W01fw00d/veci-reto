import { useState } from 'react';
import ItemList from '.';

const items = [
  { id: 1, text: 'First item' },
  { id: 2, text: 'Second item' },
];

export default function Default() {
  const [selectedIds, setSelectedIds] = useState([1]);

  /** @param {number} id */
  function toggleSelection(id) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)
        : [...currentSelectedIds, id],
    );
  }

  return (
    <>
      <ItemList
        items={items}
        onToggleSelection={toggleSelection}
        selectedIds={selectedIds}
      />
      <input data-testid="selected-ids" readOnly value={JSON.stringify(selectedIds)} />
    </>
  );
}
