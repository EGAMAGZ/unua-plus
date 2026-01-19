import { Controller } from "./controller";

/**
 * @typedef {{ greeting: string, time: string, currentDate: Date }} ClockData
 * */

export class ClockController extends Controller {

  /**
   * @property
   * @private
   * @type {string}
   * @default ""
   */
  #greeting = "";

  /**
   * @property
   * @private
   * @type {string}
   * @default ""
   */
  #time = "";

  /**
   * @property
   * @private
   * @type {number}
   */
  #timeout;

  /**
   * @property
   * @private
   * @type {Date}
   * */
  #currentDate = "";

  /**
   * @property
   * @private
   * @type {number | undefined}
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
    this.#currentDate = new Date();
  }

  #updateTime() {
    const now = new Date();
    const hours = now
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = now
      .getMinutes()
      .toString()
      .padStart(2, "0");

    this.#time = `${hours}:${minutes}`;
    this.#greeting = this.#getGreeting(now.getHours());
    this.#currentDate = new Date();

    this._host.requestUpdate();
  }

  #getGreeting(hour) {
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else if (hour < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  get greeting() {
    return this.#greeting;
  }

  get time() {
    return this.#time;
  }

  /**
   *
   * @returns {ClockData}
   * */
  get data() {
    return {
      greeting: this.#greeting,
      time: this.#time,
      currentDate: this.#currentDate,
    };
  }

  hostConnected() {
    this.#updateTime();

    this.#timerId = setInterval(() => this.#updateTime(), this.#timeout);
  }

  hostDisconnected() {
    if (this.#timerId) {

      clearInterval(this.#timerId);
      this.#timerId = undefined;
    }
  }
}
