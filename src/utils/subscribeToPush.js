// src/utils/subscribeToPush.js

export async function subscribeToPush(registration, user) {
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
   console.log('hello',publicKey)
  if (!publicKey) {
    throw new Error('🚨 VAPID public key missing in .env');
  }

  // Step 1: Ask for permission
  const permission = await Notification.requestPermission();
  console.log("Notification.permission:", Notification.permission);

  console.log(permission)
  if (permission !== 'granted') {
    alert('Notification permission denied.');
    return null;
  }

  // Step 2: Subscribe to PushManager
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  // Step 3: Prepare payload with user info
  const payload = {
    userId: user._id,
    userRole:user.role,
    subscription: subscription.toJSON(),
  };
 

  return payload;
}

// Utility to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
