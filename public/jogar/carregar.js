/* global Engine */
// Versão do jogo gravada na exportação (a mesma do sw.js); serve para detectar casca antiga em cache
const VERSAO_CASCA = '718bd9ae5b64';
(async () => {
  // Aparelho de toque de verdade (iPhone, iPad, Android): o dedo é o ponteiro principal
  const celular = matchMedia('(pointer: coarse) and (hover: none)').matches;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instalado = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches;
  // Telas de 3x (iPhone) pesam demais para a GPU do navegador: limita a resolução interna (?dpr=1.5 testa outros valores)
  const parametros = new URLSearchParams(location.search);
  if (celular) {
    const limite = Number(parametros.get('dpr')) || 2;
    if (window.devicePixelRatio > limite) Object.defineProperty(window, 'devicePixelRatio', { value: limite, configurable: true });
  }
  const estado = document.querySelector('#estado');
  const mensagem = document.querySelector('#mensagem');
  const progresso = document.querySelector('#progresso');
  const tentar = document.querySelector('#tentar');
  tentar.onclick = () => location.reload();
  // Funciona sem rede depois da primeira visita: o service worker guarda a casca (HTML, motor e ícones)
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {});
  // Toque duplo, pinça e arrasto da página não podem mexer na tela do jogo
  for (const nome of ['gesturestart', 'gesturechange', 'dblclick']) document.addEventListener(nome, (e) => e.preventDefault());
  document.addEventListener('touchmove', (e) => { if (e.touches.length > 1 || e.target.id === 'canvas') e.preventDefault(); }, { passive: false });
  // Dica de instalação: no iPhone só o Safari instala, e a partida do navegador não passa para o app instalado
  if (ios && !instalado) {
    const dica = document.querySelector('#instalar');
    dica.hidden = false;
    dica.innerHTML = '<p><b>Instale antes de jogar</b> para tela cheia e para guardar sua partida no app.</p><div class="passos"><span>1. Toque em <b>Compartilhar</b> (o quadrado com a seta, na barra do Safari)</span><span>2. Escolha <b>Adicionar à Tela de Início</b></span><span>3. Abra o <b>AlgoLand</b> pelo ícone</span></div><p class="suave">A partida salva aqui no navegador não vai para o app instalado.</p>';
  }
  // Aviso para deitar o aparelho (quem quiser pode jogar em pé)
  const girar = document.querySelector('#girar');
  if (celular) {
    girar.hidden = false;
    document.querySelector('#continuar-em-pe').onclick = () => { girar.hidden = true; };
  }
  try {
    const faltando = Engine.getMissingFeatures({ threads: false });
    if (faltando.length) throw new Error(ios ? 'Este iPhone não oferece os recursos gráficos necessários. Atualize o iOS (16 ou mais novo) e abra pelo Safari.' : 'Este navegador não oferece os recursos gráficos necessários. Use uma versão atual do Chrome, Edge ou Firefox.');
    const resposta = await fetch('manifesto.json', { cache: 'no-cache' });
    if (!resposta.ok) throw new Error('Não foi possível consultar os arquivos do jogo.');
    const manifesto = await resposta.json();
    // Casca antiga em cache com dados novos: pede o service worker novo e recarrega uma única vez
    if (VERSAO_CASCA !== '__VERSAO' + '__' && VERSAO_CASCA !== manifesto.versao && 'serviceWorker' in navigator && !sessionStorage.getItem(`atualizou-${manifesto.versao}`)) {
      sessionStorage.setItem(`atualizou-${manifesto.versao}`, '1');
      try { await (await navigator.serviceWorker.getRegistration())?.update(); } catch (_) { /* segue com a casca atual */ }
      location.reload();
      return;
    }
    const engine = new Engine({ executable: 'index', canvas: document.querySelector('#canvas'), canvasResizePolicy: 2, focusCanvas: true, experimentalVK: true, ensureCrossOriginIsolationHeaders: false, onExit: () => { estado.hidden = false; mensagem.textContent = 'A aventura foi encerrada.'; progresso.hidden = true; tentar.textContent = 'Jogar novamente'; tentar.hidden = false; } });
    let pacote = new Uint8Array(manifesto.pacote);
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
    // O motor já copiou o pacote para o seu sistema de arquivos: solta a cópia para poupar memória (importante no iPhone)
    pacote = null;
    progresso.value = 100;
    if (celular) {
      // O som e a tela cheia só liberam depois de um toque do jogador
      estado.hidden = true;
      const convite = document.querySelector('#toque');
      convite.hidden = false;
      await new Promise((ok) => { document.querySelector('#jogar').onclick = ok; });
      convite.hidden = true;
      try { await document.documentElement.requestFullscreen?.({ navigationUI: 'hide' }); } catch (_) { /* iPhone não oferece tela cheia no Safari */ }
      try { await screen.orientation?.lock?.('landscape'); } catch (_) { /* só funciona em tela cheia no Android */ }
      try { await navigator.storage?.persist?.(); } catch (_) { /* pedido de armazenamento durável é opcional */ }
      const manter = async () => { try { if (document.visibilityState === 'visible') await navigator.wakeLock?.request?.('screen'); } catch (_) { /* tela pode apagar */ } };
      document.addEventListener('visibilitychange', manter);
      manter();
    }
    // ?desempenho mostra FPS, memória e chamadas de desenho sobre o jogo; ?pular (testes) dispensa o prólogo
    await engine.start({ args: ['--main-pack', 'index.pck', ...(parametros.has('desempenho') ? ['--desempenho'] : [])] });
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
