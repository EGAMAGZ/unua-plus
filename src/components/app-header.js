import { ContextConsumer } from "@lit/context";
import { html, LitElement } from "lit";
import { clockContext } from "../context/clock-context";

export class AppHeader extends LitElement {
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
        this.#clockConsumer = new ContextConsumer(this,{
            context: clockContext,
            subscribe: true,
            callback: (value) => {
                if(!value) return;

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
            <div>${this.time} ${this.greetingMessage}</div>
        `;
    }
}

customElements.define("app-header", AppHeader);
