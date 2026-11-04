// @ts-check

import { useRef } from 'react';
import Modal from '../ui/Modal';
import AddItemForm from '../AddItemForm';

const LABELS = {
  ADD_ITEM_TITLE: 'Add item to list',
};
const modalPanelClasses = [
  'box-border h-[276px] w-full max-w-[700px]',
  'rounded-[20px] p-[50px] pb-[44px]',
  'shadow-[0_10px_24px_#0000001f]',
  'max-sm:h-auto max-sm:min-h-[276px] max-sm:p-8 max-sm:px-6',
].join(' ');

/**
 * @typedef {{onClose: () => void}} AddItemModalProps
 */

/** @param {AddItemModalProps} props */
function AddItemModal({ onClose }) {
  const inputRef = useRef(/** @type {HTMLInputElement | null} */(null));

  return (
    <Modal
      initialFocusRef={inputRef}
      labelledBy="add-item-title"
      onClose={onClose}
      panelClassName={modalPanelClasses}
    >
      <h2
        className="mb-5 text-[18px] leading-[22px] font-normal text-[#333333]"
        id="add-item-title"
      >
        {LABELS.ADD_ITEM_TITLE}
      </h2>
      <AddItemForm inputRef={inputRef} onClose={onClose} />
    </Modal>
  );
}

export default AddItemModal;
