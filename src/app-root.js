import "./components/app-scaffold";
import "./components/app-navbar";
import "./components/greeting-header";
import "./pages/home/components/travel-direction";

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

  static styles = css`
    .container {
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    @media (min-width: 576px) {
        .container {
            max-width: 33.75rem;
        }
    }

    @media (min-width: 768px) {
        .container {
            max-width: 45rem;
        }
    }

    @media (min-width: 992px) {
        .container {
            max-width: 60rem;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 71.25rem;
        }
    }

    @media (min-width: 1400px) {
        .container {
            max-width: 1320px;
        }
    }`;

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
            <app-scaffold>
                <greeting-header slot="header"></greeting-header>
                <div class="container">
                  <travel-direction></travel-direction>
                </div>
                <app-navbar slot="navbar"></app-navbar>
            </app-scaffold>
        `;
  }
}

customElements.define("app-root", AppRoot);
