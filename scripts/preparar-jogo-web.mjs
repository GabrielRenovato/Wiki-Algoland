import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, copyFile, rm, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Recebe uma exportação Web do Godot. O build da wiki usa os arquivos já preparados.
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origem = process.argv[2];
if (!origem) throw new Error('Uso: node scripts/preparar-jogo-web.mjs /caminho/da/exportacao');
const pacote = await readFile(resolve(origem, 'index.pck'));
const hash = createHash('sha256').update(pacote).digest('hex');
const destino = resolve(raiz, 'public/jogar');
// Preserva atualizacao/ (versao.json e patches do Android): é publicada à parte e não faz parte do jogo Web
await mkdir(destino, { recursive: true });
for (const nome of await readdir(destino)) {
  if (nome === 'atualizacao') continue;
  await rm(resolve(destino, nome), { recursive: true, force: true });
}
const partes = [];
for (let inicio = 0; inicio < pacote.length; inicio += 32 * 1024 * 1024) {
  const dados = pacote.subarray(inicio, inicio + 32 * 1024 * 1024);
  const arquivo = `dados-${hash.slice(0, 12)}-${partes.length + 1}.part`;
  await writeFile(resolve(destino, arquivo), dados);
  partes.push({ arquivo, tamanho: dados.length });
}
for (const arquivo of ['index.js', 'index.wasm', 'index.audio.worklet.js', 'index.audio.position.worklet.js']) {
  await copyFile(resolve(origem, arquivo), resolve(destino, arquivo));
}
for (const arquivo of ['index.html', 'carregar.js', 'fontes-LICENSE.txt']) {
  await copyFile(resolve(raiz, 'scripts/web', arquivo), resolve(destino, arquivo));
}
const wasm = await readFile(resolve(destino, 'index.wasm'));
await writeFile(resolve(destino, 'manifesto.json'), JSON.stringify({
  versao: hash.slice(0, 12), sha256: hash, pacote: pacote.length,
  transferencia: pacote.length + wasm.length, partes,
}, null, 2) + '\n');
console.log(`Web preparada: ${partes.length} partes, ${((pacote.length + wasm.length) / 1024 / 1024).toFixed(1)} MiB.`);
