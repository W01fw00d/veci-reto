import ItemListButtonsActions from '.';
import { ItemsProvider } from '../../contexts/ItemsContext';

export default function Default() {
  return (
    <ItemsProvider>
      <div className="flex items-center gap-5">
        <ItemListButtonsActions />
      </div>
    </ItemsProvider>
  );
}
