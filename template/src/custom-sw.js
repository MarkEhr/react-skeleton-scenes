window.self.addEventListener('install', function () {
  // The promise that skipWaiting() returns can be safely ignored.

  window.self.skipWaiting()
})

window.self.addEventListener('message', function (e) {
  // To force a page refresh we broadcast the refresh command to all clients

  if (e.data === 'force_refresh') {
    window.self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage('refresh')
      })
    })
  }
})

window.self.addEventListener('push', event => {
  try {
    const Notification = event.data.json()

    event.waitUntil(

      window.self.registration.showNotification(Notification.title || '', Notification.options || {})

    )
  } catch (e) {
    try {
      const Notification = event.data.text()

      event.waitUntil(

        window.self.registration.showNotification('Notification', { body: Notification })

      )
    } catch (e) {
      event.waitUntil(

        window.self.registration.showNotification('')

      )
    }
  }
})

window.self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  event.waitUntil(async function () {
    const allClients = await clients.matchAll({

      includeUncontrolled: true

    })

    let activeClient

    for (const client of allClients) {
      const url = new URL(client.url)

      if (url.pathname === event.notification.data.link) {
        client.focus()

        activeClient = client

        break
      }
    }

    // If we didn't find an existing opened window open a new one:

    if (!activeClient) {
      activeClient = await clients.openWindow(event.notification.data.link)
    }

    // activeClient.postMessage("Enviar noti pa que el react se entere y haga algo chido");
  }())
})
