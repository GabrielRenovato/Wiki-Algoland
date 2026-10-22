/* global Engine */
(async () => {
  const estado = document.querySelector('#estado');
  const mensagem = document.querySelector('#mensagem');
  const progresso = document.querySelector('#progresso');
  const tentar = document.querySelector('#tentar');
  tentar.onclick = () => location.reload();
  try {
    const faltando = Engine.getMissingFeatures({ threads: false });
    if (faltando.length) throw new Error('Este navegador não oferece os recursos gráficos necessários. Use uma versão atual do Chrome, Edge ou Firefox.');
    const resposta = await fetch('manifesto.json', { cache: 'no-cache' });
    if (!resposta.ok) throw new Error('Não foi possível consultar os arquivos do jogo.');
    const manifesto = await resposta.json();
    const engine = new Engine({ executable: 'index', canvas: document.querySelector('#canvas'), canvasResizePolicy: 2, focusCanvas: true, experimentalVK: true, ensureCrossOriginIsolationHeaders: false, onExit: () => { estado.hidden = false; mensagem.textContent = 'A aventura foi encerrada.'; progresso.hidden = true; tentar.textContent = 'Jogar novamente'; tentar.hidden = false; } });
    const pacote = new Uint8Array(manifesto.pacote);
    // As partes têm hash no nome: ficam no Cache Storage e só baixam de novo quando o jogo muda.
    let cache = null;
    try {
      cache = await caches.open(`algoland-jogo-${manifesto.versao}`);
      for (const nome of await caches.keys()) if (nome.startsWith('algoland-jogo-') && nome !== `algoland-jogo-${manifesto.versao}`) caches.delete(nome);
    } catch (_) { cache = null; }
    const recebidoPorParte = manifesto.partes.map(() => 0);
    const atualizar = () => {
      const recebido = recebidoPorParte.reduce((a, b) => a + b, 0);
      progresso.value = recebido / manifesto.pacote * 90;
      mensagem.textContent = `Baixando o jogo: ${Math.round(recebido / manifesto.pacote * 100)}%`;
    };
    let inicio = 0;
    const deslocamentos = manifesto.partes.map((parte) => { const d = inicio; inicio += parte.tamanho; return d; });
    const baixarParte = async (indice) => {
      const parte = manifesto.partes[indice];
      let resposta = cache ? await cache.match(parte.arquivo) : null;
      const guardada = Boolean(resposta);
      if (!resposta) resposta = await fetch(parte.arquivo);
      if (!resposta.ok) throw new Error('Falha ao baixar o jogo. Confira sua conexão e tente novamente.');
      const copia = !guardada && cache ? resposta.clone() : null;
      const leitor = resposta.body.getReader();
      let tamanho = 0;
      while (true) {
        const { done, value } = await leitor.read();
        if (done) break;
        pacote.set(value, deslocamentos[indice] + tamanho);
        tamanho += value.length;
        recebidoPorParte[indice] = tamanho;
        atualizar();
      }
      if (tamanho !== parte.tamanho) throw new Error('O download ficou incompleto. Tente novamente.');
      if (copia) { try { await cache.put(parte.arquivo, copia); } catch (_) { /* sem espaço: segue sem guardar */ } }
    };
    // Poucas conexões em paralelo: mais rápido que uma fila e sem estourar o limite do navegador.
    const fila = manifesto.partes.map((_, i) => i);
    await Promise.all(Array.from({ length: Math.min(3, fila.length) }, async () => {
      while (fila.length) await baixarParte(fila.shift());
    }));
    // startGame baixaria index.pck novamente; start usa o pacote montado em memória.
    mensagem.textContent = 'Iniciando o jogo…';
    await engine.preloadFile(pacote.buffer, 'index.pck');
    await engine.init('index');
    progresso.value = 100;
    await engine.start({ args: ['--main-pack', 'index.pck'] });
    estado.hidden = true;
    document.querySelector('#canvas').focus();
  } catch (erro) {
    mensagem.textContent = 'Não foi possível iniciar o jogo.';
    const detalhe = document.querySelector('#erro');
    detalhe.textContent = erro instanceof Error ? erro.message : String(erro);
    detalhe.hidden = false;
    progresso.hidden = true;
    tentar.hidden = false;
    console.error(erro);
  }
})();
