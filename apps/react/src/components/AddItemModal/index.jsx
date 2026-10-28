// @ts-check

import { useRef, useState } from 'react';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import Modal from '../ui/Modal';

const MAX_ITEM_LENGTH = 1000;

/**
 * @typedef {{
 *   onAdd: (text: string) => void,
 *   onClose: () => void
 * }} AddItemModalProps
 */

/** @param {AddItemModalProps} props */
function AddItemModal({ onAdd, onClose }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(/** @type {HTMLInputElement | null} */(null));

  /** @param {import('react').FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();
    const itemText = text.trim();

    if (!itemText) {
      setError('Item must be at least 1 character long');
      inputRef.current?.focus();
      return;
    }

    if (itemText.length > MAX_ITEM_LENGTH) {
      setError(`Item must be no more than ${MAX_ITEM_LENGTH} characters long`);
      inputRef.current?.focus();
      return;
    }

    onAdd(itemText);
    onClose();
  }

  return (
    <Modal
      initialFocusRef={inputRef}
      labelledBy="add-item-title"
      onClose={onClose}
      panelClassName="box-border h-[276px] w-full max-w-[700px] rounded-[20px] p-[50px] pb-[44px] shadow-[0_10px_24px_#0000001f] max-sm:h-auto max-sm:min-h-[276px] max-sm:p-8 max-sm:px-6"
    >
      <form onSubmit={handleSubmit}>
        <h2
          className="mb-5 text-[18px] leading-[22px] font-normal text-[#333333]"
          id="add-item-title"
        >
          Add item to list
        </h2>
        <label className="sr-only" htmlFor="new-item">
          Add item to list
        </label>
        <TextInput
          id="new-item"
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError('');
          }}
          placeholder="Type the text here..."
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
            aria-label="Add item to list"
            className="px-7 max-sm:min-w-0 max-sm:flex-1"
            type="submit"
            variant="primary"
          >
            ADD
          </Button>
          <Button
            aria-label="Cancel adding item"
            className="min-w-[160px] px-6 max-sm:min-w-0 max-sm:flex-1"
            onClick={onClose}
            variant="secondary"
          >
            CANCEL
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddItemModal;
