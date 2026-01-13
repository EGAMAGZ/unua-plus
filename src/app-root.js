import "./components/app-scaffold";
import "./components/app-navbar";
import "./components/app-header";
import { html, LitElement } from "lit";
import { ClockController } from "./controllers/clock-controller";
import { provide } from "@lit/context";
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
            <app-scaffold>
                <app-header slot="header"></app-header>
                <h1>Example</h1>
                <app-navbar slot="navbar"></app-navbar>
            </app-scaffold>
        `;
    }
}

customElements.define("app-root", AppRoot);
