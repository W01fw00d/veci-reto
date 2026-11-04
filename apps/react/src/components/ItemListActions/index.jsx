// @ts-check

import { useCallback, useState } from 'react';
import AddItemModal from '../AddItemModal';
import ItemListButtonRow from '../ItemListButtonRow';
import { useItemsContext } from '../../contexts/ItemsContext';

function ItemListActions() {
  const { addItem } = useItemsContext();

  const [isAdding, setIsAdding] = useState(false);
  const openAddModal = useCallback(() => setIsAdding(true), []);
  const closeAddModal = useCallback(() => setIsAdding(false), []);

  return (
    <>
      <ItemListButtonRow onAdd={openAddModal} />
      {isAdding && (
        <AddItemModal onAdd={addItem} onClose={closeAddModal} />
      )}
    </>
  );
}

export default ItemListActions;
