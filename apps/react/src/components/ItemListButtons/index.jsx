// @ts-check

import { useCallback, useState } from 'react';
import Button from '../ui/Button';
import AddItemModal from '../AddItemModal';
import ItemListButtonsActions from '../ItemListButtonsActions';

const LABELS = {
  OPEN_ADD: 'Open add item form',
  ADD: 'add',
};

function ItemListButtons() {
  const [isAdding, setIsAdding] = useState(false);
  const openAddModal = useCallback(() => setIsAdding(true), []);
  const closeAddModal = useCallback(() => setIsAdding(false), []);

  return (
    <>
      <div className="mt-[19px] flex items-center gap-5 max-sm:flex-wrap">
        <ItemListButtonsActions />
        <div className="ml-auto flex items-center gap-2 max-sm:ml-[120px]">
          <Button
            aria-label={LABELS.OPEN_ADD}
            className="uppercase"
            onClick={openAddModal}
            variant="primary"
          >
            {LABELS.ADD}
          </Button>
        </div>
      </div>
      {isAdding && (
        <AddItemModal onClose={closeAddModal} />
      )}
    </>
  );
}

export default ItemListButtons;
