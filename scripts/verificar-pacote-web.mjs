import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// Regressão: exportação terminava com sucesso, mas project.binary tinha zero bytes.
const raiz = new URL('../', import.meta.url);
const manifesto = new URL('public/jogar/manifesto.json', raiz);
const anterior = await readFile(manifesto);
const pasta = await mkdtemp(resolve(tmpdir(), 'algoland-pck-vazio-'));
try {
  const nome = Buffer.from('project.binary\0\0');
  const diretorio = Buffer.alloc(4 + 4 + nome.length + 36);
  diretorio.writeUInt32LE(1);
  diretorio.writeUInt32LE(nome.length, 4);
  nome.copy(diretorio, 8);
  const cabecalho = Buffer.alloc(96);
  cabecalho.write('GDPC');
  cabecalho.writeUInt32LE(2, 4);
  cabecalho.writeBigUInt64LE(BigInt(96 + diretorio.length), 24);
  await writeFile(resolve(pasta, 'index.pck'), Buffer.concat([cabecalho, diretorio]));
  const resultado = spawnSync(process.execPath, [new URL('scripts/preparar-jogo-web.mjs', raiz).pathname, pasta], { encoding: 'utf8' });
  assert.equal(resultado.status, 1);
  assert.match(resultado.stderr, /project.binary está ausente, vazio ou corrompido/);
  assert.deepEqual(await readFile(manifesto), anterior);
  console.log('Pacote vazio rejeitado; manifesto público preservado.');
} finally {
  await rm(pasta, { recursive: true, force: true });
}
