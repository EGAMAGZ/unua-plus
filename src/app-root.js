import "./components/app-scaffold";
import "./components/app-navbar";
import "./components/app-header";
import { html, LitElement } from "lit";

export class AppRoot extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`
        <app-scaffold>
        <app-header slot="header"></app-header>
        <h1>Example</h1>
        <app-navbar slot="navbar"></app-navbar>
        </app-scaffold>
        `
    }
}

customElements.define("app-root", AppRoot)