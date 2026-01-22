import { LitElement, css, html } from "lit";

export class AppScaffold extends LitElement {

  constructor() {
    super();
  }

  static styles = css`
    .scaffold {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .content {
        flex-grow: 1;
    }
    `
  render() {
    return html`
        <div class="scaffold">
            <slot name="header">
            </slot>
            <div class="content">
                <slot></slot>
            </div>
            <slot name="navbar"></slot>
        </div>
        `
  }
}

customElements.define("app-scaffold", AppScaffold)
