import { useEffect, useRef, useState } from 'react';

function AddItemModal({ onAdd, onClose }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    inputRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    const itemText = text.trim();

    if (!itemText) {
      setError('Write something before adding it.');
      inputRef.current?.focus();
      return;
    }

    onAdd(itemText);
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto bg-black/15 px-4 pt-[6vh] pb-8"
      onMouseDown={handleBackdropClick}
    >
      <section
        aria-labelledby="add-item-title"
        aria-modal="true"
        className="w-full max-w-[668px] rounded-2xl bg-white px-6 py-8 shadow-[0_8px_24px_rgba(35,58,87,0.2)] sm:px-12 sm:py-11"
        role="dialog"
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
          <input
            className="h-[58px] w-full border border-[#dedede] bg-[#f7f7f7] px-4 text-base text-[#333333] outline-none transition placeholder:text-[#b5b5b5] focus:border-[#4650ff] focus:ring-2 focus:ring-[#4650ff]/20"
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
            <button
              className="h-12 min-w-[132px] rounded-full bg-[#394cff] px-7 text-sm font-medium text-white transition hover:bg-[#293ce8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff]"
              type="submit"
            >
              ADD
            </button>
            <button
              className="h-12 min-w-[122px] rounded-full border-2 border-[#a8b2ff] px-6 text-sm font-medium text-[#7184ff] transition hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff]"
              onClick={onClose}
              type="button"
            >
              CANCEL
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddItemModal;
