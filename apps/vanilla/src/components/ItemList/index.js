import './style.css';
import { createButton } from '../../ui/Button';
import { emit } from '../../utils/events.js';

class ItemList extends HTMLElement {
  set items(value) {
    if (this._items === value) {
      this.updateSelection();
      return;
    }
    this._items = value;
    this.render();
  }

  set selectedIds(value) {
    this._selectedIds = value;
    this.updateSelection();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('dblclick', this.handleDoubleClick);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('dblclick', this.handleDoubleClick);
  }

  handleClick = (event) => {
    const option = event.target.closest('[role="option"]');
    if (option && this.contains(option)) {
      emit(this, 'item-toggle', Number(option.dataset.itemId));
    }
  };

  handleDoubleClick = (event) => {
    const option = event.target.closest('[role="option"]');
    if (option && this.contains(option)) {
      emit(this, 'item-delete', Number(option.dataset.itemId));
    }
  };

  render() {
    if (!this.isConnected) return;

    const items = this._items ?? [];
    const selectedIds = this._selectedIds ?? [];
    this.className = 'item-list';

    if (items.length === 0) {
      this.removeAttribute('aria-label');
      this.removeAttribute('aria-multiselectable');
      this.removeAttribute('role');
      this.innerHTML = '<p class="empty-state" role="status">No saved items found</p>';
      return;
    }

    this.setAttribute('aria-label', 'Items');
    this.setAttribute('aria-multiselectable', 'true');
    this.setAttribute('role', 'listbox');
    this.replaceChildren(...items.map((item) => {
      const selected = selectedIds.includes(item.id);
      const option = createButton({
        ariaLabel: `Select ${item.text}`,
        className: `list-option${selected ? ' is-selected' : ''}`,
        text: item.text,
      });
      option.setAttribute('aria-selected', String(selected));
      option.dataset.itemId = String(item.id);
      option.setAttribute('role', 'option');
      return option;
    }));
  }

  updateSelection() {
    if (!this.isConnected) return;
    const selectedIds = this._selectedIds ?? [];
    this.querySelectorAll('[role="option"]').forEach((option) => {
      const selected = selectedIds.includes(Number(option.dataset.itemId));
      option.setAttribute('aria-selected', String(selected));
      option.classList.toggle('is-selected', selected);
    });
  }
}

if (!customElements.get('item-list')) {
  customElements.define('item-list', ItemList);
}

export default ItemList;
