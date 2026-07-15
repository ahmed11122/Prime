// firebase-messaging-sw.js
// Must be uploaded at the SITE ROOT (same folder as index.html), reachable
// at https://yourdomain.com/firebase-messaging-sw.js — the browser only
// looks for it at that exact top-level path.
//
// This is what lets employees receive تبليغات push notifications even
// after they close the tab or sign out of the app (as long as they don't
// clear the browser or revoke notification permission).

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA1q9LiS6EXNCBFmFvytyN-p4KKgP9wym4",
  authDomain: "prime-e-8eb80.firebaseapp.com",
  databaseURL: "https://prime-e-8eb80-default-rtdb.firebaseio.com",
  projectId: "prime-e-8eb80",
  storageBucket: "prime-e-8eb80.firebasestorage.app",
  messagingSenderId: "671376930301",
  appId: "1:671376930301:web:f8b61666314f3149fb5594"
});

const messaging = firebase.messaging();

// Fired when a push arrives while no tab is open/focused.
messaging.onBackgroundMessage(function (payload) {
  const title = (payload.notification && payload.notification.title) || 'تبليغ جديد';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: '/icon-192.png', // optional: replace with a real icon path if you have one, or remove this line
    dir: 'rtl'
  };
  self.registration.showNotification(title, options);
});

// Optional: focus/open the app when the notification is tapped.
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientList) {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
