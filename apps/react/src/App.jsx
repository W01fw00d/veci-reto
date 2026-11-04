// @ts-check

import { useState } from 'react';
import AppHeader from './components/AppHeader';
import ItemListActions from './components/ItemListActions';
import ItemList from './components/ItemList';
import Panel from './components/ui/Panel';

/**
 * @typedef {{id: string, text: string}} Item
 * @typedef {{items: Item[], selectedIds: string[]}} HistoryEntry
 */

/** @type {Item[]} */
const initialItems = [
  { id: crypto.randomUUID(), text: 'Item 1' },
  { id: crypto.randomUUID(), text: 'Item 2' },
  { id: crypto.randomUUID(), text: 'Item 3' },
  { id: crypto.randomUUID(), text: 'Item 4' },
];

const mainClasses = [
  'flex min-h-screen items-center justify-center',
  'bg-[linear-gradient(112deg,#A1C4FD_0%,#C2E9FB_100%)]',
  'p-4 font-sans text-[#333333] sm:p-8',
].join(' ');

const panelClasses = [
  'box-border h-[577px] w-full max-w-[900px] rounded-[20px]',
  'p-[50px] shadow-[0_5px_12px_#0000001f]',
  'max-sm:h-auto max-sm:min-h-[577px] max-sm:px-6 max-sm:py-8',
  '[@media(max-height:600px)]:h-auto',
].join(' ');

function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState([initialItems[0].id]);
  const [history, setHistory] = useState(/** @type {HistoryEntry[]} */([]));

  function rememberCurrentState() {
    setHistory((previousHistory) => [
      ...previousHistory,
      { items, selectedIds },
    ]);
  }

  /** @param {string} text */
  function handleAdd(text) {
    const item = { id: crypto.randomUUID(), text };
    rememberCurrentState();
    setItems((currentItems) => [...currentItems, item]);
    setSelectedIds([item.id]);
  }

  function handleDelete() {
    if (selectedIds.length === 0) return;

    rememberCurrentState();
    setItems((currentItems) =>
      currentItems.filter((item) => !selectedIds.includes(item.id)),
    );
    setSelectedIds([]);
  }

  /** @param {string} id */
  function handleDeleteItem(id) {
    if (!items.some((item) => item.id === id)) return;

    rememberCurrentState();
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.filter((selectedId) => selectedId !== id),
    );
  }

  function handleUndo() {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setItems(previousState.items);
    setSelectedIds(previousState.selectedIds);
    setHistory((previousHistory) => previousHistory.slice(0, -1));
  }

  return (
    <main className={mainClasses}>
      <Panel className={panelClasses}>
        <AppHeader />

        <ItemList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleSelection={(id) => {
            setSelectedIds((currentSelectedIds) =>
              currentSelectedIds.includes(id)
                ? currentSelectedIds.filter((selectedId) => selectedId !== id)
                : [...currentSelectedIds, id],
            );
          }}
          selectedIds={selectedIds}
        />

        <ItemListActions
          canDelete={selectedIds.length > 0}
          canUndo={history.length > 0}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onUndo={handleUndo}
        />
      </Panel>
    </main>
  );
}

export default App;
