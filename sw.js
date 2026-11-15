// Service Worker CORDILLERA - v2 (recibe push)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Llega un push desde internet → SIEMPRE mostrar notificación
self.addEventListener('push', e => {
  let d = { title: 'CORDILLERA', body: 'Alerta' };
  try { if (e.data) d = Object.assign(d, e.data.json()); }
  catch { if (e.data) d.body = e.data.text(); }
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: 'icon-192.png'
  }));
});

// Al tocar la notificación → abrir la app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(l => l.length ? l[0].focus() : clients.openWindow('./')));
});

// Siempre traer la página fresca desde internet (sin caché)
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request.url, { cache: 'no-store' }));
  }
});
