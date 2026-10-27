import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel.jsx';

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
  }, [initialFocusRef, onClose]);

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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  initialFocusRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  labelledBy: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  panelClassName: PropTypes.string,
};

export default Modal;
