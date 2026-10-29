// Service worker do jogo instalado: guarda a casca (HTML, motor, ícones) para abrir sem rede.
// Os dados do jogo têm cache próprio no carregar.js. A revisão inclui também
// HTML, carregador e motor, para distribuir correções sem reexportar os dados.
const CACHE = 'algoland-casca-a51d98b1d8bc';
const CASCA = ['./', 'index.html', 'index.js', 'index.wasm', 'index.audio.worklet.js', 'index.audio.position.worklet.js', 'carregar.js',
  'manifest.webmanifest', 'icones/icone-192.png', 'icones/icone-512.png', 'icones/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((chaves) => Promise.all(chaves.filter((k) => k.startsWith('algoland-casca-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const pedido = e.request;
  if (pedido.method !== 'GET') return;
  const url = new URL(pedido.url);
  if (url.origin !== self.location.origin) return;
  const caminho = url.pathname.slice(self.registration.scope.length - url.origin.length);
  // Só a casca vem do cache; manifesto.json e as partes de dados seguem direto para a rede
  if (pedido.mode === 'navigate' || CASCA.includes(caminho) || caminho === '') {
    e.respondWith(caches.match(pedido, { ignoreSearch: true }).then((guardada) => guardada || fetch(pedido)));
  }
});
