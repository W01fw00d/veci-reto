import { useState } from 'react';
import ItemList from '.';

export default function Default() {
  const [items, setItems] = useState([
    { id: 'first-item', text: 'First item' },
    { id: 'second-item', text: 'Second item' },
  ]);
  const [selectedIds, setSelectedIds] = useState(['first-item']);

  /** @param {string} id */
  function toggleSelection(id) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)
        : [...currentSelectedIds, id],
    );
  }

  /** @param {string} id */
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
