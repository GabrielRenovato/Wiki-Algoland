// Service worker da wiki instalada: abre sem rede com o que já foi visto.
// Páginas buscam a rede primeiro; arquivos (scripts, sprites, fontes) saem do cache e se atualizam por trás.
// O jogo em /jogar/ fica de fora: é grande e tem cache próprio no navegador.
const CACHE = "algoland-wiki-v3";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./manifest.webmanifest", "./icones/icone.svg"])));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k.startsWith("algoland-wiki-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const FONTES = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];
const guardavel = (url) => (url.origin === self.location.origin || FONTES.includes(url.origin)) && !url.pathname.includes("/jogar/");

// Na primeira visita os arquivos chegam antes do service worker: a página manda a lista para guardar
self.addEventListener("message", (e) => {
  const urls = (e.data?.guardar ?? []).filter((u) => guardavel(new URL(u)));
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(urls.map((u) => c.match(u).then((tem) => tem || c.add(u)).catch(() => {})))));
});

self.addEventListener("fetch", (e) => {
  const pedido = e.request;
  if (pedido.method !== "GET") return;
  const url = new URL(pedido.url);
  if (!guardavel(url)) return;

  if (pedido.mode === "navigate") {
    e.respondWith(
      fetch(pedido)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE).then((c) => c.put("./", copia));
          return resposta;
        })
        .catch(() => caches.match("./")),
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(pedido).then((guardada) => {
        const daRede = fetch(pedido)
          .then((resposta) => {
            if (resposta.ok) c.put(pedido, resposta.clone());
            return resposta;
          })
          .catch(() => guardada);
        return guardada || daRede;
      }),
    ),
  );
});
