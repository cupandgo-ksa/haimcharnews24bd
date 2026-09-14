importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAkAPHDwoG7iFc6rx-ujdVhl_DxF8lY_eA",
  authDomain: "news-22d62.firebaseapp.com",
  projectId: "news-22d62",
  storageBucket: "news-22d62.firebasestorage.app",
  messagingSenderId: "1087654881721",
  appId: "1:1087654881721:web:0aeb2fb96dd269edba2e68"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "হাইমচর নিউজ24BD";

  const options = {
    body:
      payload?.notification?.body ||
      payload?.data?.body ||
      "নতুন সংবাদ প্রকাশিত হয়েছে",
    icon: payload?.data?.icon || "./favicon.png",
    badge: payload?.data?.badge || "./favicon.png",
    data: {
      url: payload?.data?.url || "./"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    "./";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
