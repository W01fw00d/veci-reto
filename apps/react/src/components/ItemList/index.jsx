// @ts-check

import Button from '../ui/Button';
import { useItemsContext } from '../../contexts/ItemsContext';

const LABELS = {
  ITEMS: 'Items',
  EMPTY: 'No saved items found',
  /** @param {string} text */
  SELECT_ITEM: (text) => `Select ${text}`,
};

function ItemList() {
  const { items, selectedIds, toggleSelection, deleteItem } = useItemsContext();
  const isEmpty = items.length === 0;

  return (
    <div
      aria-label={isEmpty ? undefined : LABELS.ITEMS}
      aria-multiselectable={isEmpty ? undefined : 'true'}
      className="mt-[35px] h-[227px] overflow-y-auto border border-[#CCCCCC] bg-[#F7F7F7] p-2"
      role={isEmpty ? undefined : 'listbox'}
    >
      {isEmpty ? (
        <p
          className="flex h-full items-center justify-center text-[#666666]"
          role="status"
        >
          {LABELS.EMPTY}
        </p>
      ) : (
        items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <Button
              aria-label={LABELS.SELECT_ITEM(item.text)}
              aria-selected={isSelected}
              className={isSelected
                ? 'bg-[#324BFF] text-white'
                : 'text-[#333333] hover:bg-[#e9edff]'}
              key={item.id}
              onClick={() => toggleSelection(item.id)}
              onDoubleClick={() => deleteItem(item.id)}
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
