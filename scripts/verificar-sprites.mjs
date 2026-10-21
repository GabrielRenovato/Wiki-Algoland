// Confere as dimensões PNG reais e os limites dos quadros publicados na Wiki.
import * as sprites from '../src/sprites.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
let quantidade = 0;
const erros = [];
function conferir(s, nome) {
  if (!s || typeof s !== 'object') return;
  if (!s.src) {
    for (const [k, v] of Object.entries(s)) conferir(v, `${nome}.${k}`);
    return;
  }
  for (const arquivo of [s.src].flat()) {
    const png = readFileSync(fileURLToPath(new URL(`../public/sprites/${arquivo}`, import.meta.url)));
    const real = [png.readUInt32BE(16), png.readUInt32BE(20)];
    if (real.some((n, i) => n !== s.folha[i])) erros.push(`${nome}: ${arquivo}: PNG ${real}, catálogo ${s.folha}`);
    for (const [x, y] of s.quadros) {
      if (x < 0 || y < 0 || x + s.tam[0] * (s.resolucao ?? 1) > real[0] || y + s.tam[1] * (s.resolucao ?? 1) > real[1]) erros.push(`${nome}: quadro fora da folha ${arquivo}`);
    }
    quantidade++;
  }
}
for (const [nome, sprite] of Object.entries(sprites)) conferir(sprite, nome);
const dados = JSON.parse(readFileSync(new URL('../src/dados-jogo.json', import.meta.url), 'utf8'));
for (const peixe of dados.peixes) conferir(sprites.peixe(peixe.id), `peixe.${peixe.id}`);
console.log(`Sprites: ${quantidade} camadas conferidas; ${erros.length} falhas.`);
if (erros.length) { console.error(erros.join('\n')); process.exitCode = 1; }
