import { api } from './api';

const VAPID_PUBLIC_KEY_URL = '/push/vapid-public-key';
const SUBSCRIBE_URL = '/push/subscribe';
const UNSUBSCRIBE_URL = '/push/unsubscribe';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Push notifications não são suportados neste navegador.');
  }

  if (!window.isSecureContext && window.location.hostname !== 'localhost') {
     throw new Error('Notificações requerem conexão segura (HTTPS) ou localhost.');
  }

  const registration = await navigator.serviceWorker.ready;
  if (!registration) {
      throw new Error('Service Worker não está pronto. Tente recarregar a página.');
  }

  //Get VAPID Key
  let key;
  try {
      const response = await api.get(VAPID_PUBLIC_KEY_URL);
      key = response.data.key;
  } catch (err) {
      console.error('Erro ao obter chave VAPID:', err);
      throw new Error('Falha ao conectar com servidor de notificações.');
  }

  const convertedVapidKey = urlBase64ToUint8Array(key);

  let subscription;
  try {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
  } catch (err: any) {
      console.error('Erro ao inscrever no PushManager:', err);
      if (err.name === 'NotAllowedError') {
          throw new Error('Permissão para notificações foi negada.');
      }
      throw new Error(`Erro ao solicitar permissão: ${err.message}`);
  }

  try {
      await api.post(SUBSCRIBE_URL, subscription);
  } catch (err) {
      console.error('Erro ao salvar inscrição no backend:', err);
      // Optional: Unsubscribe locally if backend save fails to keep state in sync? 
      // await subscription.unsubscribe(); 
      throw new Error('Falha ao salvar inscrição no servidor.');
  }

  return subscription;
}

export async function unsubscribeFromPush() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
        await subscription.unsubscribe();
        await api.post(UNSUBSCRIBE_URL, { endpoint: subscription.endpoint });
    }
}
