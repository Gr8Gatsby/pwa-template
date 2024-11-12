class AppFooter extends HTMLElement {
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
                footer {
                    background: var(--color-surface);
                    padding: var(--spacing-md);
                    text-align: center;
                    border-top: 1px solid var(--color-border);
                }
                .copyright {
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;
                }
                @media (max-width: 768px) {
                    footer {
                        padding: var(--spacing-sm);
                    }
                    .copyright {
                        font-size: 0.75rem;
                    }
                }
            </style>
            <footer>
                <p class="copyright">© ${new Date().getFullYear()} PWA Template</p>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
