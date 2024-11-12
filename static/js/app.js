// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// App initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to main content
    const main = document.querySelector('main');
    main.classList.add('fade-enter');
    requestAnimationFrame(() => {
        main.classList.add('fade-enter-active');
    });
});
