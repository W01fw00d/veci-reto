// @ts-check

import { useCallback, useState } from 'react';
import Button from '../ui/Button';
import AddItemModal from '../AddItemModal';

const LABELS = {
  OPEN_ADD: 'Open add item form',
  ADD: 'add',
};

function OpenModalButton() {
  const [isAdding, setIsAdding] = useState(false);
  const openAddModal = useCallback(() => setIsAdding(true), []);
  const closeAddModal = useCallback(() => setIsAdding(false), []);

  return (
    <>
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
      {isAdding && <AddItemModal onClose={closeAddModal} />}
    </>
  );
}

export default OpenModalButton;
