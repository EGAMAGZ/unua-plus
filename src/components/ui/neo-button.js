import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

/**
 * @typedef {"neutral" | "primary" | "secondary" | "accent"} ButtonVariant
 * */

/**
 * @extends {LitElement}
 * @slot
 * */
export class NeoButton extends LitElement {
  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true,
      },
      type: {
        type: String
      },
      variant: {
        type: String,
      },
    }
  }

  static styles = css`
    button{
      box-sizing: border-box;
      border: var(--neo-border);
      box-shadow: var(--neo-box-shadow);
      padding: 0.75rem 1rem;
      border-radius: var(--neo-border-radius);
      cursor: pointer;
      transition: translate 200ms box-shadow 200ms;

      &:is(:active, :focus, :hover){
        translate: var(--neo-border-size) var(--neo-border-size);
        box-shadow: var(--neo-border-color) 0 0;
      }
      
      &.primary {
          background-color: var(--card-background-primary);
          color: white;
      }
      &.neutral {
          color: black;
          background-color: var(--card-background-neutral);
      }
      &.secondary {
          background-color: var(--card-background-secondary);
          color: white;
      }
    }
  `;

  constructor() {
    super();
    this.variant = "neutral";
    this.disabled = false;
  }

  render() {
    const buttonClasses = {
      [this.variant]: true,
    }

    return html`
    <button class=${classMap(buttonClasses)} .type=${this.type} ?disabled=${this.disabled}>
        <slot>
    </button>
    `;
  }
}

customElements.define("neo-button", NeoButton);
