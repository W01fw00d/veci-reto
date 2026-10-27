import { useCallback, useRef, useState } from 'react';
import AddItemModal from './components/AddItemModal.jsx';
import Header from './components/Header.jsx';
import ItemList from './components/ItemList.jsx';
import ItemListButtonRow from './components/ItemListButtonRow.jsx';
import Panel from './components/Panel.jsx';

const initialItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(1);
  const [history, setHistory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const nextId = useRef(5);

  const handleCloseAddModal = useCallback(() => {
    setIsAdding(false);
  }, []);

  function rememberCurrentState() {
    setHistory((previousHistory) => [
      ...previousHistory,
      { items, selectedId },
    ]);
  }

  function handleAdd(text) {
    const item = { id: nextId.current, text };
    nextId.current += 1;
    rememberCurrentState();
    setItems((currentItems) => [...currentItems, item]);
    setSelectedId(item.id);
  }

  function handleDelete() {
    if (selectedId === null) return;

    rememberCurrentState();
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== selectedId),
    );
    setSelectedId(null);
  }

  function handleUndo() {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setItems(previousState.items);
    setSelectedId(previousState.selectedId);
    setHistory((previousHistory) => previousHistory.slice(0, -1));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(112deg,#a8c4ff_0%,#bfe9f4_100%)] p-4 sm:p-8">
      <Panel className="max-w-[860px] shadow-[0_8px_18px_rgba(54,91,129,0.18)] sm:px-10">
        <Header />

        <ItemList
          items={items}
          onSelect={setSelectedId}
          selectedId={selectedId}
        />

        <ItemListButtonRow
          canDelete={selectedId !== null}
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
