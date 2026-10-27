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
          <button
            aria-selected={isSelected}
            className={`block min-h-[39px] w-full px-3 text-left text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4650ff] ${
              isSelected
                ? 'bg-[#394cff] text-white'
                : 'text-[#666666] hover:bg-[#e9edff]'
            }`}
            key={item.id}
            onClick={() => onSelect(item.id)}
            role="option"
            type="button"
          >
            {item.text}
          </button>
        );
      })}
    </div>
  );
}

export default ItemList;
