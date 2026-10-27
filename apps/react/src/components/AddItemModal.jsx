import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './ui/Button.jsx';
import Input from './ui/Input.jsx';
import Modal from './ui/Modal.jsx';

function AddItemModal({ onAdd, onClose }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const itemText = text.trim();

    if (!itemText) {
      setError('Item must be at least 1 character long');
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
      panelClassName="max-w-[668px] shadow-[0_8px_24px_rgba(35,58,87,0.2)] sm:px-12"
    >
      <form onSubmit={handleSubmit}>
        <h2
          className="mb-4 text-[17px] font-normal text-[#666666]"
          id="add-item-title"
        >
          Add item to list
        </h2>
        <label className="sr-only" htmlFor="new-item">
          Add item to list
        </label>
        <Input
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
        <div className="mt-6 flex justify-end gap-3">
          <Button
            aria-label="Add item to list"
            className="px-7"
            type="submit"
            variant="primary"
          >
            ADD
          </Button>
          <Button
            aria-label="Cancel adding item"
            className="min-w-[122px] px-6"
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

AddItemModal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddItemModal;
