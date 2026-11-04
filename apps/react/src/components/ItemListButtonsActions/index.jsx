// @ts-check

import Button from '../ui/Button';
import { memo } from 'react';
import { useItemsContext } from '../../contexts/ItemsContext';
import UndoIcon from './UndoIcon';

const LABELS = {
  UNDO: 'Undo last change',
  DELETE_SELECTED: 'Delete selected items',
  DELETE: 'delete',
};

function ItemListButtonsActions() {
  const { canDelete, canUndo, deleteSelected, undo } = useItemsContext();

  return (
    <>
      <Button
        aria-label={LABELS.UNDO}
        disabled={!canUndo}
        onClick={undo}
        variant="icon"
      >
        <UndoIcon />
      </Button>
      <Button
        className="uppercase min-w-[160px]"
        aria-label={LABELS.DELETE_SELECTED}
        disabled={!canDelete}
        onClick={deleteSelected}
        variant="secondary"
      >
        {LABELS.DELETE}
      </Button>
    </>
  );
}

export default memo(ItemListButtonsActions);
