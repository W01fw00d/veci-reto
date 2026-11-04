import AppHeader from './components/AppHeader';
import ItemListActions from './components/ItemListActions';
import ItemList from './components/ItemList';
import Panel from './components/ui/Panel';
import { ItemsProvider, useItemsContext } from './contexts/ItemsContext';

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

function AppContent() {
  const { items, selectedIds, deleteItem, toggleSelection } = useItemsContext();

  return (
    <main className={mainClasses}>
      <Panel className={panelClasses}>
        <AppHeader />

        <ItemList
          items={items}
          onDeleteItem={deleteItem}
          onToggleSelection={toggleSelection}
          selectedIds={selectedIds}
        />

        <ItemListActions />
      </Panel>
    </main>
  );
}

function App() {
  return (
    <ItemsProvider>
      <AppContent />
    </ItemsProvider>
  );
}

export default App;
