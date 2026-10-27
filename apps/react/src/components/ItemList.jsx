// @ts-check

import Button from './ui/Button.jsx';

/**
 * @typedef {{id: number, text: string}} Item
 * @typedef {{
 *   items: Item[],
 *   selectedId: number | null,
 *   onSelect: (id: number) => void
 * }} ItemListProps
 */

/** @param {ItemListProps} props */
function ItemList({ items, selectedId, onSelect }) {
  return (
    <div
      aria-label="Items"
      aria-multiselectable="false"
      className="mt-7 h-[218px] overflow-y-auto border border-[#dedede] bg-[#f7f7f7] p-2.5 shadow-inner"
      role="listbox"
    >
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <Button
            aria-label={`Select ${item.text}`}
            aria-selected={isSelected}
            className={isSelected
              ? 'bg-[#394cff] text-white'
              : 'text-[#666666] hover:bg-[#e9edff]'}
            key={item.id}
            onClick={() => onSelect(item.id)}
            role="option"
            variant="listOption"
          >
            {item.text}
          </Button>
        );
      })}
    </div>
  );
}

export default ItemList;
