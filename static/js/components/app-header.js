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
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: var(--spacing-md);
                }
                .logo {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--color-text);
                    text-decoration: none;
                }
                @media (max-width: 768px) {
                    .header {
                        padding: var(--spacing-sm);
                    }
                }
            </style>
            <header class="header">
                <a href="/" class="logo">PWA Template</a>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);
