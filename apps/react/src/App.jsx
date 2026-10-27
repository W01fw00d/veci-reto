import { useCallback, useRef, useState } from 'react';
import AddItemModal from './components/AddItemModal.jsx';
import ItemList from './components/ItemList.jsx';

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
      <section className="w-full max-w-[860px] rounded-2xl bg-white px-6 py-8 shadow-[0_8px_18px_rgba(54,91,129,0.18)] sm:px-10 sm:py-11">
        <header className="text-center">
          <h1 className="text-[30px] leading-tight font-normal tracking-tight text-[#333333] sm:text-[40px]">
            This is a technical proof
          </h1>
          <p className="mx-auto mt-3 max-w-[760px] text-[16px] leading-[1.55] text-[#777777] sm:text-[17px]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit mus primis
            nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam
            nunc, hendrerit posuere augue fames dictumst placerat porttitor,
            dis mi pharetra vestibulum venenatis phasellus.
          </p>
        </header>

        <ItemList
          items={items}
          onSelect={setSelectedId}
          selectedId={selectedId}
        />

        <div className="mt-7 flex items-center gap-3">
          <button
            aria-label="Undo last change"
            className="flex h-12 w-[78px] items-center justify-center rounded-full border-2 border-[#a8b2ff] text-[#7b8cff] transition hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={history.length === 0}
            onClick={handleUndo}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 10 5 6m0 0 4-4M5 6h7a7 7 0 1 1-6.2 10.2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button
            className="h-12 min-w-[120px] rounded-full border-2 border-[#a8b2ff] px-7 text-sm font-medium text-[#7184ff] transition hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={selectedId === null}
            onClick={handleDelete}
            type="button"
          >
            DELETE
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="h-12 min-w-[132px] rounded-full bg-[#394cff] px-8 text-sm font-medium text-white transition hover:bg-[#293ce8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff]"
              onClick={() => setIsAdding(true)}
              type="button"
            >
              ADD
            </button>
          </div>
        </div>
        {isAdding && (
          <AddItemModal
            onAdd={handleAdd}
            onClose={handleCloseAddModal}
          />
        )}
      </section>
    </main>
  );
}

export default App;
