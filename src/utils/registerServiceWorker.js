//  Purpose: Ensure the service worker (worker.js) is registered in the browser so it can receive push notifications.
// src/utils/registerServiceWorker.js

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/worker.js');
      // console.log('✅ Service Worker registered:', registration);
      return registration;
    } catch (err) {
      console.error('❌ Service Worker registration failed:', err);
      return null;
    }
  } else {
    console.warn('🚫 Service Worker not supported in this browser.');
    return null;
  }
}
