self.addEventListener('push', (event) => {
  const payload = event.data?.json() || {};

  const title = payload.title || 'New Notification';
  const message = payload.message || 'You have a new update.';
  const url = payload.data?.url || '/';

  const options = {
    body: message,
    data: {
      url: url,
    },
    icon: '/icons/icon-192x192.png', // optional
    badge: '/icons/badge-72x72.png', // optional
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
