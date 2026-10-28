import './style.css';

const MAX_ITEM_LENGTH = 1000;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    detail,
  }));
}

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="app-header">
        <h1>This is a technical proof</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
          inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
          hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
        </p>
      </header>
    `;
  }
}

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
    this.innerHTML = items.map((item) => {
      const selected = selectedIds.includes(item.id);
      return `
        <button
          aria-label="Select ${escapeHtml(item.text)}"
          aria-selected="${selected}"
          class="list-option${selected ? ' is-selected' : ''}"
          data-item-id="${item.id}"
          role="option"
          type="button"
        >${escapeHtml(item.text)}</button>
      `;
    }).join('');
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

class ItemListButtonRow extends HTMLElement {
  connectedCallback() {
    this.className = 'button-row';
    this.innerHTML = `
      <button aria-label="Undo last change" class="button button-icon" disabled type="button">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path d="M3 2v6h6M3.51 15a9 9 0 1 0 .49-9.49L3 8" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </button>
      <button aria-label="Delete selected items" class="button button-secondary delete-button"
        disabled type="button">DELETE</button>
      <div class="add-button-wrap">
        <button aria-label="Open add item form" class="button button-primary" type="button">ADD</button>
      </div>
    `;
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

class AddItemModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="modal-backdrop">
        <section aria-labelledby="add-item-title" aria-modal="true" class="modal-panel" role="dialog">
          <form novalidate>
            <h2 id="add-item-title">Add item to list</h2>
            <label class="visually-hidden" for="new-item">Add item to list</label>
            <input id="new-item" name="item" placeholder="Type the text here..." type="text">
            <p class="validation-error" role="alert" hidden></p>
            <div class="modal-actions">
              <button aria-label="Add item to list" class="button button-primary modal-submit"
                type="submit">ADD</button>
              <button aria-label="Cancel adding item" class="button button-secondary modal-cancel"
                type="button">CANCEL</button>
            </div>
          </form>
        </section>
      </div>
    `;

    this.input = this.querySelector('input');
    this.error = this.querySelector('[role="alert"]');
    this.addEventListener('submit', this.handleSubmit);
    this.addEventListener('input', this.clearError);
    this.addEventListener('click', this.handleClick);
    window.addEventListener('keydown', this.handleKeyDown);
    this.input.focus();
  }

  disconnectedCallback() {
    this.removeEventListener('submit', this.handleSubmit);
    this.removeEventListener('input', this.clearError);
    this.removeEventListener('click', this.handleClick);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  clearError = () => {
    this.error.hidden = true;
    this.error.textContent = '';
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const text = this.input.value.trim();

    if (!text) {
      this.showError('Item must be at least 1 character long');
      return;
    }
    if (text.length > MAX_ITEM_LENGTH) {
      this.showError(`Item must be no more than ${MAX_ITEM_LENGTH} characters long`);
      return;
    }

    emit(this, 'item-added', text);
    emit(this, 'modal-close');
  };

  showError(message) {
    this.error.textContent = message;
    this.error.hidden = false;
    this.input.focus();
  }

  handleClick = (event) => {
    if (event.target.closest('.modal-cancel') || event.target === this.querySelector('.modal-backdrop')) {
      emit(this, 'modal-close');
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      emit(this, 'modal-close');
    }
  };
}

class ItemListApp extends HTMLElement {
  constructor() {
    super();
    this.items = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
    ];
    this.selectedIds = [1];
    this.history = [];
    this.nextId = 5;
    this.handleItemToggle = this.handleItemToggle.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemsDelete = this.handleItemsDelete.bind(this);
    this.handleItemsUndo = this.handleItemsUndo.bind(this);
    this.handleItemAdd = this.handleItemAdd.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <main class="app-main">
        <section class="app-panel">
          <app-header></app-header>
          <item-list></item-list>
          <item-list-actions></item-list-actions>
        </section>
      </main>
    `;

    this.itemList = this.querySelector('item-list');
    this.actions = this.querySelector('item-list-actions');
    this.addEventListener('item-toggle', this.handleItemToggle);
    this.addEventListener('item-delete', this.handleItemDelete);
    this.addEventListener('delete-selected-items', this.handleItemsDelete);
    this.addEventListener('undo-items', this.handleItemsUndo);
    this.addEventListener('item-added', this.handleItemAdd);
    this.renderState();
  }

  disconnectedCallback() {
    this.removeEventListener('item-toggle', this.handleItemToggle);
    this.removeEventListener('item-delete', this.handleItemDelete);
    this.removeEventListener('delete-selected-items', this.handleItemsDelete);
    this.removeEventListener('undo-items', this.handleItemsUndo);
    this.removeEventListener('item-added', this.handleItemAdd);
  }

  rememberCurrentState() {
    this.history.push({
      items: this.items.map((item) => ({ ...item })),
      selectedIds: [...this.selectedIds],
    });
  }

  handleItemToggle(event) {
    const id = event.detail;
    this.selectedIds = this.selectedIds.includes(id)
      ? this.selectedIds.filter((selectedId) => selectedId !== id)
      : [...this.selectedIds, id];
    this.renderState();
  }

  handleItemDelete(event) {
    const id = event.detail;
    if (!this.items.some((item) => item.id === id)) return;
    this.rememberCurrentState();
    this.items = this.items.filter((item) => item.id !== id);
    this.selectedIds = this.selectedIds.filter((selectedId) => selectedId !== id);
    this.renderState();
  }

  handleItemsDelete() {
    if (this.selectedIds.length === 0) return;
    this.rememberCurrentState();
    this.items = this.items.filter((item) => !this.selectedIds.includes(item.id));
    this.selectedIds = [];
    this.renderState();
  }

  handleItemsUndo() {
    const previousState = this.history.pop();
    if (!previousState) return;
    this.items = previousState.items;
    this.selectedIds = previousState.selectedIds;
    this.renderState();
  }

  handleItemAdd(event) {
    const item = { id: this.nextId, text: event.detail };
    this.nextId += 1;
    this.rememberCurrentState();
    this.items = [...this.items, item];
    this.selectedIds = [item.id];
    this.renderState();
  }

  renderState() {
    this.itemList.items = this.items;
    this.itemList.selectedIds = this.selectedIds;
    this.actions.updateAvailability({
      canUndo: this.history.length > 0,
      canDelete: this.selectedIds.length > 0,
    });
  }
}

customElements.define('app-header', AppHeader);
customElements.define('item-list', ItemList);
customElements.define('item-list-button-row', ItemListButtonRow);
customElements.define('item-list-actions', ItemListActions);
customElements.define('add-item-modal', AddItemModal);
customElements.define('item-list-app', ItemListApp);
