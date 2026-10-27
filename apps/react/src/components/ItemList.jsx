import PropTypes from 'prop-types';
import Button from './ui/Button.jsx';

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

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
    .isRequired,
};

export default ItemList;
