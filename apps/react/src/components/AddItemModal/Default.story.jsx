import { useState } from 'react';
import AddItemModal from '.';
import ItemList from '../ItemList';
import { ItemsProvider } from '../../contexts/ItemsContext';

export default function Default() {
  const [closed, setClosed] = useState(false);

  return (
    <ItemsProvider>
      <ItemList />
      {!closed && <AddItemModal onClose={() => setClosed(true)} />}
    </ItemsProvider>
  );
}
