import { css, html, LitElement, svg } from "lit";
import { ContextConsumer, ContextProvider } from "@lit/context";
import { clockContext } from "../context/clock-context";


const CLOCK_ICONS = {
  1: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 7v5" />
    <path d="M12 12l2 -3" />
  `,
  2: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l3 -2" />
    <path d="M12 7v5" />
  `,
  3: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12h3.5" />
    <path d="M12 7v5" />
  `,
  4: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l3 2" />
    <path d="M12 7v5" />
  `,
  5: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l2 3" />
    <path d="M12 7v5" /> 
  `,
  6: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12v3.5" />
    <path d="M12 7v5" />
  `,
  7: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l-2 3" />
    <path d="M12 7v5" />
  `,
  8: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l-3 2" />
    <path d="M12 7v5" />
  `,
  9: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12h-3.5" />
    <path d="M12 7v5" />
  `,
  10: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l-3 -2" />
    <path d="M12 7v5" />
  `,
  11: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l-2 -3" />
    <path d="M12 7v5" />
  `,
  12: () => svg`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 7v5" />
  `,
};

/**
 * @param {Date} date
 * */
const get12Hour = (date) => date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

export class DynamicClockIcon extends LitElement {

  static get properties() {
    return {
      currentHour: {
        state: true,
        type: Number,
      }
    }
  }

  static styles = css`
  :host {
    display: inline-block;
    color: black;
    height: min-content;
  }
  `;

  /**
   * @property
   * @private
   * @type {ContextProvider<typeof clockContext> | undefined}
   * */
  #clockConsumer;

  constructor() {
    super();
    this.currentHour = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#clockConsumer = new ContextConsumer(this, {
      context: clockContext,
      subscribe: true,
      callback: (value) => {
        if (!value) return;

        const date = new Date(value.currentDate);

        this.currentHour = get12Hour(date) || 12;
      }
    })
  }

  render() {
    const iconFn = CLOCK_ICONS[this.currentHour] || CLOCK_ICONS[12];
    return html`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-12">
      ${iconFn()}
    </svg>`;
  }
}

customElements.define("dynamic-clock-icon", DynamicClockIcon);
