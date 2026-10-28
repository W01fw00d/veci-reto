import './style.css';
import { createButton } from '../../ui/Button';
import { emit } from '../../utils/events.js';

class ItemListButtonRow extends HTMLElement {
  connectedCallback() {
    this.className = 'button-row';
    const undo = createButton({
      ariaLabel: 'Undo last change',
      className: 'button-icon',
      disabled: true,
      html: '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="M3 2v6h6M3.51 15a9 9 0 1 0 .49-9.49L3 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>',
      variant: 'icon',
    });
    const deleteButton = createButton({
      ariaLabel: 'Delete selected items',
      className: 'delete-button',
      disabled: true,
      text: 'DELETE',
      variant: 'secondary',
    });
    const addWrap = document.createElement('div');
    addWrap.className = 'add-button-wrap';
    addWrap.append(createButton({
      ariaLabel: 'Open add item form',
      text: 'ADD',
      variant: 'primary',
    }));
    this.replaceChildren(undo, deleteButton, addWrap);
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  handleClick = (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;

    if (button.getAttribute('aria-label') === 'Undo last change') {
      emit(this, 'undo-items');
    } else if (button.getAttribute('aria-label') === 'Delete selected items') {
      emit(this, 'delete-selected-items');
    } else if (button.getAttribute('aria-label') === 'Open add item form') {
      emit(this, 'open-add-item');
    }
  };

  updateAvailability({ canUndo, canDelete }) {
    this.querySelector('[aria-label="Undo last change"]').disabled = !canUndo;
    this.querySelector('[aria-label="Delete selected items"]').disabled = !canDelete;
  }
}

if (!customElements.get('item-list-button-row')) {
  customElements.define('item-list-button-row', ItemListButtonRow);
}

export default ItemListButtonRow;
