import { consume, ContextConsumer } from "@lit/context";
import { html, LitElement } from "lit";
import { clockContext } from "../context/clock-context";

export class AppHeader extends LitElement {
    DEFAULT_TIME_REFRESHING = 1_000;

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


    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        const data = new ContextConsumer(this,{
            context: clockContext,
            subscribe: true,
            callback: (value) => {
                const { greeting, time } = value;
                this.greetingMessage = greeting;
                this.time = time;

                console.log("AppHeader context updated:", value);
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div>${this.time} ${this.greetingMessage}</div>
        `;
    }
}

customElements.define("app-header", AppHeader);
