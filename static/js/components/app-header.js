class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--color-surface);
                    padding: var(--spacing-md);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--color-primary);
                }
            </style>
            <header class="header">
                <div class="logo">PWA Template</div>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);
