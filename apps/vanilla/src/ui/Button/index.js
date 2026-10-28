import './style.css';

const variants = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  icon: 'button-icon',
  listOption: 'list-option',
};

export function createButton({
  ariaLabel,
  className = '',
  disabled = false,
  html,
  text = '',
  type = 'button',
  variant = 'primary',
} = {}) {
  const button = document.createElement('button');
  button.className = `button ${variants[variant] ?? variants.primary} ${className}`.trim();
  button.type = type;
  button.disabled = disabled;
  if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
  if (html !== undefined) button.innerHTML = html;
  else button.textContent = text;
  return button;
}

class UiButton extends HTMLElement {
  static observedAttributes = ['aria-label', 'disabled', 'type', 'variant'];

  connectedCallback() {
    if (this.button) return;
    const text = this.textContent;
    this.button = createButton({
      ariaLabel: this.getAttribute('aria-label'),
      className: this.getAttribute('class') ?? '',
      disabled: this.hasAttribute('disabled'),
      text,
      type: this.getAttribute('type') ?? 'button',
      variant: this.getAttribute('variant') ?? 'primary',
    });
    this.button.removeAttribute('class');
    this.button.classList.add('button');
    this.button.classList.add(...(variants[this.getAttribute('variant')] ?? variants.primary).split(' '));
    if (this.hasAttribute('class')) this.button.classList.add(...this.className.split(/\s+/).filter(Boolean));
    this.replaceChildren(this.button);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.button) return;
    if (name === 'aria-label') {
      if (newValue === null) this.button.removeAttribute(name);
      else this.button.setAttribute(name, newValue);
    } else if (name === 'disabled') {
      this.button.disabled = newValue !== null;
    } else if (name === 'type') {
      this.button.type = newValue ?? 'button';
    } else if (name === 'variant') {
      Object.values(variants).forEach((className) => this.button.classList.remove(className));
      this.button.classList.add(...(variants[newValue] ?? variants.primary).split(' '));
    }
  }
}

if (!customElements.get('ui-button')) {
  customElements.define('ui-button', UiButton);
}
