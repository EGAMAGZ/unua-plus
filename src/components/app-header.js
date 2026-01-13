import { html, LitElement } from "lit";

export class AppHeader extends LitElement {
    DEFAULT_TIME_REFRESHING = 1_000;

    static get properties() {
        return {
            _greetingMessage: {
                state: true,
                type: String,
            },
            _time: {
                state: true,
                type: String,
            },
        };
    }

    #updateTimeInterval;

    constructor() {
        super();

        this.time = this.currentTime;
    }

    get currentTime() {
        const date = new Date();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    get greeting(){
    }

    #updateTime() {
        this.time = this.currentTime;
    }

    connectedCallback() {
        super.connectedCallback();
        this.#updateTimeInterval = setInterval(
            () => this.#updateTime(),
            this.DEFAULT_TIME_REFRESHING,
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.#updateTimeInterval);
    }

    render() {
        return html`
            <div>${this.time}</div>
        `;
    }
}

customElements.define("app-header", AppHeader);
