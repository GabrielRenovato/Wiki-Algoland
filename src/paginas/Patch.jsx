import { Titulo, Secao, Caixa, Link } from "../componentes/ui.jsx";

// Histórico de atualizações do jogo, da mais nova para a mais antiga. Cada versão tem três listas opcionais:
// novo (o que chegou), melhorou (o que mudou) e corrigido (bugs que acabaram).
const PATCHES = [
  {
    versao: "0.3",
    data: "17 de outubro de 2026",
    resumo: "A pesca chega ao jogo, a vara vira item da mochila e a vila fica mais fácil de percorrer.",
    novo: [
      <><b>Pesca jogável.</b> Quatro pontos no pier da praia: aperte <b>F</b> (ou A no controle) para lançar a linha, espere o <b>"!"</b> e aperte na hora certa.</>,
      <><b>Minigame de fisgada.</b> Um ponteiro gira no círculo; acerte a zona amarela (ou a branca, que vale mais) para encher a barra. Errar esvazia. Quanto mais difícil o peixe, mais rápido o ponteiro e menor a zona.</>,
      <><b>Peixes por raridade e estação.</b> Comum, incomum, raro e épico, com peixes de mar e de rio. Alguns só aparecem em certas estações. Veja a lista completa no catálogo do Nilo.</>,
      <><b>Venda ao Nilo.</b> Ele compra os peixes em Brasas e mostra no catálogo quantos você já pescou de cada um.</>,
      <><b>Vara de pesca como item.</b> Ela aparece na mochila de cada jogador, nos saves antigos também. O nível (1 a 5) e a cor mudam com o refinamento: comum, incomum, raro, épico e lendário.</>,
      <><b>Placas de destino.</b> Chegue perto de uma placa na trilha da fazenda, na praia ou na vila e o nome do lugar aparece em cima dela, como o balão dos moradores.</>,
    ],
    melhorou: [
      <><b>Trilha da fazenda sem botão.</b> Correr pela borda da vila leva direto à fazenda, e o mesmo vale na volta, com o efeito de passagem de sempre.</>,
      <><b>Pedido pronto abre a entrega.</b> Falar com um morador que tem um pedido concluído abre direto a tela do pedido, com o botão ENTREGAR liberado.</>,
      <><b>Balão de pedido pronto.</b> Fica centralizado em cima da cabeça do morador e sai da frente dos balões de conversa, inclusive os de papo entre vizinhos.</>,
      <><b>Equipar no celular.</b> Dois toques num item equipam ou desequipam, no lugar do clique direito. A aljava também equipa assim.</>,
    ],
    corrigido: [
      <>A <b>aljava</b> não aparecia em saves antigos, e sem ela o arco não equipava. Agora o jogo devolve uma ao carregar.</>,
      <>O jogo travava ao clicar em <b>VER DESAFIOS</b> no inventário de pesca.</>,
      <>O <b>balão de papo</b> entre vizinhos chegava a ficar com quase mil pixels de altura quando o texto era longo.</>,
    ],
  },
  {
    versao: "0.2",
    data: "16 de outubro de 2026",
    resumo: "A fazenda passa a ajudar na arena e o cooperativo local recebe uma rodada grande de correções.",
    novo: [
      <><b>Refeições do Caio.</b> Cozinhe com a colheita e o prato vale a próxima partida inteira na arena. Veja os pratos em <Link para="refeicoes">Refeições</Link>.</>,
      <><b>Venda de colheita à Lia.</b> Troque o que você colheu por Brasas, de 3 a 9 por unidade.</>,
      <><b>Download na wiki.</b> A página <Link para="download">Baixar o jogo</Link> traz os builds para Windows, Linux e Android.</>,
    ],
    melhorou: [
      <>O <b>cooperativo</b> ganhou disputa de interação por jogador: cada um vê o <b>F</b> só do que está perto dele, e o banco vazio tem prioridade sobre o morador sentado ao lado.</>,
      <>A <b>festa de sábado</b> na taverna da pousada senta os seis moradores em duplas nas mesas.</>,
      <>Dormir no co-op espera o outro jogador: quem deita primeiro aguarda, e o dia só passa quando os dois estão na cama.</>,
    ],
    corrigido: [
      <>O jogador 2 não conseguia sentar na taverna, e o aviso de F aparecia para todo mundo.</>,
      <>O taverneiro travava depois que os dois jogadores sentavam.</>,
      <>Trocar de ferramenta no controle não funcionava, e a pausa travava o jogo no co-op.</>,
      <>Depois de dormir em dupla o relógio ficava em 22h e o mapa continuava escuro.</>,
    ],
  },
];

const Lista = ({ titulo, itens }) =>
  itens && itens.length > 0 ? (
    <>
      <h3 className="patch-titulo">{titulo}</h3>
      <ul className="lista">
        {itens.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  ) : null;

export function Patch() {
  const [recente, ...antigos] = PATCHES;
  return (
    <>
      <Titulo sub="Tudo o que mudou no jogo, da versão mais nova para a mais antiga.">Patch de atualizações</Titulo>
      <Secao>
        <Caixa tipo="nota" titulo={`Versão atual: ${recente.versao}`}>
          {recente.data}. {recente.resumo} Baixe a versão nova em <Link para="download">Baixar o jogo</Link>.
        </Caixa>
      </Secao>
      {[recente, ...antigos].map((p) => (
        <Secao key={p.versao} titulo={`Versão ${p.versao} · ${p.data}`} id={`v${p.versao.replace(".", "-")}`}>
          <p>{p.resumo}</p>
          <Lista titulo="Novo" itens={p.novo} />
          <Lista titulo="Melhorias" itens={p.melhorou} />
          <Lista titulo="Correções" itens={p.corrigido} />
        </Secao>
      ))}
      <Caixa tipo="aviso" titulo="Saves">
        O jogo ainda está em construção. Se um patch avisar que o save mudou, faça uma cópia da pasta de saves antes de atualizar.
      </Caixa>
    </>
  );
}
