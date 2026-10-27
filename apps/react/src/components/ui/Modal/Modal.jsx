// @ts-check

import { useEffect } from 'react';
import Panel from '../Panel/Panel.jsx';

/**
 * @typedef {{
 *   children: import('react').ReactNode,
 *   initialFocusRef?: import('react').RefObject<HTMLInputElement | null>,
 *   labelledBy: string,
 *   onClose: () => void,
 *   panelClassName?: string
 * }} ModalProps
 */

/** @param {ModalProps} props */
function Modal({
  children,
  initialFocusRef,
  labelledBy,
  onClose,
  panelClassName = '',
}) {
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    initialFocusRef?.current?.focus();

    /** @param {KeyboardEvent} event */
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [initialFocusRef, onClose]);

  /** @param {import('react').MouseEvent<HTMLDivElement>} event */
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
      <Panel
        aria-labelledby={labelledBy}
        aria-modal="true"
        className={panelClassName}
        role="dialog"
      >
        {children}
      </Panel>
    </div>
  );
}

export default Modal;
