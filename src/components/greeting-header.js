import { ContextConsumer } from "@lit/context";
import { css, html, LitElement } from "lit";
import { clockContext } from "../context/clock-context";
import "../components/dynamic-clock-icon.js";

export class AppHeader extends LitElement {
  static styles = css`
    :host {
        padding: 0 0.5rem;
        margin-bottom: 2.5rem;
    }
    .header{
        padding: 1.25rem 0.75rem 0.375rem 0.75rem;
        display: flex;
        flex-direction: column;

        & .time {
            font-size: 1rem;
            line-height: 1rem;
            margin-left: 0.5rem;
            color: black;
        }

        & .greeting {
            font-size: 1.75rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: black;
        }
    }
    .clock-container {
      display: flex;
      align-items: center;
    }
    
    .clock-container dynamic-clock-icon {
      display: flex;
      align-items: center;
    }
`;

  static get properties() {
    return {
      greetingMessage: {
        state: true,
        type: String,
      },
      time: {
        state: true,
        type: String,
      },
    };
  }

  /**
   * @property
   * @private
   * @type {ContextConsumer<typeof clockContext> | undefined}
   */
  #clockConsumer;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#clockConsumer = new ContextConsumer(this, {
      context: clockContext,
      subscribe: true,
      callback: (value) => {
        if (!value) return;

        const { greeting, time } = value;
        this.greetingMessage = greeting;
        this.time = time;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clockConsumer?.disconnect();
  }

  render() {
    return html`
        <div class="header">
            <span class="greeting">${this.greetingMessage}</span>
            <div class="clock-container">
              <dynamic-clock-icon></dynamic-clock-icon>
              <span class="time">${this.time}</span>
            </div>
        </div>
        `;
  }
}

customElements.define("greeting-header", AppHeader);
