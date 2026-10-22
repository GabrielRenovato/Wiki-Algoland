import { useEffect, useRef, useState } from 'react';
import { Titulo, Caixa } from '../componentes/ui.jsx';

const endereco = `${import.meta.env.BASE_URL}jogar/index.html`;

export function Jogar() {
  const [tamanho, setTamanho] = useState(null);
  useEffect(() => { let ativo = true; fetch(`${import.meta.env.BASE_URL}jogar/manifesto.json`).then(r => r.json()).then(m => { if (ativo) setTamanho(Math.ceil(m.transferencia / 1024 / 1024)); }).catch(() => {}); return () => { ativo = false; }; }, []);
  const [iniciado, setIniciado] = useState(false);
  const palco = useRef(null);
  const [aviso, setAviso] = useState('');
  async function telaCheia() {
    try { await palco.current.requestFullscreen(); }
    catch { setAviso('Abra o jogo em outra aba para aproveitar mais espaço.'); }
  }
  return <>
    <Titulo sub="Uma versão de testes para jogar aqui mesmo, pelo navegador.">Jogar no navegador</Titulo>
    <p>O carregamento inicial baixa o jogo completo{tamanho ? ` (cerca de ${tamanho} MiB)` : ""}. Use um navegador atualizado e aguarde o jogo abrir.</p>
    <Caixa tipo="nota" titulo="Jogo Web atualizado em 22/10/2026">Inclui as novas interfaces de madeira e pergaminho, a ferraria animada com fole e ferro incandescente, o quarto da Dona Rosa e as correções nas camas e na pesca. Os downloads instaláveis continuam identificados pela versão do Release.</Caixa>
    <div className="jogo-acoes">
      <a href={endereco} target="_blank" rel="noopener noreferrer">Abrir em outra aba ↗</a>
      {iniciado && <button type="button" onClick={telaCheia}>Tela cheia</button>}
    </div>
    {aviso && <p role="status">{aviso}</p>}
    <div className="jogo-palco" ref={palco}>
      {iniciado ? <iframe title="AlgoLand — versão de testes" src={endereco} allow="autoplay; gamepad" allowFullScreen /> :
        <div className="jogo-convite"><h2>Sua aventura começa aqui</h2><p>O download começa quando você clicar em jogar.</p><button type="button" onClick={() => setIniciado(true)}>▶ Jogar AlgoLand</button></div>}
    </div>
    <Caixa titulo="Sua partida neste navegador">
      <p>O progresso fica salvo neste navegador e neste dispositivo. Limpar os dados do site apaga a partida; a navegação privada pode não guardá-la.</p>
      <p>Defesa: <b>C</b> ou botão direito do mouse. Esquiva: <b>Shift</b>.</p>
      <p>Clique dentro do jogo para usar o teclado. Veja os <a href="#/controles">controles</a>. No celular, prefira a tela deitada e abra em outra aba para ter mais espaço.</p>
    </Caixa>
    <p>Prefere instalar? <a href="#/download">Baixe a versão para Windows, Linux ou Android.</a></p>
  </>;
}
