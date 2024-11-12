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
                }
                .copyright {
                    color: var(--color-text);
                    opacity: 0.8;
                }
            </style>
            <footer>
                <p class="copyright">© ${new Date().getFullYear()} PWA Template. All rights reserved.</p>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
