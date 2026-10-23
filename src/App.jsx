import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

// Páginas da wiki: id (vai na URL), título, grupo do menu, ícone, resumo (busca e cartões) e palavras para a busca
export const PAGINAS = [
  { id: "inicio", titulo: "Início", grupo: "Comece aqui", icone: HEROI, Pagina: Inicio, resumo: "Visão geral do jogo", busca: "visão geral ciclo jogo" },
  { id: "jogar", titulo: "Jogar no navegador", grupo: "Comece aqui", icone: PORTAL, Pagina: Jogar, resumo: "Versão Web, sem instalar", busca: "jogar online navegador web teste demo" },
  { id: "download", titulo: "Baixar o jogo", grupo: "Comece aqui", icone: PORTAL, Pagina: Download, resumo: "Windows, Linux e Android", busca: "download baixar instalar windows linux android apk exe" },
  { id: "patch", titulo: "Patch de atualizações", grupo: "Comece aqui", icone: BRASA, Pagina: Patch, resumo: "O que mudou em cada versão", busca: "patch novidades atualização versão changelog notas o que mudou correções" },
  { id: "comecando", titulo: "Primeiros passos", grupo: "Comece aqui", icone: MORADORES.bento, Pagina: Comecando, resumo: "Prólogo, tutorial e primeiro dia", busca: "prólogo tutorial novo jogo personagem criação" },
  { id: "controles", titulo: "Controles", grupo: "Comece aqui", icone: FERRAMENTAS.enxada, Pagina: Controles, resumo: "Teclado, controle e toque", busca: "teclas teclado controle xbox toque celular android botões" },
  { id: "vila", titulo: "Vila das Flores", grupo: "Mundo", icone: CASAS.venda, Pagina: Vila, resumo: "Casas, lojas, mural e festa", busca: "cidade casas lojas mural pedidos missões festa" },
  { id: "mapa", titulo: "Mapa-múndi", grupo: "Mundo", icone: PORTAL, Pagina: Mapa, resumo: "Destinos e caminhos", busca: "mapa mundo destinos praia palafita fazenda localização M R3" },
  { id: "pesca", titulo: "Pesca", grupo: "Mundo", icone: FERRAMENTAS.regador, Pagina: Pesca, resumo: "Vara, peixes e coleção", busca: "pesca peixes vara nilo cais coleção desafios encomendas praia rio mar refinamento" },
  { id: "moradores", titulo: "Moradores", grupo: "Mundo", icone: MORADORES.lia, Pagina: Moradores, resumo: "Rotinas, amizade e diálogos", busca: "npc lia tomás rosa caio estela bento ivo nilo osvaldo helena clara amizade diálogo rotina folga" },
  { id: "tempo", titulo: "Tempo e calendário", grupo: "Mundo", icone: colhido([11, 5]), Pagina: Tempo, resumo: "Estações, clima e sono", busca: "estação dia noite clima chuva neve dormir sono desmaio" },
  { id: "fazenda", titulo: "Fazenda", grupo: "Fazenda", icone: FERRAMENTAS.regador, Pagina: Fazenda, resumo: "Ferramentas, solo, baú e galinheiro", busca: "ferramentas enxada regador machadinha picareta entulho baú lago plantar galinheiro galinha galo ovos feno energia" },
  { id: "plantas", titulo: "Plantas", grupo: "Fazenda", icone: colhido([2, 6]), Pagina: Plantas, resumo: "Sementes de cada estação", busca: "sementes cenoura batata morango tomate milho melancia abóbora uva berinjela beterraba girassol couve" },
  { id: "pocoes", titulo: "Poções", grupo: "Fazenda", icone: pocao([2, 2]), Pagina: Pocoes, resumo: "Receitas do caldeirão", busca: "caldeirão receitas cura força velocidade pedra vampírica fôlego" },
  { id: "refeicoes", titulo: "Refeições", grupo: "Fazenda", icone: colhido([20, 2]), Pagina: Refeicoes, resumo: "Pratos do Caio e bônus", busca: "caio cozinhar prato bônus vender colheita lia brasas sopa torta banquete" },
  { id: "arena", titulo: "Arena", grupo: "Arena", icone: PORTAL, Pagina: Arena, resumo: "Andares, caçadas e eventos", busca: "andares fenda caçada guardião orion portal totens saque eventos mímico ouro morte" },
  { id: "inimigos", titulo: "Inimigos", grupo: "Arena", icone: INIMIGOS.slime, Pagina: Inimigos, resumo: "Monstros comuns e mutantes", busca: "slime morcego vespa cogumelo flor caranguejo gremlin falcão esqueleto mutante" },
  { id: "chefes", titulo: "Chefes", grupo: "Arena", icone: CHEFES.dragao_vermelho, Pagina: Chefes, resumo: "Guardiões e seus golpes", busca: "minotauro medusa goblin maromba cogumelo ancião dragão vermelho" },
  { id: "armas", titulo: "Armas e escudo", grupo: "Equipamento", icone: ARMAS.espada_basica, Pagina: Armas, resumo: "Fabricação, níveis e encantos", busca: "espada lança machado arco escudo receitas fabricação Ivo materiais bigorna encantamento fogo gelo raio elétrico" },
  { id: "raridade", titulo: "Raridade", grupo: "Equipamento", icone: ARMAS.machado, Pagina: RaridadePagina, resumo: "Do comum ao lendário", busca: "comum incomum raro épico lendário afixos drop venda" },
  { id: "armaduras", titulo: "Armaduras", grupo: "Equipamento", icone: CONJUNTOS.carrasco, Pagina: Armaduras, resumo: "Conjuntos e peças", busca: "conjunto carrasco cavaleiro rubro mordomo moeda de forja ascensão elmo peitoral luvas botas" },
  { id: "progresso", titulo: "Brasas e progresso", grupo: "Progresso", icone: BRASA, Pagina: Progresso, resumo: "Melhorias permanentes", busca: "brasas melhorias apoios curandeira bardo mística desafios morte" },
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

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [menuAberto, setMenuAberto] = useState(false);
  const [paletaAberta, setPaletaAberta] = useState(false);
  const [tema, setTema] = useState(() => lerPreferencia("wiki-tema", "dark"));
  const [fechados, setFechados] = useState(() => new Set(JSON.parse(lerPreferencia("wiki-grupos-fechados", "[]"))));
  const conteudoRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    gravarPreferencia("wiki-tema", tema);
  }, [tema]);

  useEffect(() => {
    const aoMudar = () => {
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

  return (
    <>
      <header className="topo">
        <button className="botao-icone botao-menu" onClick={() => setMenuAberto(true)} aria-label="Abrir menu" aria-expanded={menuAberto}><IconeMenu /></button>
        <a href="#/inicio" className="marca">
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
        <nav className={`lateral ${menuAberto ? "aberta" : ""}`} aria-label="Páginas da wiki">
          <div className="lateral-cabeca">
            <a href="#/inicio" className="marca"><span>AlgoLand <em>Wiki</em></span></a>
            <button className="botao-icone" onClick={() => setMenuAberto(false)} aria-label="Fechar menu"><IconeFechar /></button>
          </div>
          <a href="#/download" className="lateral-baixar">⬇ Baixar o jogo</a>
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
          <Pagina key={atual.id} />
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

      {paletaAberta && <Paleta aoFechar={() => setPaletaAberta(false)} />}
    </>
  );
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
        <input autoFocus type="search" placeholder="Buscar páginas (ex.: melancia, medusa, chat)" value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={tecla} />
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
