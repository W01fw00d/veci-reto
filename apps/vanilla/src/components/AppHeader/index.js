import './style.css';

const LABELS = {
  TITLE: 'This is a technical proof',
  DESCRIPTION:
    'Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.',
};

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="app-header">
        <h1>${LABELS.TITLE}</h1>
        <p>${LABELS.DESCRIPTION}</p>
      </header>
    `;
  }
}

if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}

export default AppHeader;
