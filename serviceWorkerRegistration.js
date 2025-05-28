const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register() {
  if ('serviceWorker' in navigator) {
    const swUrl = `/service-worker.js`;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl).catch(console.error);
    });
  }
}