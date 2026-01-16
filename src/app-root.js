import "./pages/home/page-home.js";

import { html, LitElement, css } from "lit";
import { ClockController } from "./controllers/clock-controller";
import { clockContext } from "./context/clock-context";
import { ContextProvider } from "@lit/context";

export class AppRoot extends LitElement {
  /**
   * @property
   * @private
   * @type {ClockController}
   */
  #clock = new ClockController(this);

  /**
   * @property
   * @protected
   * @type {ContextProvider<typeof clockContext>}
   */
  _provider;

  constructor() {
    super();
    this._provider = new ContextProvider(this, {
      context: clockContext,
      value: this.#clock.data,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._provider.setValue(this.#clock.data);
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this._provider.setValue(this.#clock.data);
  }

  render() {
    return html`
      <page-home></page-home>
        `;
  }
}

customElements.define("app-root", AppRoot);
