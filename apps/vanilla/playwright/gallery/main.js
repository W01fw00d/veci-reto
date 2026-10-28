import '../../src/base.css';
import '../../src/components/AddItemModal';
import '../../src/components/AppHeader';
import '../../src/components/ItemList';
import '../../src/components/ItemListButtonRow';
import '../../src/ui/Button';
import '../../src/ui/Modal';
import '../../src/ui/Panel';
import '../../src/ui/TextInput';

const root = document.querySelector('#root');

function output(testId, value) {
  const input = document.createElement('input');
  input.dataset.testid = testId;
  input.readOnly = true;
  input.value = value;
  root.append(input);
  return input;
}

function renderStory(story, props = {}) {
  root.replaceChildren();

  if (story === 'AppHeader') {
    root.append(document.createElement('app-header'));
    return;
  }

  if (story === 'AddItemModal') {
    const modal = document.createElement('add-item-modal');
    const addedItem = output('added-item', '');
    const closed = output('closed', 'false');
    modal.addEventListener('item-added', (event) => {
      addedItem.value = event.detail;
    });
    modal.addEventListener('modal-close', () => {
      closed.value = 'true';
    });
    root.prepend(modal);
    return;
  }

  if (story === 'ItemList') {
    const list = document.createElement('item-list');
    let items = [
      { id: 1, text: 'First item' },
      { id: 2, text: 'Second item' },
    ];
    let selectedIds = [1];
    const selected = output('selected-ids', JSON.stringify(selectedIds));
    list.items = items;
    list.selectedIds = selectedIds;
    list.addEventListener('item-toggle', (event) => {
      const { detail: id } = event;
      selectedIds = selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id];
      list.selectedIds = selectedIds;
      selected.value = JSON.stringify(selectedIds);
    });
    list.addEventListener('item-delete', (event) => {
      items = items.filter((item) => item.id !== event.detail);
      selectedIds = selectedIds.filter((id) => id !== event.detail);
      list.items = items;
      list.selectedIds = selectedIds;
      selected.value = JSON.stringify(selectedIds);
    });
    root.prepend(list);
    return;
  }

  if (story === 'ItemListButtonRow') {
    const row = document.createElement('item-list-button-row');
    const actions = output('actions', '[]');
    const recorded = [];
    const record = (action) => {
      recorded.push(action);
      actions.value = JSON.stringify(recorded);
    };
    row.addEventListener('undo-items', () => record('undo'));
    row.addEventListener('delete-selected-items', () => record('delete'));
    row.addEventListener('open-add-item', () => record('add'));
    root.prepend(row);
    row.updateAvailability({
      canUndo: props.canUndo ?? true,
      canDelete: props.canDelete ?? true,
    });
    return;
  }

  if (story === 'Button') {
    const button = document.createElement('ui-button');
    button.textContent = 'Save';
    button.setAttribute('variant', props.variant ?? 'primary');
    if (props.disabled) button.setAttribute('disabled', '');
    const clicks = output('clicks', '0');
    let clickCount = 0;
    button.addEventListener('click', () => {
      clickCount += 1;
      clicks.value = String(clickCount);
    });
    root.prepend(button);
    return;
  }

  if (story === 'Modal') {
    const modal = document.createElement('ui-modal');
    modal.setAttribute('labelledby', 'story-modal-title');
    modal.innerHTML = '<h2 id="story-modal-title">Example dialog</h2><button type="button">Dialog content</button>';
    const closeCount = output('close-count', '0');
    let count = 0;
    modal.addEventListener('modal-dismiss', () => {
      count += 1;
      closeCount.value = String(count);
    });
    root.prepend(modal);
    return;
  }

  if (story === 'Panel') {
    const panel = document.createElement('ui-panel');
    panel.setAttribute('aria-label', props.label ?? 'Example panel');
    panel.innerHTML = '<p>Panel content</p>';
    root.append(panel);
    return;
  }

  if (story === 'TextInput') {
    const label = document.createElement('label');
    label.append(document.createTextNode(`${props.label ?? 'Example input'} `));
    const input = document.createElement('ui-text-input');
    input.setAttribute('placeholder', props.placeholder ?? 'Type here...');
    label.append(input);
    root.append(label);
    return;
  }

  throw new Error(`Unknown Vanilla component story: ${story}`);
}

window.mountVanillaComponent = renderStory;
