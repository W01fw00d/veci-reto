// @ts-check

import { useCallback, useState } from 'react';
import AddItemModal from '../AddItemModal';
import ItemListButtonRow from '../ItemListButtonRow';

/**
 * @typedef {{
 *   canUndo: boolean,
 *   canDelete: boolean,
 *   onUndo: () => void,
 *   onDelete: () => void,
 *   onAdd: (text: string) => void
 * }} ItemListActionsProps
 */

/** @param {ItemListActionsProps} props */
function ItemListActions({ canUndo, canDelete, onUndo, onDelete, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const openAddModal = useCallback(() => setIsAdding(true), []);
  const closeAddModal = useCallback(() => setIsAdding(false), []);

  return (
    <>
      <ItemListButtonRow
        canDelete={canDelete}
        canUndo={canUndo}
        onAdd={openAddModal}
        onDelete={onDelete}
        onUndo={onUndo}
      />
      {isAdding && (
        <AddItemModal onAdd={onAdd} onClose={closeAddModal} />
      )}
    </>
  );
}

export default ItemListActions;
