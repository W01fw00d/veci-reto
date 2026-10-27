import { useState } from 'react';
import Modal from '.';

export function Default() {
  const [closeCount, setCloseCount] = useState(0);

  return (
    <>
      <Modal
        labelledBy="story-modal-title"
        onClose={() => setCloseCount((count) => count + 1)}
      >
        <h2 id="story-modal-title">Example dialog</h2>
        <button type="button">Dialog content</button>
      </Modal>
      <input data-testid="close-count" readOnly value={String(closeCount)} />
    </>
  );
}
