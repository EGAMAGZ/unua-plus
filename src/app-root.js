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
    #clock = new ClockController(this, 10_000);

    static get properties() {
        return {
            clockData: {
                type: Object,
            },
        };
    }

    provider = new ContextProvider(this, {
        context: clockContext,
        value: this.#clock.data,
    });

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        this.provider.setValue(this.#clock.data);
    }

    willUpdate(changedProperties) {
        super.willUpdate && super.willUpdate(changedProperties);
        this.provider.setValue(this.#clock.data);
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
