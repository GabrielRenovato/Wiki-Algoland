import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";

// Marca de conteúdo de cada sprite (sprites/x.png?v=...): quando uma folha muda com o mesmo nome,
// o endereço muda e o navegador não reaproveita a versão antiga guardada no cache.
function marcasDosSprites(pasta = "public/sprites") {
  const marcas = {};
  for (const arquivo of readdirSync(pasta, { recursive: true, withFileTypes: true })) {
    if (!arquivo.isFile()) continue;
    const caminho = `${arquivo.parentPath ?? arquivo.path}/${arquivo.name}`;
    marcas[caminho.slice(pasta.length + 1)] = createHash("sha1").update(readFileSync(caminho)).digest("hex").slice(0, 8);
  }
  return marcas;
}

// base relativa: o build abre em qualquer pasta ou subcaminho de hospedagem
export default defineConfig({ plugins: [react()], base: "./", define: { __MARCAS_SPRITES__: JSON.stringify(marcasDosSprites()) } });
