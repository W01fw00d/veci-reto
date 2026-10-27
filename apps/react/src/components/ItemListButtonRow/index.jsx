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
    <div className="mt-7 flex items-center gap-3">
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
            d="M9 10 5 6m0 0 4-4M5 6h7a7 7 0 1 1-6.2 10.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </Button>
      <Button
        className="min-w-[120px]"
        aria-label="Delete selected item"
        disabled={!canDelete}
        onClick={onDelete}
        variant="secondary"
      >
        DELETE
      </Button>
      <div className="ml-auto flex items-center gap-2">
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
