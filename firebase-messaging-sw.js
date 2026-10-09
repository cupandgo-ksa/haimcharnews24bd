importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDh9wI4xN8_dQaaXz3-7LKem3jUU-D_sAI",
  authDomain: "haimchar-news24bd.firebaseapp.com",
  projectId: "haimchar-news24bd",
  storageBucket: "haimchar-news24bd.firebasestorage.app",
  messagingSenderId: "946306315141",
  appId: "1:946306315141:web:3bc741b4eb222dfc974aec"
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
