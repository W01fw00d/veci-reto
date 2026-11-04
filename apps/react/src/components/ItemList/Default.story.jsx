import ItemList from '.';
import { ItemsProvider } from '../../contexts/ItemsContext';

export default function Default() {
  return (
    <ItemsProvider>
      <ItemList />
    </ItemsProvider>
  );
}
