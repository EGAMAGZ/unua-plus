import "../../components/app-scaffold";
import "../../components/app-navbar";
import "../../components/greeting-header";
import "./components/travel-direction";

import { html, LitElement, css } from "lit";

export class PageHome extends LitElement {

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

  /**
   * @param {CustomEvent<import("./components/travel-direction").DestinationData>} event 
   * */
  handleDestinationChange(event) {
    console.log(event.detail)
  }

  render() {
    return html`
            <app-scaffold>
                <greeting-header slot="header"></greeting-header>
                <div class="container">
                  <travel-direction @destinationChange=${this.handleDestinationChange}></travel-direction>
                </div>
                <app-navbar slot="navbar"></app-navbar>
            </app-scaffold>
        `;
  }
}

customElements.define("page-home", PageHome);
