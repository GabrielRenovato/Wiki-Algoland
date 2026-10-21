import { useEffect, useMemo, useState } from "react";
import Sprite from "./componentes/Sprite.jsx";
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

// Páginas da wiki: id (vai na URL), título, grupo do menu, ícone e palavras para a busca
const PAGINAS = [
  { id: "inicio", titulo: "Início", grupo: "Comece aqui", icone: HEROI, Pagina: Inicio, busca: "visão geral ciclo jogo" },
  { id: "jogar", titulo: "Jogar no navegador", grupo: "Comece aqui", icone: PORTAL, Pagina: Jogar, busca: "jogar online navegador web teste demo" },
  { id: "download", titulo: "Baixar o jogo", grupo: "Comece aqui", icone: PORTAL, Pagina: Download, busca: "download baixar instalar windows linux android apk exe" },
  { id: "patch", titulo: "Patch de atualizações", grupo: "Comece aqui", icone: BRASA, Pagina: Patch, busca: "patch novidades atualização versão changelog notas o que mudou correções pesca vara" },
  { id: "comecando", titulo: "Primeiros passos", grupo: "Comece aqui", icone: MORADORES.bento, Pagina: Comecando, busca: "prólogo tutorial novo jogo personagem criação" },
  { id: "controles", titulo: "Controles", grupo: "Comece aqui", icone: FERRAMENTAS.enxada, Pagina: Controles, busca: "teclas teclado controle xbox toque celular android botões" },
  { id: "vila", titulo: "Vila das Flores", grupo: "Mundo", icone: CASAS.venda, Pagina: Vila, busca: "cidade casas lojas mural pedidos missões festa" },
  { id: "mapa", titulo: "Mapa-múndi", grupo: "Mundo", icone: PORTAL, Pagina: Mapa, busca: "mapa mundo destinos praia palafita fazenda localização M R3" },
  { id: "pesca", titulo: "Pesca", grupo: "Mundo", icone: FERRAMENTAS.regador, Pagina: Pesca, busca: "pesca peixes vara nilo cais coleção desafios encomendas praia rio mar refinamento" },
  { id: "moradores", titulo: "Moradores", grupo: "Mundo", icone: MORADORES.lia, Pagina: Moradores, busca: "npc lia tomás rosa caio estela bento ivo nilo osvaldo helena clara amizade diálogo rotina folga" },
  { id: "tempo", titulo: "Tempo e calendário", grupo: "Mundo", icone: colhido([11, 5]), Pagina: Tempo, busca: "estação dia noite clima chuva neve dormir sono desmaio" },
  { id: "fazenda", titulo: "Fazenda", grupo: "Fazenda", icone: FERRAMENTAS.regador, Pagina: Fazenda, busca: "ferramentas enxada regador machadinha picareta entulho baú lago plantar galinheiro galinha galo ovos feno energia" },
  { id: "plantas", titulo: "Plantas", grupo: "Fazenda", icone: colhido([2, 6]), Pagina: Plantas, busca: "sementes cenoura batata morango tomate milho melancia abóbora uva berinjela beterraba girassol couve" },
  { id: "pocoes", titulo: "Poções", grupo: "Fazenda", icone: pocao([2, 2]), Pagina: Pocoes, busca: "caldeirão receitas cura força velocidade pedra vampírica fôlego" },
  { id: "refeicoes", titulo: "Refeições", grupo: "Fazenda", icone: colhido([20, 2]), Pagina: Refeicoes, busca: "caio cozinhar prato bônus vender colheita lia brasas sopa torta banquete" },
  { id: "arena", titulo: "Arena", grupo: "Arena", icone: PORTAL, Pagina: Arena, busca: "andares fenda caçada guardião orion portal totens saque eventos mímico ouro morte" },
  { id: "inimigos", titulo: "Inimigos", grupo: "Arena", icone: INIMIGOS.slime, Pagina: Inimigos, busca: "slime morcego vespa cogumelo flor caranguejo gremlin falcão esqueleto mutante" },
  { id: "chefes", titulo: "Chefes", grupo: "Arena", icone: CHEFES.dragao_vermelho, Pagina: Chefes, busca: "minotauro medusa goblin maromba cogumelo ancião dragão vermelho" },
  { id: "armas", titulo: "Armas e escudo", grupo: "Equipamento", icone: ARMAS.espada_basica, Pagina: Armas, busca: "espada lança machado arco escudo receitas fabricação Ivo materiais bigorna encantamento fogo gelo raio elétrico" },
  { id: "raridade", titulo: "Raridade", grupo: "Equipamento", icone: ARMAS.machado, Pagina: RaridadePagina, busca: "comum incomum raro épico lendário afixos drop venda" },
  { id: "armaduras", titulo: "Armaduras", grupo: "Equipamento", icone: CONJUNTOS.carrasco, Pagina: Armaduras, busca: "conjunto carrasco cavaleiro rubro mordomo moeda de forja ascensão elmo peitoral luvas botas" },
  { id: "progresso", titulo: "Brasas e progresso", grupo: "Progresso", icone: BRASA, Pagina: Progresso, busca: "brasas melhorias apoios curandeira bardo mística desafios morte" },
  { id: "coop", titulo: "Cooperativo", grupo: "Progresso", icone: CONJUNTOS.cavaleiro_rubro, Pagina: Cooperativo, busca: "dois jogadores tela dividida controle" },
  { id: "dicas", titulo: "Dicas e dúvidas", grupo: "Progresso", icone: MORADORES.mistica, Pagina: Dicas, busca: "faq perguntas" },
];
const GRUPOS = [...new Set(PAGINAS.map((p) => p.grupo))];

const lerRota = () => window.location.hash.replace(/^#\/?/, "") || "inicio";
const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [filtro, setFiltro] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota());
      setMenuAberto(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  const atual = PAGINAS.find((p) => p.id === rota) ?? PAGINAS[0];
  useEffect(() => {
    document.title = atual.id === "inicio" ? "AlgoLand Wiki" : `${atual.titulo} · AlgoLand Wiki`;
  }, [atual]);

  const visiveis = useMemo(() => {
    const f = semAcento(filtro.trim());
    if (!f) return PAGINAS;
    return PAGINAS.filter((p) => semAcento(`${p.titulo} ${p.busca}`).includes(f));
  }, [filtro]);

  const indice = PAGINAS.indexOf(atual);
  const anterior = PAGINAS[indice - 1];
  const proxima = PAGINAS[indice + 1];
  const { Pagina } = atual;

  return (
    <div className="app">
      <header className="topo">
        <button className="botao-menu" onClick={() => setMenuAberto((v) => !v)} aria-label="Abrir menu" aria-expanded={menuAberto}>☰</button>
        <a href="#/inicio" className="marca">
          <Sprite s={HEROI} escala={1} parado titulo="" />
          <span>AlgoLand <em>Wiki</em></span>
        </a>
      </header>

      <nav className={`lateral ${menuAberto ? "aberta" : ""}`}>
        <a href="#/download" className="lateral-baixar">⬇ Baixar o jogo</a>
        <input
          className="busca"
          type="search"
          placeholder="Buscar (ex.: melancia, medusa)"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        {GRUPOS.map((g) => {
          const itens = visiveis.filter((p) => p.grupo === g);
          if (!itens.length) return null;
          return (
            <div key={g} className="grupo">
              <p className="grupo-titulo">{g}</p>
              {itens.map((p) => (
                <a key={p.id} href={`#/${p.id}`} className={p.id === atual.id ? "ativo" : ""}>
                  <span className="icone"><Sprite s={p.icone} escala={iconeEscala(p.icone)} parado titulo="" /></span>
                  {p.titulo}
                </a>
              ))}
            </div>
          );
        })}
        {!visiveis.length && <p className="vazio">Nada encontrado.</p>}
      </nav>
      {menuAberto && <div className="veu" onClick={() => setMenuAberto(false)} />}

      <main className="conteudo">
        <Pagina />
        <footer className="rodape-pagina">
          {anterior ? <a href={`#/${anterior.id}`}>← {anterior.titulo}</a> : <span />}
          {proxima ? <a href={`#/${proxima.id}`}>{proxima.titulo} →</a> : <span />}
        </footer>
      </main>
    </div>
  );
}

// Ícones do menu cabem numa caixa de 28 px, seja qual for o tamanho do quadro
function iconeEscala(s) {
  return Math.min(28 / s.tam[0], 28 / s.tam[1]);
}
