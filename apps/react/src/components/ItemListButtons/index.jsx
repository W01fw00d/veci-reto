// @ts-check

import OpenModalButton from '../OpenModalButton';
import ItemListButtonsActions from '../ItemListButtonsActions';

function ItemListButtons() {
  return (
    <div className="mt-[19px] flex items-center gap-5 max-sm:flex-wrap">
      <ItemListButtonsActions />
      <OpenModalButton />
    </div>
  );
}

export default ItemListButtons;
