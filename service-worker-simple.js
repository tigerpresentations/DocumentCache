const CACHE_NAME = 'training-hub-v13';
const CONTENT_CACHE = 'content-cache-v13';

// Auto-detect base path for GitHub Pages subdirectory support
const BASE_PATH = location.pathname.replace('/service-worker.js', '').replace('/service-worker-simple.js', '').replace(/\/$/, '') || '';

console.log('[ServiceWorker] Base path detected:', BASE_PATH);

const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/documents.json'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing v13 - dynamic document loading from JSON');
  self.skipWaiting(); // Force immediate activation
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating simple version');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== CONTENT_CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Cache cleanup completed');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Only handle GET requests from same origin
  if (event.request.method !== 'GET' || requestUrl.origin !== location.origin) {
    return;
  }

  // Handle content files (documents and videos) - cache first
  if (requestUrl.pathname.includes('/documents/') || requestUrl.pathname.includes('/videos/')) {
    event.respondWith(handleContentRequest(event.request));
  }
  // For everything else, use network first with cache fallback
  else {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, cache the response and return it
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If nothing in cache and it's a navigation request, show offline page
              if (event.request.mode === 'navigate') {
                return createOfflineFallbackPage();
              }
              // For other requests, let them fail
              throw new Error('No cache available');
            });
        })
    );
  }
});

async function handleContentRequest(request) {
  try {
    const cache = await caches.open(CONTENT_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[ServiceWorker] Serving content from cache:', request.url);
      return cachedResponse;
    }
    
    // Try network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('[ServiceWorker] Caching content from network:', request.url);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('[ServiceWorker] Content request failed:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Content not available offline',
        message: 'This content has not been cached and you are currently offline.',
        url: request.url
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

function createOfflineFallbackPage() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - Training Hub</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #2563eb, #667eea);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                text-align: center;
                padding: 1rem;
            }
            .container {
                max-width: 400px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 1rem;
                padding: 2rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            h1 { font-size: 2rem; margin-bottom: 1rem; }
            p { margin-bottom: 1.5rem; line-height: 1.6; }
            button {
                background: white;
                color: #2563eb;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s;
            }
            button:hover { transform: translateY(-2px); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📚 Training Hub</h1>
            <p>You're currently offline. The app will work normally once your connection is restored.</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    </body>
    </html>
  `;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    }
  });
}

console.log('[ServiceWorker] Simple service worker script loaded');