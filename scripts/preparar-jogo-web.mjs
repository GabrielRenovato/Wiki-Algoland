import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, copyFile, rm, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Recebe uma exportação Web do Godot. O build da wiki usa os arquivos já preparados.
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origem = process.argv[2];
if (!origem) throw new Error('Uso: node scripts/preparar-jogo-web.mjs /caminho/da/exportacao');
const pacote = await readFile(resolve(origem, 'index.pck'));
// Verifica a configuração antes de remover a versão anterior da pasta pública.
// Uma exportação pode terminar sem erro e ainda conter project.binary vazio.
if (pacote.toString('ascii', 0, 4) !== 'GDPC') throw new Error('Pacote Web inválido.');
const formato = pacote.readUInt32LE(4);
if (![2, 3, 4].includes(formato)) throw new Error('Formato de pacote Web não suportado.');
const base = Number(pacote.readBigUInt64LE(24));
let posicao = formato >= 3 ? Number(pacote.readBigUInt64LE(32)) : 96;
const quantidade = pacote.readUInt32LE(posicao);
posicao += 4;
let configuracaoValida = false;
for (let indice = 0; indice < quantidade; indice++) {
  const tamanhoNome = pacote.readUInt32LE(posicao);
  posicao += 4;
  const nome = pacote.toString('utf8', posicao, posicao + tamanhoNome).replace(/\0+$/, '').replace(/^res:\/\//, '');
  posicao += tamanhoNome;
  const deslocamento = Number(pacote.readBigUInt64LE(posicao));
  const tamanho = Number(pacote.readBigUInt64LE(posicao + 8));
  posicao += 36;
  if (nome === 'project.binary') {
    const inicio = base + deslocamento;
    configuracaoValida = tamanho >= 8 && inicio + tamanho <= pacote.length && pacote.toString('ascii', inicio, inicio + 4) === 'ECFG';
  }
}
if (!configuracaoValida) throw new Error('Exportação Web inválida: project.binary está ausente, vazio ou corrompido. A versão pública foi preservada.');
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
for (const arquivo of ['index.html', 'manifest.webmanifest', 'fontes-LICENSE.txt']) {
  await copyFile(resolve(raiz, 'scripts/web', arquivo), resolve(destino, arquivo));
}
// A revisão da casca inclui o carregador e o motor: correções de inicialização
// precisam atualizar o worker mesmo quando o pacote do jogo permanece igual.
const versao = hash.slice(0, 12);
const hashCasca = createHash('sha256').update(versao);
for (const arquivo of ['index.html', 'carregar.js', 'sw.js']) {
  hashCasca.update(await readFile(resolve(raiz, 'scripts/web', arquivo)));
}
for (const arquivo of ['index.js', 'index.wasm']) {
  hashCasca.update(await readFile(resolve(destino, arquivo)));
}
const revisaoCasca = hashCasca.digest('hex').slice(0, 12);
for (const arquivo of ['carregar.js', 'sw.js']) {
  const texto = await readFile(resolve(raiz, 'scripts/web', arquivo), 'utf8');
  await writeFile(resolve(destino, arquivo), texto.replaceAll('__VERSAO__', versao).replaceAll('__REVISAO_CASCA__', revisaoCasca));
}
// Ícones do jogo instalado (iPhone usa o apple-touch-icon; os demais vêm do manifesto)
await mkdir(resolve(destino, 'icones'), { recursive: true });
for (const arquivo of ['apple-touch-icon.png', 'icone-192.png', 'icone-512.png', 'icone-mascara-512.png']) {
  await copyFile(resolve(raiz, 'public/icones', arquivo), resolve(destino, 'icones', arquivo));
}
const wasm = await readFile(resolve(destino, 'index.wasm'));
await writeFile(resolve(destino, 'manifesto.json'), JSON.stringify({
  versao: hash.slice(0, 12), sha256: hash, pacote: pacote.length,
  transferencia: pacote.length + wasm.length, partes,
}, null, 2) + '\n');
console.log(`Web preparada: ${partes.length} partes, ${((pacote.length + wasm.length) / 1024 / 1024).toFixed(1)} MiB.`);
