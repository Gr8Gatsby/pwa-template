import { store, withState } from '../state/store.js';

class AppHeaderBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const hamburger = this.shadowRoot.querySelector('.hamburger');
        const nav = this.shadowRoot.querySelector('.nav-menu');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                store.dispatch({ type: 'TOGGLE_NAVIGATION' });
            });
        }
    }

    onStateChange(state) {
        const nav = this.shadowRoot.querySelector('.nav-menu');
        if (nav) {
            nav.classList.toggle('active', state.isNavOpen);
            document.body.style.overflow = state.isNavOpen ? 'hidden' : '';
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                header {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: var(--blur-effect);
                    -webkit-backdrop-filter: var(--blur-effect);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .header-container {
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
                    z-index: 1001;
                }
                
                .nav-menu {
                    display: flex;
                    gap: var(--spacing-md);
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .hamburger {
                    display: none;
                    z-index: 1001;
                }
                
                @media (max-width: 768px) {
                    .hamburger {
                        display: block;
                        background: none;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        width: 24px;
                        height: 24px;
                    }
                    
                    .nav-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background: var(--color-background);
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    
                    .nav-menu.active {
                        transform: translateX(0);
                    }
                    
                    .nav-menu a {
                        font-size: 1.5rem;
                        padding: var(--spacing-md);
                    }
                }
                
                a {
                    color: var(--color-text);
                    text-decoration: none;
                    padding: var(--spacing-sm);
                    transition: color 0.3s ease;
                }
                
                a:hover {
                    color: var(--color-primary);
                }
            </style>
            <header>
                <div class="header-container">
                    <a href="/" class="logo">PWA Template</a>
                    <button class="hamburger" aria-label="Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </button>
                    <nav class="nav-menu">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                    </nav>
                </div>
            </header>
        `;
    }
}

// Create component with state management
const AppHeader = withState(AppHeaderBase);
customElements.define('app-header', AppHeader);
