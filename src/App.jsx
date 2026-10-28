import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Personalizacao, Mercado, Duelo, Transferencia } from './paginas/Atual.jsx';
import Sprite from "./componentes/Sprite.jsx";
import { ancora } from "./componentes/ui.jsx";
import { HEROI, MORADORES, CASAS, FERRAMENTAS, PORTAL, INIMIGOS, CHEFES, ARMAS, CONJUNTOS, BRASA, colhido, pocao } from "./sprites.js";
import { Inicio, Controles, Comecando, Tempo, Cooperativo, Dicas } from "./paginas/Geral.jsx";
import { Vila, Moradores } from "./paginas/Vila.jsx";
import { Fazenda, Plantas, Pocoes, Refeicoes } from "./paginas/Fazenda.jsx";
import { Arena, Inimigos, Chefes } from "./paginas/Arena.jsx";
import { Armas, RaridadePagina, Armaduras } from "./paginas/Equipamento.jsx";
import { Progresso } from "./paginas/Progresso.jsx";
import { Download } from "./paginas/Download.jsx";
import { Jogar } from "./paginas/Jogar.jsx";
import { Pesca } from "./paginas/Pesca.jsx";
import { Mapa } from "./paginas/Mapa.jsx";
import { Patch } from "./paginas/Patch.jsx";
import { Online, Ranking, Combate, Floresta, Limiar } from "./paginas/Novas.jsx";

// Páginas da wiki: id (vai na URL), título, grupo do menu, ícone, resumo (busca e cartões) e palavras para a busca
export const PAGINAS = [
  { id: "inicio", titulo: "Início", grupo: "Comece aqui", icone: HEROI, Pagina: Inicio, resumo: "Visão geral do jogo", busca: "visão geral ciclo jogo" },
  { id: "jogar", titulo: "Jogar no navegador", grupo: "Comece aqui", icone: PORTAL, Pagina: Jogar, resumo: "Versão Web, sem instalar", busca: "jogar online navegador web teste demo" },
  { id: "download", titulo: "Baixar o jogo", grupo: "Comece aqui", icone: PORTAL, Pagina: Download, resumo: "Windows, Linux e Android", busca: "download baixar instalar windows linux android apk exe" },
  { id: "patch", titulo: "Patch de atualizações", grupo: "Comece aqui", icone: BRASA, Pagina: Patch, resumo: "O que mudou em cada versão", busca: "patch novidades atualização versão changelog notas o que mudou correções" },
  { id: "aparencia", titulo: "Personagem e aparência", grupo: "Comece aqui", icone: HEROI, Pagina: Personalizacao, resumo: "Visual atual, roupas, cabelos e cores", busca: "3d pixel art personagem visual criar editar roupa camisa calça saia botas cabelo tintura pele olhos" },
  { id: "transferencia", titulo: "Transferir save", grupo: "Comece aqui", icone: HEROI, Pagina: Transferencia, resumo: "Levar a partida para outro aparelho", busca: "save salvar transferir enviar receber código pc android navegador backup" },
  { id: "comecando", titulo: "Primeiros passos", grupo: "Comece aqui", icone: MORADORES.bento, Pagina: Comecando, resumo: "Prólogo, tutorial e primeiro dia", busca: "prólogo tutorial novo jogo personagem criação" },
  { id: "controles", titulo: "Controles", grupo: "Comece aqui", icone: FERRAMENTAS.enxada, Pagina: Controles, resumo: "Teclado, controle e toque", busca: "teclas teclado controle xbox toque celular android botões" },
  { id: "vila", titulo: "Vila das Flores", grupo: "Mundo", icone: CASAS.venda, Pagina: Vila, resumo: "Casas, lojas, mural e festa", busca: "cidade casas lojas mural pedidos missões festa" },
  { id: "limiar", titulo: "Arco do Limiar e eventos", grupo: "Mundo", icone: CASAS.sede, Pagina: Limiar, novo: true, resumo: "História principal, festa e cartas", busca: "história missão principal limiar selo fonte energia lia bento ivo estela festa sábado taverna pombo correio carta pedido" },
  { id: "mapa", titulo: "Mapa-múndi", grupo: "Mundo", icone: PORTAL, Pagina: Mapa, resumo: "Destinos e caminhos", busca: "mapa mundo destinos praia palafita fazenda localização M R3" },
  { id: "floresta", titulo: "Floresta", grupo: "Mundo", icone: FERRAMENTAS.machadinha, Pagina: Floresta, novo: true, resumo: "Pedreira, lago e fauna", busca: "floresta caminho pedreira lago pesca lenhadores cervo coelho capivara corvo animais fauna carvalho abeto" },
  { id: "pesca", titulo: "Pesca", grupo: "Mundo", icone: FERRAMENTAS.regador, Pagina: Pesca, resumo: "Vara, peixes e coleção", busca: "pesca peixes vara nilo cais coleção desafios encomendas praia rio mar refinamento" },
  { id: "moradores", titulo: "Moradores", grupo: "Mundo", icone: MORADORES.lia, Pagina: Moradores, resumo: "Rotinas, amizade e diálogos", busca: "npc lia tomás rosa caio estela bento ivo nilo osvaldo helena clara amizade diálogo rotina folga" },
  { id: "online", titulo: "Online e chat", grupo: "Mundo", icone: MORADORES.bardo, Pagina: Online, novo: true, resumo: "Outros jogadores na praça", busca: "online multiplayer chat conversar mensagem lobby jogadores sala balão enter" },
  { id: "mercado", titulo: "Mercado entre jogadores", grupo: "Mundo", icone: BRASA, Pagina: Mercado, resumo: "Comprar, vender e receber entregas", busca: "mercado leilão vender comprar anúncio brasas correio quantidade preço taxa mural" },
  { id: "tempo", titulo: "Tempo e calendário", grupo: "Mundo", icone: colhido([11, 5]), Pagina: Tempo, resumo: "Estações, clima e sono", busca: "estação dia noite clima chuva neve dormir sono desmaio" },
  { id: "fazenda", titulo: "Fazenda", grupo: "Fazenda", icone: FERRAMENTAS.regador, Pagina: Fazenda, resumo: "Ferramentas, solo, baú e galinheiro", busca: "ferramentas enxada regador machadinha picareta entulho baú lago plantar galinheiro galinha galo ovos feno energia" },
  { id: "plantas", titulo: "Plantas", grupo: "Fazenda", icone: colhido([2, 6]), Pagina: Plantas, resumo: "Sementes de cada estação", busca: "sementes cenoura batata morango tomate milho melancia abóbora uva berinjela beterraba girassol couve" },
  { id: "pocoes", titulo: "Poções", grupo: "Fazenda", icone: pocao([2, 2]), Pagina: Pocoes, resumo: "Receitas do caldeirão", busca: "caldeirão receitas cura força velocidade pedra vampírica fôlego" },
  { id: "refeicoes", titulo: "Refeições", grupo: "Fazenda", icone: colhido([20, 2]), Pagina: Refeicoes, resumo: "Pratos do Caio e bônus", busca: "caio cozinhar prato bônus vender colheita lia brasas sopa torta banquete" },
  { id: "combate", titulo: "Combate", grupo: "Arena", icone: ARMAS.espada_gemea, Pagina: Combate, novo: true, resumo: "Esquiva, aparo e especialidades", busca: "combate ataque esquiva dash estamina defesa aparo perfeito bloqueio escudada especialidade arma combo petrificação" },
  { id: "duelo", titulo: "Duelo online", grupo: "Arena", icone: ARMAS.espada_gemea, Pagina: Duelo, resumo: "Salas, senha e melhor de três", busca: "pvp duelo online sala senha pronto começar um contra um melhor três" },
  { id: "arena", titulo: "Arena", grupo: "Arena", icone: PORTAL, Pagina: Arena, resumo: "Andares, caçadas e eventos", busca: "andares fenda caçada guardião orion portal totens saque eventos mímico ouro morte" },
  { id: "inimigos", titulo: "Inimigos", grupo: "Arena", icone: INIMIGOS.slime, Pagina: Inimigos, resumo: "Monstros comuns e mutantes", busca: "slime morcego vespa cogumelo flor caranguejo gremlin falcão esqueleto mutante" },
  { id: "chefes", titulo: "Chefes", grupo: "Arena", icone: CHEFES.dragao_vermelho, Pagina: Chefes, resumo: "Guardiões e seus golpes", busca: "minotauro medusa goblin maromba cogumelo ancião dragão vermelho" },
  { id: "armas", titulo: "Armas e escudo", grupo: "Equipamento", icone: ARMAS.espada_basica, Pagina: Armas, resumo: "Fabricação, níveis e encantos", busca: "espada lança machado arco escudo receitas fabricação Ivo materiais bigorna encantamento fogo gelo raio elétrico" },
  { id: "raridade", titulo: "Raridade", grupo: "Equipamento", icone: ARMAS.machado, Pagina: RaridadePagina, resumo: "Do comum ao lendário", busca: "comum incomum raro épico lendário afixos drop venda" },
  { id: "armaduras", titulo: "Armaduras", grupo: "Equipamento", icone: CONJUNTOS.carrasco, Pagina: Armaduras, resumo: "Conjuntos e peças", busca: "conjunto carrasco cavaleiro rubro mordomo moeda de forja ascensão elmo peitoral luvas botas" },
  { id: "progresso", titulo: "Brasas e progresso", grupo: "Progresso", icone: BRASA, Pagina: Progresso, resumo: "Melhorias permanentes", busca: "brasas melhorias apoios curandeira bardo mística desafios morte" },
  { id: "ranking", titulo: "Ranking e pódio", grupo: "Progresso", icone: CONJUNTOS.cavalheiro, Pagina: Ranking, novo: true, resumo: "Placar global e pódio", busca: "ranking placar top 15 pódio apelido temporada andar recorde" },
  { id: "coop", titulo: "Cooperativo", grupo: "Progresso", icone: CONJUNTOS.cavaleiro_rubro, Pagina: Cooperativo, resumo: "Dois jogadores, tela dividida", busca: "dois jogadores tela dividida controle" },
  { id: "dicas", titulo: "Dicas e dúvidas", grupo: "Progresso", icone: MORADORES.mistica, Pagina: Dicas, resumo: "Perguntas frequentes", busca: "faq perguntas" },
];
const GRUPOS = [...new Set(PAGINAS.map((p) => p.grupo))];

const lerRota = () => window.location.hash.replace(/^#\/?/, "") || "inicio";
const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Preferências pequenas do visitante; o site funciona igual sem armazenamento
const lerPreferencia = (chave, padrao) => {
  try { return localStorage.getItem(chave) ?? padrao; } catch { return padrao; }
};
const gravarPreferencia = (chave, valor) => {
  try { localStorage.setItem(chave, valor); } catch { /* armazenamento indisponível */ }
};

const IconeBusca = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
const IconeMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
const IconeFechar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
);
const IconeSol = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
const IconeLua = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
const IconeVoltar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
);
const IconeCasa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></svg>
);
const IconeGrade = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></svg>
);
const IconeControle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 7h10a5 5 0 0 1 4.6 7l-1 2.3a2.6 2.6 0 0 1-4.3.7L14.6 15H9.4l-1.7 2a2.6 2.6 0 0 1-4.3-.7l-1-2.3A5 5 0 0 1 7 7z" /><path d="M8 10v3M6.5 11.5h3M15.5 11h.01M17.5 12.5h.01" /></svg>
);
const IconeBaixar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></svg>
);

// Cor da barra do navegador (e da barra de status no app instalado) segue o tema
const corDaBarra = () => getComputedStyle(document.documentElement).getPropertyValue("--fundo").trim();

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [menuAberto, setMenuAberto] = useState(false);
  const [paletaAberta, setPaletaAberta] = useState(false);
  const [tema, setTema] = useState(() => lerPreferencia("wiki-tema", "dark"));
  const [fechados, setFechados] = useState(() => new Set(JSON.parse(lerPreferencia("wiki-grupos-fechados", "[]"))));
  const [rolou, setRolou] = useState(false);
  const conteudoRef = useRef(null);
  const lateralRef = useRef(null);
  const navegou = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    gravarPreferencia("wiki-tema", tema);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", corDaBarra());
  }, [tema]);

  // No celular o título da página aparece na barra de cima depois que o título grande sai da tela
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 70);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Com a gaveta ou a busca abertas, a página por trás não rola
  useEffect(() => {
    document.body.classList.toggle("travado", menuAberto || paletaAberta);
    if (menuAberto) lateralRef.current?.querySelector(".item.ativo")?.scrollIntoView({ block: "center" });
  }, [menuAberto, paletaAberta]);

  useEffect(() => {
    const aoMudar = () => {
      navegou.current += 1;
      setRota(lerRota());
      setMenuAberto(false);
      setPaletaAberta(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  // Ctrl+K ou / abrem a busca; Esc fecha o que estiver aberto
  useEffect(() => {
    const tecla = (e) => {
      const digitando = /input|textarea|select/i.test(document.activeElement?.tagName ?? "");
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !digitando)) {
        e.preventDefault();
        setPaletaAberta(true);
      } else if (e.key === "Escape") {
        setPaletaAberta(false);
        setMenuAberto(false);
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, []);

  const atual = PAGINAS.find((p) => p.id === rota) ?? PAGINAS[0];
  useEffect(() => {
    document.title = atual.id === "inicio" ? "AlgoLand Wiki" : `${atual.titulo} · AlgoLand Wiki`;
  }, [atual]);

  const alternarGrupo = useCallback((g) => {
    setFechados((antes) => {
      const novo = new Set(antes);
      novo.has(g) ? novo.delete(g) : novo.add(g);
      gravarPreferencia("wiki-grupos-fechados", JSON.stringify([...novo]));
      return novo;
    });
  }, []);

  const indice = PAGINAS.indexOf(atual);
  const anterior = PAGINAS[indice - 1];
  const proxima = PAGINAS[indice + 1];
  const { Pagina } = atual;
  // Voltar do app: volta no histórico da wiki; quem abriu direto numa página vai para o início
  const voltar = () => (navegou.current > 0 ? window.history.back() : (window.location.hash = "#/inicio"));
  const abaPaginas = menuAberto || (!paletaAberta && !["inicio", "jogar", "download"].includes(atual.id));

  return (
    <>
      <header className="topo">
        <button className="botao-icone botao-menu" onClick={() => setMenuAberto(true)} aria-label="Abrir menu" aria-expanded={menuAberto}><IconeMenu /></button>
        {atual.id !== "inicio" && <button className="botao-voltar" onClick={voltar} aria-label="Voltar"><IconeVoltar /></button>}
        {atual.id !== "inicio" && <span className={`topo-titulo ${rolou ? "visivel" : ""}`} aria-hidden>{atual.titulo}</span>}
        <a href="#/inicio" className={`marca ${atual.id !== "inicio" ? "marca-secundaria" : ""}`}>
          <span className="marca-icone"><Sprite s={HEROI} escala={1} parado titulo="" /></span>
          <span>AlgoLand <em>Wiki</em></span>
        </a>
        <div className="topo-espaco" />
        <button className="busca-gatilho" onClick={() => setPaletaAberta(true)} aria-label="Buscar na wiki">
          <IconeBusca />
          <span>Buscar na wiki…</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button className="botao-icone" onClick={() => setTema((t) => (t === "dark" ? "light" : "dark"))} aria-label={tema === "dark" ? "Usar tema claro" : "Usar tema escuro"} title={tema === "dark" ? "Tema claro" : "Tema escuro"}>
          {tema === "dark" ? <IconeSol /> : <IconeLua />}
        </button>
        <a href="#/download" className="botao topo-baixar">⬇ Baixar</a>
      </header>

      <div className="app">
        <nav className={`lateral ${menuAberto ? "aberta" : ""}`} aria-label="Páginas da wiki" ref={lateralRef}>
          <div className="lateral-alca" aria-hidden />
          <div className="lateral-cabeca">
            <b>Páginas</b>
            <button className="botao-icone" onClick={() => setMenuAberto(false)} aria-label="Fechar menu"><IconeFechar /></button>
          </div>
          <InstalarApp />
          {GRUPOS.map((g) => (
            <div key={g} className={`grupo ${fechados.has(g) && g !== atual.grupo ? "fechado" : ""}`}>
              <button className="grupo-titulo" onClick={() => alternarGrupo(g)} aria-expanded={!fechados.has(g)}>
                {g} <i aria-hidden>▾</i>
              </button>
              <div className="grupo-itens">
                {PAGINAS.filter((p) => p.grupo === g).map((p) => (
                  <a key={p.id} href={`#/${p.id}`} className={`item ${p.id === atual.id ? "ativo" : ""}`} aria-current={p.id === atual.id ? "page" : undefined}>
                    <span className="icone"><Sprite s={p.icone} escala={iconeEscala(p.icone)} parado titulo="" /></span>
                    {p.titulo}
                    {p.novo && <span className="novo">NOVO</span>}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        {menuAberto && <div className="veu" onClick={() => setMenuAberto(false)} />}

        <main className="conteudo" ref={conteudoRef}>
          {atual.id !== "inicio" && (
            <p className="migalhas">
              <a href="#/inicio">Início</a> <span aria-hidden>›</span> <span>{atual.grupo}</span>
            </p>
          )}
          <div className="pagina-entrada" key={atual.id}><Pagina /></div>
          <footer className="rodape-pagina">
            {anterior && (
              <a href={`#/${anterior.id}`}>
                <small>← Anterior</small>
                <b>{anterior.titulo}</b>
              </a>
            )}
            {proxima && (
              <a href={`#/${proxima.id}`} className="proxima">
                <small>Próxima →</small>
                <b>{proxima.titulo}</b>
              </a>
            )}
          </footer>
          <p className="creditos">AlgoLand Wiki · feita pela comunidade do jogo. As artes pertencem aos pacotes usados no jogo.</p>
        </main>

        <Sumario rota={atual.id} conteudoRef={conteudoRef} />
      </div>

      <nav className="abas" aria-label="Navegação principal">
        <a href="#/inicio" className={atual.id === "inicio" && !menuAberto && !paletaAberta ? "ativa" : ""}><IconeCasa /><span>Início</span></a>
        <button className={abaPaginas ? "ativa" : ""} onClick={() => { setPaletaAberta(false); setMenuAberto(true); }} aria-expanded={menuAberto}><IconeGrade /><span>Páginas</span></button>
        <button className={paletaAberta ? "ativa" : ""} onClick={() => { setMenuAberto(false); setPaletaAberta(true); }}><IconeBusca /><span>Buscar</span></button>
        <a href="#/jogar" className={atual.id === "jogar" && !menuAberto && !paletaAberta ? "ativa" : ""}><IconeControle /><span>Jogar</span></a>
        <a href="#/download" className={atual.id === "download" && !menuAberto && !paletaAberta ? "ativa" : ""}><IconeBaixar /><span>Baixar</span></a>
      </nav>

      {paletaAberta && <Paleta aoFechar={() => setPaletaAberta(false)} />}
    </>
  );
}

/** Convite para instalar a wiki como app: botão onde o navegador oferece, instrução no iPhone e iPad. */
function InstalarApp() {
  const [pedido, setPedido] = useState(null);
  const [instalado, setInstalado] = useState(() => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);

  useEffect(() => {
    const oferecido = (e) => { e.preventDefault(); setPedido(e); };
    const feito = () => { setInstalado(true); setPedido(null); };
    window.addEventListener("beforeinstallprompt", oferecido);
    window.addEventListener("appinstalled", feito);
    return () => {
      window.removeEventListener("beforeinstallprompt", oferecido);
      window.removeEventListener("appinstalled", feito);
    };
  }, []);

  if (instalado) return null;
  if (pedido) {
    const instalar = async () => {
      pedido.prompt();
      await pedido.userChoice.catch(() => {});
      setPedido(null);
    };
    return <button className="instalar" onClick={instalar}>📲 Instalar o app da wiki</button>;
  }
  if (/iphone|ipad|ipod/i.test(window.navigator.userAgent)) {
    return <p className="instalar-dica">📲 Use como app: toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.</p>;
  }
  return null;
}

/** "Nesta página": lista os títulos das seções e destaca a que está na tela. */
function Sumario({ rota, conteudoRef }) {
  const [itens, setItens] = useState([]);
  const [ativo, setAtivo] = useState("");

  useEffect(() => {
    const raiz = conteudoRef.current;
    if (!raiz) return;
    // Cada título ganha um id próprio e único (seções sem título fixo, moradores e chefes também entram)
    const usados = new Set();
    const lista = [...raiz.querySelectorAll(".secao > h2, .morador h2, .chefe h2")].map((h) => {
      const daSecao = h.parentElement?.matches(".secao[id]") ? h.parentElement.id : "";
      let id = h.id || (daSecao ? `${daSecao}-titulo` : ancora(h.textContent)) || "secao";
      while (usados.has(id)) id += "-2";
      usados.add(id);
      h.id = id;
      return { id, texto: h.textContent };
    });
    setItens(lista);
    if (!lista.length) return;
    setAtivo(lista[0].id);
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    lista.forEach(({ id }) => { const no = document.getElementById(id); if (no) observador.observe(no); });
    return () => observador.disconnect();
  }, [rota, conteudoRef]);

  if (itens.length < 2) return <aside className="sumario" aria-hidden />;
  return (
    <aside className="sumario" aria-label="Nesta página">
      <p>Nesta página</p>
      {itens.map((item) => (
        <button key={item.id} className={item.id === ativo ? "ativo" : ""} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}>
          {item.texto}
        </button>
      ))}
    </aside>
  );
}

/** Busca rápida (Ctrl+K): filtra páginas pelo título, resumo e palavras-chave; setas e Enter escolhem. */
function Paleta({ aoFechar }) {
  const [texto, setTexto] = useState("");
  const [selecionado, setSelecionado] = useState(0);
  const lista = useRef(null);

  const resultados = useMemo(() => {
    const f = semAcento(texto.trim());
    if (!f) return PAGINAS;
    const termos = f.split(/\s+/);
    return PAGINAS
      .map((p) => {
        const titulo = semAcento(p.titulo);
        const tudo = semAcento(`${p.titulo} ${p.resumo} ${p.busca} ${p.grupo}`);
        if (!termos.every((t) => tudo.includes(t))) return null;
        return { p, peso: termos.reduce((s, t) => s + (titulo.startsWith(t) ? 3 : titulo.includes(t) ? 2 : 1), 0) };
      })
      .filter(Boolean)
      .sort((a, b) => b.peso - a.peso)
      .map((r) => r.p);
  }, [texto]);

  useEffect(() => setSelecionado(0), [texto]);
  useEffect(() => {
    lista.current?.querySelector(".selecionado")?.scrollIntoView({ block: "nearest" });
  }, [selecionado]);

  const tecla = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelecionado((i) => Math.min(i + 1, resultados.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelecionado((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && resultados[selecionado]) { window.location.hash = `#/${resultados[selecionado].id}`; aoFechar(); }
  };

  return (
    <div className="paleta-veu" onMouseDown={(e) => e.target === e.currentTarget && aoFechar()}>
      <div className="paleta" role="dialog" aria-modal="true" aria-label="Buscar na wiki">
        <div className="paleta-cabeca">
          <input autoFocus type="search" enterKeyHint="go" placeholder="Buscar páginas (ex.: melancia, medusa, chat)" value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={tecla} />
          <button type="button" className="paleta-cancelar" onClick={aoFechar}>Cancelar</button>
        </div>
        <ul ref={lista}>
          {resultados.map((p, i) => (
            <li key={p.id} className={i === selecionado ? "selecionado" : ""} onMouseEnter={() => setSelecionado(i)}>
              <a href={`#/${p.id}`} onClick={aoFechar}>
                <span className="icone"><Sprite s={p.icone} escala={iconeEscala(p.icone)} parado titulo="" /></span>
                {p.titulo}
                <small>{p.grupo}</small>
              </a>
            </li>
          ))}
        </ul>
        {!resultados.length && <p className="paleta-vazio">Nada encontrado para “{texto}”.</p>}
        <p className="paleta-dica"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> fechar</span></p>
      </div>
    </div>
  );
}

// Ícones do menu cabem numa caixa de 28 px, seja qual for o tamanho do quadro
export function iconeEscala(s) {
  return Math.min(28 / s.tam[0], 28 / s.tam[1]);
}
