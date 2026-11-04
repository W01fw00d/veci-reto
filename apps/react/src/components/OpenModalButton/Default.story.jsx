import OpenModalButton from '.';
import { ItemsProvider } from '../../contexts/ItemsContext';

export default function Default() {
  return (
    <ItemsProvider>
      <OpenModalButton />
    </ItemsProvider>
  );
}
