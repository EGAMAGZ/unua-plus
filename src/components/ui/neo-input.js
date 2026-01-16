import { css, html, LitElement, nothing } from "lit";

export class NeoInput extends LitElement {
  static get properties() {
    return {
      value: {
        type: String,
      },
      label: {
        type: String,
        reflect: true,
      },
      placeholder: {
        type: String,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      readonly: {
        type: Boolean,
        reflect: true,
      },
      type: {
        type: String,
      },
    };
  }

  static styles = css`
      :host {
        width:100%;
        display: block;

        /* Overrides */
        --neo-border-size: 0.125rem;
        --neo-border: var(--neo-border-size) solid black;
      }
      label {
        font-weight: 600;
        font-size: 1rem;
        margin-left: 0.5rem;
      }

      input {
        all: unset;
        background-color: white;
        color: black;
        border-radius: var(--neo-border-radius);
        padding: 0.5rem;
        box-sizing: border-box;
        border: var(--neo-border);
        width: 100%;

        &::placeholder {
          color: slategray;
        }
      }
    `;

  constructor() {
    super();

    this.label = "";
    this.placeholder = "";
    this.disabled = false;
    this.readonly = false;
    this._id = `input-${crypto.randomUUID()}`
    this.value = "";
  }

  /**
   * @private
   * @method
   * @param {InputEvent} event
   */
  #onInput(event) {
    this.value = event.target.value;

    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * @public
   * @method
   */
  focus() {
    this.renderRoot.querySelector("input").focus();
  }

  render() {
    return html`
          ${this.label ? html`<label for=${this._id}>${this.label}</label>` : nothing}
          <input 
              id=${this._id}
              .type=${this.type}
              placeholder=${this.placeholder}
              .value=${this.value}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @input=${this.#onInput}
          />
        `;
  }
}

customElements.define("neo-input", NeoInput);
