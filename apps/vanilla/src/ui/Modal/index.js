import './style.css';
import { emit } from '../../utils/events.js';

class UiModal extends HTMLElement {
  static observedAttributes = ['labelledby'];

  connectedCallback() {
    if (this.dialog) return;
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';
    this.dialog = document.createElement('section');
    this.dialog.className = 'modal-panel';
    this.dialog.setAttribute('role', 'dialog');
    this.dialog.setAttribute('aria-modal', 'true');
    this.dialog.setAttribute('part', 'dialog');
    const labelledBy = this.getAttribute('labelledby');
    if (labelledBy) this.dialog.setAttribute('aria-labelledby', labelledBy);
    this.dialog.append(...this.childNodes);
    this.backdrop.append(this.dialog);
    this.append(this.backdrop);
    this.previouslyFocused = document.activeElement;
    this.addEventListener('click', this.handleClick);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.previouslyFocused instanceof HTMLElement) {
      this.previouslyFocused.focus();
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.dialog) return;
    if (newValue === null) this.dialog.removeAttribute('aria-labelledby');
    else this.dialog.setAttribute('aria-labelledby', newValue);
  }

  handleClick = (event) => {
    if (event.target === this.backdrop) emit(this, 'modal-dismiss');
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') emit(this, 'modal-dismiss');
  };
}

if (!customElements.get('ui-modal')) {
  customElements.define('ui-modal', UiModal);
}
