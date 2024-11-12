const CACHE_NAME = 'pwa-template-v1';
const CACHE_URLS = [
    '/',
    '/static/css/main.css',
    '/static/css/components.css',
    '/static/js/app.js',
    '/static/js/components/app-header.js',
    '/static/js/components/app-nav.js',
    '/static/js/components/app-footer.js',
    '/static/icons/icon-192.svg',
    '/static/icons/icon-512.svg'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_URLS))
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    // During development, always fetch from network
    const isDevelopment = self.location.hostname === 'localhost' || 
                         self.location.hostname === '127.0.0.1' ||
                         self.location.hostname.includes('.repl.co');
                         
    if (isDevelopment) {
        return fetch(event.request);
    }
    
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
