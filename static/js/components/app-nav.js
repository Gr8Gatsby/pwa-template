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
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                hamburger.classList.remove('active');
                nav.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
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

                /* Navigation Menu */
                .nav-menu {
                    display: flex;
                    gap: var(--spacing-md);
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    transform: translateX(0);
                    transition: transform 0.3s ease-in-out;
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
                    nav {
                        position: relative;
                        z-index: 1000;
                    }
                    .nav-container {
                        position: static;
                    }
                    .hamburger {
                        display: flex !important;
                        position: relative;
                        z-index: 1002;
                    }
                    .nav-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        width: 280px;
                        z-index: 1001;
                        background: var(--color-background);
                        box-shadow: var(--shadow-lg);
                        padding-top: 80px;
                        flex-direction: column;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease-in-out;
                    }
                    .nav-menu::before {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.5);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                        z-index: -1;
                    }
                    .nav-menu:not(.hidden)::before {
                        opacity: 1;
                        pointer-events: auto;
                    }
                    .nav-menu.hidden {
                        transform: translateX(-100%);
                    }
                    .nav-menu:not(.hidden) {
                        transform: translateX(0);
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
                    <ul class="nav-menu hidden">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}

// Create component with state management
const AppNav = withState(AppNavBase);
customElements.define('app-nav', AppNav);
