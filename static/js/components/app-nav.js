import { store, withState } from '../state/store.js';

class AppNavBase extends HTMLElement {
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
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                store.dispatch({ type: 'TOGGLE_NAVIGATION' });
            });
        }
    }

    onStateChange(state) {
        const hamburger = this.shadowRoot.querySelector('.hamburger');
        const nav = this.shadowRoot.querySelector('.nav-menu');
        
        if (hamburger && nav) {
            if (state.isNavOpen) {
                hamburger.classList.add('active');
                nav.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                hamburger.classList.remove('active');
                nav.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                nav {
                    position: relative;
                    width: 100%;
                    z-index: 1;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: var(--blur-effect);
                    -webkit-backdrop-filter: var(--blur-effect);
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--color-border);
                }

                .nav-container {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* Navigation Menu */
                .nav-menu {
                    display: flex;
                    gap: var(--spacing-md);
                    list-style: none;
                    margin: 0;
                    padding: 0;
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
                }

                .hamburger span {
                    width: 30px;
                    height: 2px;
                    background: var(--color-text);
                    border-radius: 1px;
                    transition: all 0.3s ease;
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

                a {
                    color: var(--color-text);
                    text-decoration: none;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                    display: block;
                }

                a:hover {
                    background-color: var(--color-surface);
                }

                /* Mobile Navigation Styles */
                @media (max-width: 768px) {
                    .hamburger {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                        z-index: 100;
                        display: flex;
                    }

                    .nav-menu {
                        position: fixed;
                        inset: 0;
                        background: var(--color-background);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }

                    .nav-menu.hidden {
                        transform: translateX(-100%);
                    }

                    .nav-menu:not(.hidden) {
                        transform: translateX(0);
                    }

                    .nav-menu li {
                        margin: var(--spacing-md) 0;
                        opacity: 0;
                        transform: translateX(-20px);
                        transition: all 0.3s ease;
                    }

                    .nav-menu:not(.hidden) li {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    a {
                        font-size: 1.5rem;
                        padding: var(--spacing-md);
                    }
                }
            </style>
            <nav>
                <button class="hamburger" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="nav-container">
                    <!-- Nav container content -->
                </div>
            </nav>
            <ul class="nav-menu hidden">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        `;
    }
}

// Create component with state management
const AppNav = withState(AppNavBase);
customElements.define('app-nav', AppNav);
