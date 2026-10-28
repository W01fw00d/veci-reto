// @ts-check

import { useCallback, useRef, useState } from 'react';
import AddItemModal from './components/AddItemModal';
import AppHeader from './components/AppHeader';
import ItemList from './components/ItemList';
import ItemListButtonRow from './components/ItemListButtonRow';
import Panel from './components/ui/Panel';

/**
 * @typedef {{id: number, text: string}} Item
 * @typedef {{items: Item[], selectedIds: number[]}} HistoryEntry
 */

/** @type {Item[]} */
const initialItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState([1]);
  const [history, setHistory] = useState(/** @type {HistoryEntry[]} */([]));
  const [isAdding, setIsAdding] = useState(false);
  const nextId = useRef(5);

  const handleCloseAddModal = useCallback(() => {
    setIsAdding(false);
  }, []);

  function rememberCurrentState() {
    setHistory((previousHistory) => [
      ...previousHistory,
      { items, selectedIds },
    ]);
  }

  /** @param {string} text */
  function handleAdd(text) {
    const item = { id: nextId.current, text };
    nextId.current += 1;
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

  /** @param {number} id */
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
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(112deg,#a8c4ff_0%,#bfe9f4_100%)] p-4 sm:p-8">
      <Panel className="max-w-[860px] shadow-[0_8px_18px_rgba(54,91,129,0.18)] sm:px-10">
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

        <ItemListButtonRow
          canDelete={selectedIds.length > 0}
          canUndo={history.length > 0}
          onAdd={() => setIsAdding(true)}
          onDelete={handleDelete}
          onUndo={handleUndo}
        />

        {isAdding && (
          <AddItemModal
            onAdd={handleAdd}
            onClose={handleCloseAddModal}
          />
        )}
      </Panel>
    </main>
  );
}

export default App;
