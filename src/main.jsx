import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./estilo.css";

createRoot(document.getElementById("raiz")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Wiki instalável como app: o service worker só entra no build publicado
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
    navigator.serviceWorker.ready.then((r) => r.active?.postMessage({ guardar: performance.getEntriesByType("resource").map((e) => e.name) }));
  });
}
