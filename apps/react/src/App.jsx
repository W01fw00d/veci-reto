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
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(112deg,#A1C4FD_0%,#C2E9FB_100%)] p-4 font-sans text-[#333333] sm:p-8">
      <Panel className="box-border h-[577px] w-full max-w-[900px] rounded-[20px] p-[50px] shadow-[0_5px_12px_#0000001f] max-sm:h-auto max-sm:min-h-[577px] max-sm:px-6 max-sm:py-8 [@media(max-height:600px)]:h-auto">
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
