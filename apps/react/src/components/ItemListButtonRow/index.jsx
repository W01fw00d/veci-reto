// @ts-check

import Button from '../ui/Button';

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
        aria-label="Undo last change"
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
        className="min-w-[160px]"
        aria-label="Delete selected items"
        disabled={!canDelete}
        onClick={onDelete}
        variant="secondary"
      >
        DELETE
      </Button>
      <div className="ml-auto flex items-center gap-2 max-sm:ml-[120px]">
        <Button
          aria-label="Open add item form"
          onClick={onAdd}
          variant="primary"
        >
          ADD
        </Button>
      </div>
    </div>
  );
}

export default ItemListButtonRow;
