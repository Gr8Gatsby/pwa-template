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
        const themeToggle = this.shadowRoot.querySelector('.theme-toggle');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                store.dispatch({ type: 'TOGGLE_NAVIGATION' });
            });
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = store.state.theme;
                store.dispatch({
                    type: 'UPDATE_THEME',
                    payload: currentTheme === 'light' ? 'dark' : 'light'
                });
            });
        }
    }

    onStateChange(state) {
        // Navigation state handling
        const nav = this.shadowRoot.querySelector('.nav-menu');
        if (nav) {
            nav.classList.toggle('active', state.isNavOpen);
            document.body.style.overflow = state.isNavOpen ? 'hidden' : '';
        }
        
        // Update theme attribute
        this.setAttribute('data-theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
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
                    background: var(--color-surface);
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

                .theme-toggle {
                    background: none;
                    border: none;
                    padding: var(--spacing-sm);
                    cursor: pointer;
                    color: var(--color-text);
                    margin-right: var(--spacing-md);
                }

                .theme-toggle svg {
                    width: 24px;
                    height: 24px;
                }

                .theme-toggle .sun {
                    display: none;
                }

                .theme-toggle .moon {
                    display: block;
                }

                :host([data-theme="dark"]) .theme-toggle .sun {
                    display: block;
                }

                :host([data-theme="dark"]) .theme-toggle .moon {
                    display: none;
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
                    <div style="display: flex; align-items: center;">
                        <button class="theme-toggle" aria-label="Toggle theme">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path class="sun" fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0c.39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                                <path class="moon" fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9s9-4.03 9-9c0-.46-.04-.92-.1-1.36c-.98 1.37-2.58 2.26-4.4 2.26c-3.03 0-5.5-2.47-5.5-5.5c0-1.82.89-3.42 2.26-4.4c-.44-.06-.9-.1-1.36-.1z"/>
                            </svg>
                        </button>
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
                </div>
            </header>
        `;
    }
}

// Create component with state management
const AppHeader = withState(AppHeaderBase);
customElements.define('app-header', AppHeader);
