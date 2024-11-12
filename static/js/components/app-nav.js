class AppNav extends HTMLElement {
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
                nav {
                    background: var(--color-primary);
                    padding: var(--spacing-md);
                }
                ul {
                    list-style: none;
                    display: flex;
                    gap: var(--spacing-md);
                    max-width: 1200px;
                    margin: 0 auto;
                }
                a {
                    color: white;
                    text-decoration: none;
                    padding: var(--spacing-sm);
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                a:hover {
                    background-color: rgba(255,255,255,0.1);
                }
                @media (max-width: 768px) {
                    ul {
                        flex-direction: column;
                    }
                }
            </style>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        `;
    }
}

customElements.define('app-nav', AppNav);
