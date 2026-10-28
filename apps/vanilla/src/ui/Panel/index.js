import './style.css';

class UiPanel extends HTMLElement {
  connectedCallback() {
    if (this.panel) return;
    this.panel = document.createElement('section');
    this.panel.className = 'app-panel';
    this.panel.setAttribute('part', 'panel');
    if (this.hasAttribute('role')) {
      this.panel.setAttribute('role', this.getAttribute('role'));
    }
    if (this.hasAttribute('aria-label')) {
      this.panel.setAttribute('aria-label', this.getAttribute('aria-label'));
    }
    this.panel.append(...this.childNodes);
    this.append(this.panel);
  }

  static observedAttributes = ['aria-label', 'role'];

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.panel) return;
    if (newValue === null) this.panel.removeAttribute(name);
    else this.panel.setAttribute(name, newValue);
  }
}

if (!customElements.get('ui-panel')) {
  customElements.define('ui-panel', UiPanel);
}
