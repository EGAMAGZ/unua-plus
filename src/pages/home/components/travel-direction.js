import { css, html, LitElement, svg } from "lit";
import "../../../components/ui/neo-card.js";
import "../../../components/ui/neo-input.js";
import "../../../components/ui/neo-button.js";

const REFRESH_ICON = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
</svg>
`

const DEFAULT_DESTINATION = {
  from: "Texcoco",
  to: "CDMX"
}

export class TravelDirection extends LitElement {
  static get properties() {
    return {
      destinationTo: {
        state: true,
        type: String,
      },
      destinationFrom: {
        state: true,
        type: String,
      }
    }
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: 1fr min-content;
      grid-template-rows: 1fr 1fr;
      gap: 0.5rem;
    }
    neo-input {
      grid-column: 1;
    }
    .direction-button {
      grid-column: 2;
      grid-row: 1 / -1;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        transition: transform 300ms ease; 
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  `;

  constructor() {
    super();
    this.loadDestinations();
  }

  loadDestinations() {
    this.destinationTo = sessionStorage.getItem("destination-to") || DEFAULT_DESTINATION.to;
    this.destinationFrom = sessionStorage.getItem("destination-from") || DEFAULT_DESTINATION.from;
  }

  /**
   *
   * @param {MouseEvent} event 
   * */
  handleClick(_event) {
    const tempFrom = this.destinationTo;
    this.destinationTo = this.destinationFrom;
    this.destinationFrom = tempFrom;

    this.shadowRoot.querySelector("neo-button > svg").classList.toggle("rotate")
  }

  render() {
    return html`
      <neo-card variant="primary" elevated>
        <span slot="title">Destination</span>
        <div class="container">
            <neo-input label="From" .value=${this.destinationFrom} readonly></neo-input>
            <neo-input label="To" .value=${this.destinationTo} readonly></neo-input>
            <neo-button @click=${this.handleClick} variant="neutral" class="direction-button">
              ${REFRESH_ICON}
            </neo-button>
        </div>
      </neo-card>
    `;
  }
}

customElements.define("travel-direction", TravelDirection);
