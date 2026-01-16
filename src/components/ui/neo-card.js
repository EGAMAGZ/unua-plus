import { css, html, LitElement, nothing } from "lit";
import { hasSlotContent } from "../../util/html";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
/**
 * @typedef {"neutral" | "primary" | "secondary" | "accent"} CardVariant
 */

/**
 * Custom card with neoubrutalism design
 *
 * @extends {LitElement}
 * @slot
 */
export class NeoCard extends LitElement {
  static get properties() {
    return {
      variant: {
        attribute: true,
        type: String,
      },
      slotsWithContent: {
        state: true,
        type: Object,
      },
      elevated: {
        attribute: true,
        type: Boolean,
      }
    };
  }

  static styles = css`
        :host {
            --card-background-primary: var(--color-primary);
            --card-background-neutral: var(--color-background);
            --card-background-secondary: var(--color-secondary);
            --card-background-accent: var(--color-accent);

            /* Overrides css properties */
            --neo-box-shadow-length: 0.25rem;
            --neo-box-shadow: var(--neo-border-color) var(--neo-box-shadow-length) var(
                --neo-box-shadow-length
            );
        }
        .card {
            border: var(--neo-border);
            border-radius: var(--neo-border-radius);

            padding: 1.5rem;
            &.elevated {
                box-shadow: var(--neo-box-shadow);
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
            &.accent {
                background-color: var(--card-background-accent);
                color: white;
            }
            & .card-title {
                font-weight: 600;
                font-size: 1.5rem;
                text-wrap: balance;
                margin-bottom: 0.5rem;
            }
            & .card-footer {
                margin-top: 0.75rem;
                border-top: 0.25rem solid black;
                padding-top: 0.75rem;
            }
        }
    `;

  constructor() {
    super();
    /**
     * @type {CardVariant}
     */
    this.variant = "neutral";
    this.slotsWithContent = {};
  }

  /**
   * @method
   * @private
   * @param {Event} event
   */
  #handleSlotChange(event) {
    const slotName = event.target.name;
    const hasContent = hasSlotContent(this, slotName);

    this.slotsWithContent = {
      ...this.slotsWithContent,
      [slotName]: hasContent,
    };
  }

  render() {
    const cardClasses = {
      card: true,
      [this.variant]: true,
      elevated: this.elevated,
    };

    return html`
            <div class="${classMap(cardClasses)}">
                ${when(this.slotsWithContent.title, () => html`
                        <div class="card-title">
                            <slot name="title"></slot>
                        </div>
                    `, () => html`
                        <slot 
                          name="title" 
                          @slotchange="${this.#handleSlotChange}">
                        </slot>
                    `)}

                <div class="card-body">
                    <slot></slot>
                </div>

                ${when(this.slotsWithContent.footer, () => html`
                        <div class="card-footer">
                            <slot name="footer"></slot>
                        </div>
                    `, () => html`
                        <slot 
                          name="footer" 
                          @slotchange="${this.#handleSlotChange}">
                        </slot>
                    `)}
            </div>
        `;
  }
}

customElements.define("neo-card", NeoCard);
