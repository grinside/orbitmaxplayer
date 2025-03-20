export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('✅ Service Worker enregistré avec succès !', reg))
        .catch(err => console.error('❌ Erreur Service Workers :', err));
    });
  }
}