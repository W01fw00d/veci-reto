import '../AddItemModal';
import '../ItemListButtonRow';

class ItemListActions extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<item-list-button-row></item-list-button-row>';
    this.buttonRow = this.querySelector('item-list-button-row');
    this.addEventListener('open-add-item', this.openAddItem);
    this.addEventListener('modal-close', this.closeAddItem);
  }

  disconnectedCallback() {
    this.removeEventListener('open-add-item', this.openAddItem);
    this.removeEventListener('modal-close', this.closeAddItem);
  }

  openAddItem = () => {
    if (this.querySelector('add-item-modal')) return;
    this.insertAdjacentHTML('beforeend', '<add-item-modal></add-item-modal>');
  };

  closeAddItem = () => {
    this.querySelector('add-item-modal')?.remove();
    this.querySelector('[aria-label="Open add item form"]')?.focus();
  };

  updateAvailability(availability) {
    this.buttonRow.updateAvailability(availability);
  }
}

if (!customElements.get('item-list-actions')) {
  customElements.define('item-list-actions', ItemListActions);
}

export default ItemListActions;
