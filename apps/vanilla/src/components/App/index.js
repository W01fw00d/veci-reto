import './style.css';
import '../AppHeader';
import '../ItemList';
import '../ItemListActions';
import '../../ui/Panel';

const initialItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
];

class ItemListApp extends HTMLElement {
  constructor() {
    super();
    this.items = initialItems.map((item) => ({ ...item }));
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
        <ui-panel>
          <app-header></app-header>
          <item-list></item-list>
          <item-list-actions></item-list-actions>
        </ui-panel>
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

if (!customElements.get('item-list-app')) {
  customElements.define('item-list-app', ItemListApp);
}

export default ItemListApp;
