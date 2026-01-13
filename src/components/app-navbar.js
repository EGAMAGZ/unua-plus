import { LitElement, css, html } from "lit"

export class AppNavbar extends LitElement {
    static styles = css``;

    static properties = {
        menuIndex: {
            attribute: false,
            state: true,
        }
    }
    constructor(){
        super();

        this.menuIndex = 0;
    }

    render(){
        return html`<div>Navbar</div>`;
    }
}

customElements.define("app-navbar", AppNavbar)