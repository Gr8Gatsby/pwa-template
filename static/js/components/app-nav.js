class AppNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isMenuOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const hamburger = this.shadowRoot.querySelector('.hamburger');
        const nav = this.shadowRoot.querySelector('.nav-menu');

        hamburger?.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            hamburger.classList.toggle('active');
            nav.classList.toggle('hidden');
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                nav {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: var(--blur-effect);
                    -webkit-backdrop-filter: var(--blur-effect);
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--color-border);
                }
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                }
                /* Hamburger Menu Styles */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 30px;
                    height: 25px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    position: relative;
                    z-index: 1000;
                }
                .hamburger span {
                    width: 30px;
                    height: 2px;
                    background: var(--color-text);
                    border-radius: 1px;
                    transition: all var(--transition-base);
                }
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -7px);
                }
                /* Navigation Menu */
                .nav-menu {
                    display: flex;
                    gap: var(--spacing-md);
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    transform: translateX(0);
                    transition: transform var(--transition-base);
                }
                a {
                    color: var(--color-text);
                    text-decoration: none;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: 8px;
                    transition: all var(--transition-base);
                    font-size: 1rem;
                    display: block;
                }
                a:hover {
                    background-color: var(--color-surface);
                }

                @media (max-width: 768px) {
                    .hamburger {
                        display: flex;
                    }
                    .nav-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        width: 280px;
                        flex-direction: column;
                        background: var(--color-background);
                        padding: calc(var(--spacing-lg) * 2) var(--spacing-md) var(--spacing-md);
                        box-shadow: var(--shadow-lg);
                        z-index: 999;
                    }
                    .nav-menu.hidden {
                        transform: translateX(-100%);
                    }
                    .nav-menu li {
                        width: 100%;
                    }
                    a {
                        padding: var(--spacing-md);
                        width: 100%;
                        border-radius: 12px;
                    }
                    a:hover {
                        background-color: var(--color-surface);
                        transform: translateX(var(--spacing-xs));
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <button class="hamburger" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}

customElements.define('app-nav', AppNav);
