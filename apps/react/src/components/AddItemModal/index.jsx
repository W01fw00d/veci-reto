// @ts-check

import { useRef, useState } from 'react';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import Modal from '../ui/Modal';
import { useItemsContext } from '../../contexts/ItemsContext';

const MAX_ITEM_LENGTH = 1000;
const LABELS = {
  ADD: 'add',
  CANCEL: 'cancel',
  ADD_ITEM_TITLE: 'Add item to list',
  CANCEL_ADDING_ITEM: 'Cancel adding item',
  INPUT_PLACEHOLDER: 'Type the text here...',
  EMPTY_ITEM_ERROR: 'Item must be at least 1 character long',
  /** @param {number} maxLength */
  ITEM_TOO_LONG_ERROR: (maxLength) =>
    `Item must be no more than ${maxLength} characters long`,
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
  const { addItem } = useItemsContext();

  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(/** @type {HTMLInputElement | null} */(null));

  /** @param {import('react').FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();
    const itemText = text.trim();

    if (!itemText) {
      setError(LABELS.EMPTY_ITEM_ERROR);
      inputRef.current?.focus();
      return;
    }

    if (itemText.length > MAX_ITEM_LENGTH) {
      setError(LABELS.ITEM_TOO_LONG_ERROR(MAX_ITEM_LENGTH));
      inputRef.current?.focus();
      return;
    }

    addItem(itemText);
    onClose();
  }

  return (
    <Modal
      initialFocusRef={inputRef}
      labelledBy="add-item-title"
      onClose={onClose}
      panelClassName={modalPanelClasses}
    >
      <form onSubmit={handleSubmit}>
        <h2
          className="mb-5 text-[18px] leading-[22px] font-normal text-[#333333]"
          id="add-item-title"
        >
          {LABELS.ADD_ITEM_TITLE}
        </h2>
        <label className="sr-only" htmlFor="new-item">
          {LABELS.ADD_ITEM_TITLE}
        </label>
        <TextInput
          id="new-item"
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError('');
          }}
          placeholder={LABELS.INPUT_PLACEHOLDER}
          ref={inputRef}
          value={text}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-5">
          <Button
            aria-label={LABELS.ADD_ITEM_TITLE}
            className="uppercase px-7 max-sm:min-w-0 max-sm:flex-1"
            type="submit"
            variant="primary"
          >
            {LABELS.ADD}
          </Button>
          <Button
            aria-label={LABELS.CANCEL_ADDING_ITEM}
            className="uppercase min-w-[160px] px-6 max-sm:min-w-0 max-sm:flex-1"
            onClick={onClose}
            variant="secondary"
          >
            {LABELS.CANCEL}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddItemModal;
