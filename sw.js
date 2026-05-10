const CACHE_NAME = 'recipe-app-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Never cache API calls, proxies, or external service requests
  if (url.includes('api.anthropic.com') ||
      url.includes('corsproxy.io') ||
      url.includes('noembed.com') ||
      url.includes('lemnoslife.com') ||
      url.includes('youtube.com/oembed') ||
      url.includes('img.youtube.com') ||
      url.includes('supabase.co') ||
      e.request.method !== 'GET') {
    return;
  }
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
