import { store } from './state/store.js';

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = '/sw.js?v=' + new Date().getTime();
        navigator.serviceWorker.register(swUrl)
            .then(registration => {
                // Check if there's an existing service worker
                if (registration.active) {
                    registration.update();
                }
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initialize state management
store.subscribe(state => {
    // Apply theme changes
    if (state.theme) {
        document.documentElement.setAttribute('data-theme', state.theme);
    }
    
    // Apply user preferences
    if (state.preferences) {
        document.documentElement.style.setProperty(
            '--font-size-base', 
            state.preferences.fontSize === 'large' ? '18px' : 
            state.preferences.fontSize === 'small' ? '14px' : '16px'
        );
    }
});

// App initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to main content
    const main = document.querySelector('main');
    main.classList.add('fade-enter');
    requestAnimationFrame(() => {
        main.classList.add('fade-enter-active');
    });

    // Initialize theme based on user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    store.dispatch({
        type: 'UPDATE_THEME',
        payload: prefersDark ? 'dark' : 'light'
    });
});

// Expose store to window for debugging in development
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('.repl.co');

if (isDevelopment) {
    window.__store = store;
}
