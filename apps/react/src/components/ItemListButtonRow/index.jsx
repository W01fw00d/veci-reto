// @ts-check

import Button from '../ui/Button';
import { memo } from 'react';

const LABELS = {
  UNDO: 'Undo last change',
  DELETE_SELECTED: 'Delete selected items',
  OPEN_ADD: 'Open add item form',
  ADD: 'add',
  DELETE: 'delete',
};

/**
 * @typedef {{
 *   canUndo: boolean,
 *   canDelete: boolean,
 *   onUndo: () => void,
 *   onDelete: () => void,
 *   onAdd: () => void
 * }} ItemListButtonRowProps
 */

/** @param {ItemListButtonRowProps} props */
function ItemListButtonRow({
  canUndo,
  canDelete,
  onUndo,
  onDelete,
  onAdd,
}) {
  return (
    <div className="mt-[19px] flex items-center gap-5 max-sm:flex-wrap">
      <Button
        aria-label={LABELS.UNDO}
        disabled={!canUndo}
        onClick={onUndo}
        variant="icon"
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 2v6h6M3.51 15a9 9 0 1 0 .49-9.49L3 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </Button>
      <Button
        className="uppercase min-w-[160px]"
        aria-label={LABELS.DELETE_SELECTED}
        disabled={!canDelete}
        onClick={onDelete}
        variant="secondary"
      >
        {LABELS.DELETE}
      </Button>
      <div className="ml-auto flex items-center gap-2 max-sm:ml-[120px]">
        <Button
          className="uppercase"
          aria-label={LABELS.OPEN_ADD}
          onClick={onAdd}
          variant="primary"
        >
          {LABELS.ADD}
        </Button>
      </div>
    </div>
  );
}

export default memo(ItemListButtonRow);
