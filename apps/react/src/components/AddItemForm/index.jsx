// @ts-check

import { useState } from 'react';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
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

/**
 * @typedef {{
 *   inputRef: import('react').RefObject<HTMLInputElement | null>,
 *   onClose: () => void
 * }} AddItemFormProps
 */

/** @param {AddItemFormProps} props */
function AddItemForm({ inputRef, onClose }) {
  const { addItem } = useItemsContext();

  const [text, setText] = useState('');
  const [error, setError] = useState('');

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
    <form onSubmit={handleSubmit}>
      <TextInput
        aria-labelledby="add-item-title"
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
  );
}

export default AddItemForm;
