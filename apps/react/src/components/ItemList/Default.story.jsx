import { useState } from 'react';
import ItemList from '.';

export default function Default() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
  ]);
  const [selectedIds, setSelectedIds] = useState([1]);

  /** @param {number} id */
  function toggleSelection(id) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)
        : [...currentSelectedIds, id],
    );
  }

  /** @param {number} id */
  function deleteItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.filter((selectedId) => selectedId !== id),
    );
  }

  return (
    <>
      <ItemList
        items={items}
        onDeleteItem={deleteItem}
        onToggleSelection={toggleSelection}
        selectedIds={selectedIds}
      />
      <input data-testid="selected-ids" readOnly value={JSON.stringify(selectedIds)} />
    </>
  );
}
