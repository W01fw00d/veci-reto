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
      className="mt-[35px] h-[227px] overflow-y-auto border border-[#CCCCCC] bg-[#F7F7F7] p-2"
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
                ? 'bg-[#324BFF] text-white'
                : 'text-[#333333] hover:bg-[#e9edff]'}
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
