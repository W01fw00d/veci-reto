import "./style.css";

class UiTextInput extends HTMLElement {
  static observedAttributes = [
    "aria-label",
    "input-id",
    "placeholder",
    "type",
    "name",
  ];

  connectedCallback() {
    if (this.input) return;
    this.input = document.createElement("input");
    this.input.className = "text-input";
    for (const name of UiTextInput.observedAttributes) {
      if (this.hasAttribute(name)) {
        const inputAttribute = name === "input-id" ? "id" : name;
        this.input.setAttribute(inputAttribute, this.getAttribute(name));
      }
    }
    this.append(this.input);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.input) return;
    const inputAttribute = name === "input-id" ? "id" : name;
    if (newValue === null) this.input.removeAttribute(inputAttribute);
    else this.input.setAttribute(inputAttribute, newValue);
  }

  get value() {
    return this.input?.value ?? "";
  }

  set value(value) {
    if (this.input) this.input.value = value;
  }

  focus() {
    this.input?.focus();
  }
}

if (!customElements.get("ui-text-input")) {
  customElements.define("ui-text-input", UiTextInput);
}
