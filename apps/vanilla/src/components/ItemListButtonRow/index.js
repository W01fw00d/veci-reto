import "./style.css";
import { createButton } from "../../ui/Button";
import { emit } from "../../utils/events.js";

const LABELS = {
  UNDO: "Undo last change",
  DELETE_SELECTED: "Delete selected items",
  OPEN_ADD: "Open add item form",
  ADD: "add",
  DELETE: "delete",
};

class ItemListButtonRow extends HTMLElement {
  connectedCallback() {
    this.className = "button-row";
    const undo = createButton({
      ariaLabel: LABELS.UNDO,
      className: "button-icon",
      disabled: true,
      html: '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="M3 2v6h6M3.51 15a9 9 0 1 0 .49-9.49L3 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>',
      variant: "icon",
    });
    const deleteButton = createButton({
      ariaLabel: LABELS.DELETE_SELECTED,
      className: "button-uppercase delete-button",
      disabled: true,
      text: LABELS.DELETE,
      variant: "secondary",
    });
    const addWrap = document.createElement("div");
    addWrap.className = "add-button-wrap";
    addWrap.append(
      createButton({
        ariaLabel: LABELS.OPEN_ADD,
        className: "button-uppercase",
        text: LABELS.ADD,
        variant: "primary",
      }),
    );
    this.replaceChildren(undo, deleteButton, addWrap);
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  handleClick = (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;

    if (button.getAttribute("aria-label") === LABELS.UNDO) {
      emit(this, "undo-items");
    } else if (button.getAttribute("aria-label") === LABELS.DELETE_SELECTED) {
      emit(this, "delete-selected-items");
    } else if (button.getAttribute("aria-label") === LABELS.OPEN_ADD) {
      emit(this, "open-add-item");
    }
  };

  updateAvailability({ canUndo, canDelete }) {
    this.querySelector(`[aria-label="${LABELS.UNDO}"]`).disabled = !canUndo;
    this.querySelector(`[aria-label="${LABELS.DELETE_SELECTED}"]`).disabled =
      !canDelete;
  }
}

if (!customElements.get("item-list-button-row")) {
  customElements.define("item-list-button-row", ItemListButtonRow);
}

export default ItemListButtonRow;
