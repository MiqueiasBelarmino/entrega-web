/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any };

// This is needed for vite-plugin-pwa to inject the manifest
// @ts-ignore
console.log(self.__WB_MANIFEST);

self.addEventListener('push', function(event: any) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/pwa-icon.svg', // Replace with your icon
      badge: '/pwa-icon.svg', // Replace with your badge
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
        url: data.routeTo || '/'
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver detalhes',
          icon: '/pwa-icon.svg'
        },
        {
          action: 'close',
          title: 'Fechar',
          icon: '/pwa-icon.svg'
        },
      ]
    };
    event.waitUntil(
      // @ts-ignore
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event: any) {
  event.notification.close();
  if (event.action === 'explore' || !event.action) {
     event.waitUntil(
        // @ts-ignore
        self.clients.matchAll({type: 'window'}).then( windowClients => {
            for (let client of windowClients) {
                if (client.url === (event.notification as any).data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            // @ts-ignore
            if (self.clients.openWindow) {
                return self.clients.openWindow((event.notification as any).data.url);
            }
        })
    );
  }
});
