const CACHE_NAME = 'training-hub-v1';
const CONTENT_CACHE = 'content-cache-v1';

// Auto-detect base path for GitHub Pages subdirectory support
const BASE_PATH = location.pathname.replace('/index.html', '').replace(/\/$/, '') || '';

const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/icons/icon-192x192.png',
  BASE_PATH + '/icons/icon-512x512.png'
].filter(asset => asset !== BASE_PATH + '//');

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => {
          return !url.includes('/icons/') || url === '/icons/icon-192x192.png' || url === '/icons/icon-512x512.png';
        }));
      })
      .then(() => {
        console.log('[ServiceWorker] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Error caching static assets:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating');
  
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
  
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle content files (documents and videos)
  if (requestUrl.pathname.includes('/documents/') || requestUrl.pathname.includes('/videos/')) {
    event.respondWith(handleContentRequest(event.request));
  }
  // Handle static assets
  else if (STATIC_ASSETS.some(asset => {
    const assetPath = new URL(asset, location.origin).pathname;
    return requestUrl.pathname === assetPath || requestUrl.pathname === assetPath.substring(1);
  })) {
    event.respondWith(handleStaticAssetRequest(event.request));
  }
  // Handle app requests (same origin)
  else if (requestUrl.origin === location.origin) {
    event.respondWith(handleAppRequest(event.request));
  }
});

async function handleContentRequest(request) {
  const cache = await caches.open(CONTENT_CACHE);
  
  try {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[ServiceWorker] Serving content from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('[ServiceWorker] Content not in cache, attempting network fetch:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      console.log('[ServiceWorker] Successfully fetched from network, caching:', request.url);
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
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

async function handleStaticAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[ServiceWorker] Serving static asset from cache:', request.url);
      
      if (shouldUpdateInBackground(request)) {
        updateCacheInBackground(request, cache);
      }
      
      return cachedResponse;
    }
    
    console.log('[ServiceWorker] Static asset not in cache, fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('[ServiceWorker] Static asset request failed:', error);
    
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    if (request.url.endsWith('.html') || request.url === new URL('/', location).href) {
      return createOfflineFallbackPage();
    }
    
    return new Response('Resource not available offline', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

async function handleAppRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    // Try to match cached responses with base path support
    let cachedResponse = await cache.match(BASE_PATH + '/index.html');
    
    if (!cachedResponse) {
      cachedResponse = await cache.match(BASE_PATH + '/');
    }
    
    if (!cachedResponse && BASE_PATH) {
      // Fallback for root paths
      cachedResponse = await cache.match('/index.html') || await cache.match('/');
    }
    
    if (cachedResponse) {
      console.log('[ServiceWorker] Serving app from cache');
      
      // Background update
      fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(BASE_PATH + '/index.html', networkResponse.clone());
          cache.put(BASE_PATH + '/', networkResponse.clone());
        }
      }).catch(() => {
        console.log('[ServiceWorker] Background update failed, continuing with cached version');
      });
      
      return cachedResponse;
    }
    
    console.log('[ServiceWorker] App not in cache, fetching from network');
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(BASE_PATH + '/index.html', responseClone);
      await cache.put(BASE_PATH + '/', responseClone.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('[ServiceWorker] App request failed:', error);
    return createOfflineFallbackPage();
  }
}

function shouldUpdateInBackground(request) {
  const url = new URL(request.url);
  return url.pathname === '/' || url.pathname === '/index.html';
}

async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('[ServiceWorker] Background cache update successful:', request.url);
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    console.log('[ServiceWorker] Background update failed:', request.url, error);
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
            h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            p {
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
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
            button:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📚 Training Hub</h1>
            <p>You're currently offline. The app will work normally once your connection is restored.</p>
            <p>If you've previously cached content, you can still access it when the main app loads.</p>
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

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[ServiceWorker] Background sync triggered');
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();
    
    for (const request of cachedRequests) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
          console.log('[ServiceWorker] Background sync updated:', request.url);
        }
      } catch (error) {
        console.log('[ServiceWorker] Background sync failed for:', request.url);
      }
    }
  } catch (error) {
    console.error('[ServiceWorker] Background sync error:', error);
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      cacheUrls(event.data.urls).then(() => {
        event.ports[0].postMessage({ success: true });
      }).catch((error) => {
        console.error('[ServiceWorker] Error caching URLs:', error);
        event.ports[0].postMessage({ success: false, error: error.message });
      })
    );
  }
});

async function cacheUrls(urls) {
  const cache = await caches.open(CONTENT_CACHE);
  const promises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        console.log('[ServiceWorker] Successfully cached:', url);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`[ServiceWorker] Failed to cache ${url}:`, error);
      throw error;
    }
  });
  
  return Promise.all(promises);
}

self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click received');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('[ServiceWorker] Service Worker script loaded');