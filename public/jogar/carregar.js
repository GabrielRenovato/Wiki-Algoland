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
    let recebido = 0;
    const pacote = new Uint8Array(manifesto.pacote);
    for (const parte of manifesto.partes) {
      const respostaParte = await fetch(parte.arquivo);
      if (!respostaParte.ok) throw new Error('Falha ao baixar o jogo. Confira sua conexão e tente novamente.');
      const leitor = respostaParte.body.getReader();
      let tamanho = 0;
      while (true) {
        const { done, value } = await leitor.read();
        if (done) break;
        pacote.set(value, recebido);
        recebido += value.length;
        tamanho += value.length;
        progresso.value = recebido / manifesto.pacote * 90;
        mensagem.textContent = `Baixando o jogo: ${Math.round(recebido / manifesto.pacote * 100)}%`;
      }
      if (tamanho !== parte.tamanho) throw new Error('O download ficou incompleto. Tente novamente.');
    }
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
