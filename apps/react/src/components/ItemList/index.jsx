// @ts-check

import Button from '../ui/Button';

/**
 * @typedef {{id: number, text: string}} Item
 * @typedef {{
 *   items: Item[],
 *   selectedIds: number[],
 *   onToggleSelection: (id: number) => void,
 *   onDeleteItem: (id: number) => void
 * }} ItemListProps
 */

/** @param {ItemListProps} props */
function ItemList({ items, selectedIds, onToggleSelection, onDeleteItem }) {
  const isEmpty = items.length === 0;

  return (
    <div
      aria-label={isEmpty ? undefined : 'Items'}
      aria-multiselectable={isEmpty ? undefined : 'true'}
      className="mt-7 h-[218px] overflow-y-auto border border-[#dedede] bg-[#f7f7f7] p-2.5 shadow-inner"
      role={isEmpty ? undefined : 'listbox'}
    >
      {isEmpty ? (
        <p
          className="flex h-full items-center justify-center text-[#666666]"
          role="status"
        >
          No saved items found
        </p>
      ) : (
        items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <Button
              aria-label={`Select ${item.text}`}
              aria-selected={isSelected}
              className={isSelected
                ? 'bg-[#394cff] text-white'
                : 'text-[#666666] hover:bg-[#e9edff]'}
              key={item.id}
              onClick={() => onToggleSelection(item.id)}
              onDoubleClick={() => onDeleteItem(item.id)}
              role="option"
              variant="listOption"
            >
              {item.text}
            </Button>
          );
        })
      )}
    </div>
  );
}

export default ItemList;
