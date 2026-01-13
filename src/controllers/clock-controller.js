import { Controller } from "./controller";

export class ClockController extends Controller {
    /**
     * @property
     * @public
     * @type {Date}
     */
    value = new Date();

    /**
     * @property
     * @private
     * @type {number}
     */
    #timeout;

    /**
     * @property
     * @private
     * @type {number}
     */
    #timerId;

    /**
     * @constructor
     * @param {import("lit").ReactiveControllerHost} host
     * @param {number} [timeout=1_000]
     */
    constructor(host, timeout = 1_000) {
        super(host);
        this.#timeout = timeout;
    }

    hostConnected() {
        this.#timerId = setInterval(() => {
            this.value = new Date();
            this._host.requestUpdate();
        }, this.#timeout);
    }

    hostDisconnected() {
        clearInterval(this.#timerId);
        this.#timerId = undefined;
    }
}
