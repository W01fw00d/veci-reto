// @ts-check

import { createContext, useContext, useState } from 'react';

/**
 * @typedef {{id: string, text: string}} Item
 * @typedef {{items: Item[], selectedIds: string[]}} HistoryEntry
 * @typedef {{
 *   items: Item[],
 *   selectedIds: string[],
 *   canDelete: boolean,
 *   canUndo: boolean,
 *   addItem: (text: string) => void,
 *   deleteSelected: () => void,
 *   deleteItem: (id: string) => void,
 *   toggleSelection: (id: string) => void,
 *   undo: () => void
 * }} ItemsContextValue
 */

/** @type {Item[]} */
const initialItems = [
  { id: crypto.randomUUID(), text: 'Item 1' },
  { id: crypto.randomUUID(), text: 'Item 2' },
  { id: crypto.randomUUID(), text: 'Item 3' },
  { id: crypto.randomUUID(), text: 'Item 4' },
];

const ItemsContext = createContext(
  /** @type {ItemsContextValue | null} */(null),
);

/**
 * @param {{children: import('react').ReactNode}} props
 */
export function ItemsProvider({ children }) {
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
  function addItem(text) {
    const item = { id: crypto.randomUUID(), text };
    rememberCurrentState();
    setItems((currentItems) => [...currentItems, item]);
    setSelectedIds([item.id]);
  }

  function deleteSelected() {
    if (selectedIds.length === 0) return;

    rememberCurrentState();
    setItems((currentItems) =>
      currentItems.filter((item) => !selectedIds.includes(item.id)),
    );
    setSelectedIds([]);
  }

  /** @param {string} id */
  function deleteItem(id) {
    if (!items.some((item) => item.id === id)) return;

    rememberCurrentState();
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.filter((selectedId) => selectedId !== id),
    );
  }

  /** @param {string} id */
  function toggleSelection(id) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)
        : [...currentSelectedIds, id],
    );
  }

  function undo() {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setItems(previousState.items);
    setSelectedIds(previousState.selectedIds);
    setHistory((previousHistory) => previousHistory.slice(0, -1));
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        selectedIds,
        canDelete: selectedIds.length > 0,
        canUndo: history.length > 0,
        addItem,
        deleteSelected,
        deleteItem,
        toggleSelection,
        undo,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItemsContext must be used within an ItemsProvider');
  }
  return context;
}
