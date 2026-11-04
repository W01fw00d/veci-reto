import "./style.css";
import "../../ui/Button";
import "../../ui/Modal";
import "../../ui/TextInput";
import { emit } from "../../utils/events.js";

const MAX_ITEM_LENGTH = 1000;
const LABELS = {
  ADD: "add",
  CANCEL: "cancel",
  ADD_ITEM_TITLE: "Add item to list",
  CANCEL_ADDING_ITEM: "Cancel adding item",
  INPUT_PLACEHOLDER: "Type the text here...",
  EMPTY_ITEM_ERROR: "Item must be at least 1 character long",
  ITEM_TOO_LONG_ERROR: (maxLength) =>
    `Item must be no more than ${maxLength} characters long`,
};

class AddItemModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ui-modal labelledby="add-item-title">
        <form class="add-item-form" novalidate>
          <h2 id="add-item-title">${LABELS.ADD_ITEM_TITLE}</h2>
          <label class="visually-hidden" for="new-item">${LABELS.ADD_ITEM_TITLE}</label>
          <ui-text-input aria-label="${LABELS.ADD_ITEM_TITLE}" input-id="new-item" name="item" placeholder="${LABELS.INPUT_PLACEHOLDER}" type="text"></ui-text-input>
          <p class="validation-error" role="alert" hidden></p>
          <div class="modal-actions">
            <button aria-label="${LABELS.ADD_ITEM_TITLE}" class="button button-uppercase button-primary modal-submit"
              type="submit">${LABELS.ADD}</button>
            <button aria-label="${LABELS.CANCEL_ADDING_ITEM}" class="button button-uppercase button-secondary modal-cancel"
              type="button">${LABELS.CANCEL}</button>
          </div>
        </form>
      </ui-modal>
    `;

    this.querySelector("ui-modal").classList.add("add-item-modal");
    this.input = this.querySelector("ui-text-input");
    this.error = this.querySelector('[role="alert"]');
    this.addEventListener("submit", this.handleSubmit);
    this.addEventListener("input", this.clearError);
    this.addEventListener("click", this.handleClick);
    this.addEventListener("modal-dismiss", this.handleDismiss);
    this.input.focus();
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.handleSubmit);
    this.removeEventListener("input", this.clearError);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("modal-dismiss", this.handleDismiss);
  }

  clearError = () => {
    this.error.hidden = true;
    this.error.textContent = "";
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const text = this.input.value.trim();

    if (!text) {
      this.showError(LABELS.EMPTY_ITEM_ERROR);
      return;
    }
    if (text.length > MAX_ITEM_LENGTH) {
      this.showError(
        LABELS.ITEM_TOO_LONG_ERROR(MAX_ITEM_LENGTH),
      );
      return;
    }

    emit(this, "item-added", text);
    emit(this, "modal-close");
  };

  showError(message) {
    this.error.textContent = message;
    this.error.hidden = false;
    this.input.focus();
  }

  handleClick = (event) => {
    if (event.target.closest(".modal-cancel")) emit(this, "modal-close");
  };

  handleDismiss = () => emit(this, "modal-close");
}

if (!customElements.get("add-item-modal")) {
  customElements.define("add-item-modal", AddItemModal);
}

export default AddItemModal;
