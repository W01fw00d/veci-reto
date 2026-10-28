import './style.css';

class UiTextInput extends HTMLElement {
  static observedAttributes = ['aria-label', 'id', 'placeholder', 'type', 'name'];

  connectedCallback() {
    if (this.input) return;
    this.input = document.createElement('input');
    this.input.className = 'text-input';
    for (const name of UiTextInput.observedAttributes) {
      if (this.hasAttribute(name)) this.input.setAttribute(name, this.getAttribute(name));
    }
    this.append(this.input);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.input) return;
    if (newValue === null) this.input.removeAttribute(name);
    else this.input.setAttribute(name, newValue);
  }

  get value() {
    return this.input?.value ?? '';
  }

  set value(value) {
    if (this.input) this.input.value = value;
  }

  focus() {
    this.input?.focus();
  }
}

if (!customElements.get('ui-text-input')) {
  customElements.define('ui-text-input', UiTextInput);
}
