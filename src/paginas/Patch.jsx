import { Titulo, Secao, Caixa, Link } from "../componentes/ui.jsx";

// Histórico de atualizações do jogo, da mais nova para a mais antiga. Cada versão tem três listas opcionais:
// novo (o que chegou), melhorou (o que mudou) e corrigido (bugs que acabaram).
const PATCHES = [
  {
    versao: "2026.10.22.3",
    data: "22 de outubro de 2026",
    resumo: "Cidade mais leve no celular, atualização automática de conteúdo no Android, versão Web que baixa mais rápido e ajustes nos móveis das casas.",
    novo: [
      <><b>Atualização automática (Android).</b> Ao abrir o jogo, ele procura uma atualização de conteúdo e baixa sozinha, sem reinstalar o app. Os arquivos são conferidos por assinatura antes de usar; sem internet, o jogo abre normalmente. Mudanças no motor ainda pedem um APK novo, e o jogo avisa.</>,
    ],
    melhorou: [
      <><b>Cidade mais leve no celular.</b> O personagem deixou de refazer a conta de aparência a cada quadro e a fonte da praça só simula a água quando está na tela, o que reduz bastante o trabalho por quadro na vila.</>,
      <><b>Versão Web mais rápida.</b> Download do jogo em partes paralelas, guardado no navegador para as próximas visitas, e pacote menor, sem arquivos de produção que o jogo não usa.</>,
      <><b>Lago da fazenda.</b> Deixou de redesenhar a cada quadro quando a água é a versão nova.</>,
    ],
    corrigido: [
      <>Móveis mal posicionados: cadeiras da carpintaria alinhadas à mesa e planta da pousada afastada do banco ao lado.</>,
      <>Poltronas pequenas que não dava para sentar foram removidas da pousada e da casa da Estela.</>,
    ],
  },
  {
    versao: "2026.10.22.2",
    data: "22 de outubro de 2026",
    resumo: "Interfaces no padrão dos cenários, ferraria com processo animado e correções na enfermaria, nas camas e na pesca.",
    novo: [
      <><b>Ferraria em funcionamento.</b> Braseiro aberto com coifa e chaminé, fole conectado à entrada de ar e bigorna separada. Ivo aciona o fole, aquece o ferro pela direita da fornalha, transporta o tarugo e martela no tampo.</>,
      <><b>Fogo que responde ao fole.</b> O carvão começa com brasas fracas; as sopradas aumentam o fogo, a luz e a fumaça. O ferro muda de cinza para vermelho-alaranjado ao aquecer.</>,
      <><b>Quarto da Dona Rosa.</b> A enfermeira passa a dormir em seu próprio quarto, deixando os leitos para os pacientes.</>,
    ],
    melhorou: [
      <><b>Interface pintada.</b> Tela inicial, criação de personagem, inventário, pausa e serviços usam madeira e pergaminho no padrão dos cenários. Fontes, personagens e ícones dos itens continuam pixelados.</>,
      <><b>Menus mais compactos.</b> Criação de personagem e catálogo da forja usam páginas para caber na tela, com setas dentro dos botões e mais opções por página quando há espaço.</>,
      <><b>Interações legíveis.</b> Os avisos de tecla usam um círculo pequeno com letra contrastante; as opções das lojas deixaram de ocupar cartões gigantes.</>,
      <><b>Interior da ferraria.</b> Passagens e móveis reorganizados, postos de trabalho independentes e trajeto do Ivo sem atravessar o fole nem prender na bigorna.</>,
    ],
    corrigido: [
      <>Compra de sementes com Brasas na venda do Tomás e validação dos pontos de pesca junto à água visível.</>,
      <>Recuperação depois de morrer: posição no leito, cobertor, rosto e liberação do movimento ao sair da enfermaria.</>,
      <>Rosto do jogador visível ao dormir na cama da fazenda; xícaras decorativas removidas da mesa.</>,
      <>Prévias do personagem sem giro automático e animação do Ivo com o corpo inteiro, sem recortes nos braços.</>,
    ],
  },
  {
    versao: "de desenvolvimento",
    data: "21 de outubro de 2026",
    resumo: "Personagens Raven, cenários detalhados nas quatro estações, fachadas no padrão da taverna e revisão completa dos guias.",
    novo: [
      <><b>Herói Raven.</b> Três tons de pele, 28 cabelos e opções de roupa; combate, ferramentas, pesca e peças de armadura acompanham a aparência.</>,
      <><b>Pesca ampliada.</b> 48 espécies, níveis de vara, qualidade, coleção, desafios e encomendas. O cardápio do Caio tem dez pratos, incluindo peixes e ovos.</>,
    ],
    melhorou: [
      <><b>Vila e fazenda.</b> Terrenos, água, árvores, pedras, cercas, tufos e flores detalhados, com integração nas quatro estações.</>,
      <><b>Construções.</b> Venda, sede, enfermaria, Mística, Bento, forja e carpintaria receberam o acabamento pintado da taverna. A casa do jogador tem inverno próprio e os fundos do menu mostram as artes novas.</>,
      <><b>Catálogo atual.</b> Cinco armas e 23 receitas ativas de equipamento; Maça, Arco Curvo e Arco Longo saíram do catálogo novo. Receita precisa ser recolhida, aprendida na mochila e fabricada com Ivo.</>,
      <><b>Guias da Wiki.</b> Guardiões por mapa, controles, energia, serviços dos moradores e itens preservados após a expedição foram conferidos no código atual.</>,
    ],
    corrigido: [
      <>As cercas da fazenda restauram corretamente o visual ao alternar a comparação Tiny.</>,
      <>Fontes de interface incluem os acentos e símbolos utilizados na versão Web.</>,
    ],
  },
  {
    versao: "0.8",
    data: "20 de outubro de 2026",
    resumo: "Nova interface, trilhas e ambientes sonoros, fenda por andares, fabricação de equipamentos e criação de galinhas.",
    novo: [
      <><b>Arena transformada em fenda por andares.</b> Agora você explora mapas com patrulhas, grupos, elites e um guardião por andar. A caçada pede parte dos pontos disponíveis, sem exigir limpar todos os becos. Depois do mapa 11, o circuito repete os mapas 2–11 com dificuldade crescente. Orion oferece melhorias e avanço depois da vitória.</>,
      <><b>Fabricação de equipamentos.</b> Ivo trabalha com receitas, materiais físicos da mochila e prazo no calendário. São 24 receitas de equipamentos, além dos conjuntos com quatro peças independentes, refino e ascensão de raridade.</>,
      <><b>Músicas e sons ambientes.</b> Vila, fazenda, praia, fenda e guardião têm trilhas próprias, com transições entre temas e ambientes de bosque, mar e caverna. Música, efeitos e ambiente têm controles de volume separados.</>,
      <><b>Interface renovada.</b> Menus de título e pausa, diário da jornada, barra de itens em todos os mapas e serviços nos balcões. A escala pode ser ajustada entre 75%, 100%, 125% e 150%, com preferência individual no cooperativo.</>,
      <><b>Osvaldo e sua família.</b> A casa e oficina ficam depois da ponte, a leste da vila. Conheça Osvaldo, Helena e Clara, com rotinas e histórias próprias.</>,
      <><b>Galinheiro ampliável.</b> Encomende a construção no balcão do Osvaldo. São três níveis, com espaço para 4, 8 e 12 aves, materiais físicos e prazo de obra.</>,
      <><b>Criação de aves.</b> Cuide das galinhas e dos galos diretamente no galinheiro: alimentação, carinho, coleta de ovos, incubação e portinha para os passeios.</>,
      <><b>Loja de animais.</b> O catálogo mostra a imagem da galinha e do galo, preço, saldo e lotação. Cada ave custa 25 Brasas.</>,
      <><b>Espada para roçar.</b> Selecione a espada na barra da fazenda e corte o mato para obter feno. A enxada continua retirando mato para obter fibra.</>,
    ],
    melhorou: [
      <><b>Continuar a partida.</b> Dia e horário são restaurados com a precisão do relógio interno, junto da posição, direção, vida e fôlego, inclusive no cooperativo com jogadores em locais diferentes.</>,
      <><b>Conjuntos mais leves.</b> O reaproveitamento de texturas reduz as travadas ao equipar conjuntos e ao ocultar cabelos sob elmos fechados.</>,
      <><b>Interface no celular.</b> Vida e calendário se acomodam em telas estreitas, preservando as margens e os comandos de toque.</>,
    ],
    corrigido: [
      <>O feno agora fica dentro do comedouro e aparece diretamente, sem um objeto voando.</>,
      <>As colisões frontais do galinheiro impedem andar sobre a parede e as pedras, mantendo o vão da porta livre.</>,
      <>Conversar com Helena, Clara e Osvaldo com amizade avançada não falha ao liberar histórias.</>,
      <>Bancos de equipamentos e áudio são liberados corretamente no encerramento; avisos dos scripts foram revisados.</>,
    ],
  },
  {
    versao: "0.7",
    data: "19 de outubro de 2026",
    resumo: "A Medusa ganha arte nova, o Orion aparece depois do andar e a bigorna evolui as ferramentas da fazenda.",
    novo: [
      <><b>Orion.</b> Depois de vencer o andar ele aparece na vila. A conversa abre as melhorias e o avanço, e ele ganhou a base visual dos moradores, cabelo grisalho e cajado.</>,
      <><b>Ferramentas na bigorna.</b> A tela agora tem as categorias FABRICAR e FERRAMENTAS. Enxada, regador, machadinha e picareta evoluem por materiais físicos nos níveis madeira, reforçada e ferro. Não há receitas para ferramentas, e a vara de pesca continua com o Nilo.</>,
    ],
    melhorou: [
      <><b>Medusa redesenhada.</b> Quadros nativos de 128 px, sem serrilhado e com a silhueta limpa. O golpe especial tem runas e impacto desenhados por shader.</>,
      <><b>Menus no controle.</b> A seleção do menu navega direito com o controle.</>,
    ],
    corrigido: [
      <>O <b>F do mercante</b> aparecia sem cor, escuro sobre o círculo escuro. Agora é amarelo, como as outras dicas de tecla.</>,
      <>Itens físicos do comércio eram consumidos e devolvidos de forma errada ao comprar e vender.</>,
    ],
  },
  {
    versao: "0.6",
    data: "17 de outubro de 2026",
    resumo: "A barra de itens aparece em qualquer mapa e cada jogador escolhe o tamanho da interface.",
    novo: [
      <><b>Tamanho da interface.</b> Em Opções, a seção INTERFACE troca o tamanho do HUD e dos menus entre 75%, 100%, 125% e 150%. A mudança vale na hora, não mexe no zoom da câmera, e os cliques e toques acompanham o tamanho novo. No cooperativo cada jogador tem o próprio ajuste.</>,
    ],
    melhorou: [
      <><b>Barra de itens em todos os mapas.</b> Ela aparecia só na fazenda, na pesca e na arena. Agora também está na cidade, nas casas, na praia e na palafita, inclusive quando os jogadores trocam de ambiente no cooperativo. No celular a barra ganha páginas quando não cabe tudo.</>,
      <><b>Menus e barra de itens ampliados.</b> Com a interface maior, os menus e a barra se reorganizam para continuar cabendo na tela. No celular a barra usa mais linhas para deixar livres os comandos dos polegares.</>,
    ],
  },
  {
    versao: "0.5",
    data: "17 de outubro de 2026",
    resumo: "O HUD ganha uma barra de energia no padrão das outras, um ícone novo para a estamina e setas fáceis de tocar nas conversas.",
    novo: [
      <><b>Ícone de corrida na estamina.</b> O raio saiu e entrou um personagem correndo, em 12x12 pixels. Continua amarelo e fica vermelho quando falta fôlego. Vale no PC e no celular.</>,
    ],
    melhorou: [
      <><b>Barra de energia no visual da vida e da estamina.</b> A energia da fazenda usa agora as mesmas bordas, pontas e brilho das outras barras, em verde, e fica vermelha quando está baixa. No PC fica no canto inferior direito.</>,
      <><b>Energia visível no celular.</b> Antes a barra ficava escondida na área do joystick. Agora aparece logo abaixo da vida e da estamina, longe do joystick e da barra de itens.</>,
      <><b>Setas de rolagem nas conversas.</b> Nas opções de resposta do diálogo com os moradores, as setas ficaram maiores e com área de toque de 44x32, fáceis de acertar no celular.</>,
    ],
  },
  {
    versao: "0.4",
    data: "17 de outubro de 2026",
    resumo: "A fazenda ganha energia, a pesca pede a vara na mão e o controle passa a fazer tudo que o mouse fazia na mochila.",
    novo: [
      <><b>Energia da fazenda.</b> Uma barra verde vertical no canto da tela mostra a energia de cada jogador. Enxada gasta 3, machadinha e picareta 4, regador 2; colher, plantar e encher o regador não gastam. Sem energia a ferramenta não funciona. Dormir (ou desmaiar) recupera tudo. No prólogo nada gasta.</>,
      <><b>Barra de itens na praia.</b> A barra de baixo também aparece na praia e na palafita, para escolher a vara de pesca.</>,
      <><b>Vara na mão.</b> Para pescar é preciso equipar a vara na barra de baixo (tecla da casa, RB/LB, clique ou toque). Escolher a arma de novo guarda a vara. Sem ela, o jogo avisa.</>,
      <><b>Pescar de qualquer ponto do cais.</b> A cerca continua lá, mas toda borda do cais voltada para o mar vale como ponto de pesca.</>,
      <><b>Salvar no menu de pausa.</b> O botão SALVAR grava o jogo sem sair, inclusive os dois jogadores no cooperativo.</>,
      <><b>Fileiras da barra.</b> Como no Stardew, a barra mostra uma fileira da mochila por vez. Troque com <b>X</b> no teclado, <b>L3</b> no controle ou o botão numerado ao lado da barra no celular.</>,
      <><b>Mover itens no controle.</b> <b>Y</b> pega o item da casa em foco e <b>Y</b> em outra casa solta ali (troca de lugar, como no arrastar). A casa do item fica com moldura azul.</>,
      <><b>Setinhas de "tem mais".</b> As listas sem barra de rolagem mostram uma seta para cima e para baixo quando há mais conteúdo.</>,
      <><b>Ícone novo</b> do jogo no Windows, no Linux e no Android.</>,
    ],
    melhorou: [
      <><b>Diálogos no mesmo visual.</b> O prólogo, a Dona Rosa na enfermaria, a aula da arena e as lojas fechadas agora usam a caixa de pergaminho das conversas da vila, com o busto de quem fala e o texto aparecendo letra a letra.</>,
      <><b>Telas de dormir e de fim de partida</b> com a moldura de pixel art do resto do jogo.</>,
      <><b>Bigorna no controle.</b> Depois da última aba, <b>RB</b> passa para a mochila e <b>LB</b> volta, para escolher a arma que vai evoluir.</>,
    ],
    corrigido: [
      <>Os <b>itens sumiam</b> ao fechar e reabrir o jogo: a vara de pesca fazia o jogo achar que o inventário já estava carregado e o salvamento seguinte apagava o resto. Se isso aconteceu com você, o save do prólogo pode ser recuperado.</>,
      <>Save antigo ou gravado no meio do prólogo que ficava sem <b>espada ou escudo</b> agora ganha os básicos na mão.</>,
      <>No <b>cooperativo</b>, quando os dois abriam a mochila ao mesmo tempo o jogador 1 travava e só o 2 mexia. Cada um tem agora o próprio foco.</>,
      <>No prólogo, a <b>cenoura de exemplo</b> podia ficar escondida atrás de um arbusto.</>,
    ],
  },
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
      <Titulo sub="Atualização atual e histórico. As notas antigas descrevem o comportamento das versões anteriores.">Patch de atualizações</Titulo>
      <Secao>
        <Caixa tipo="nota" titulo={`Versão atual: ${recente.versao}`}>
          {recente.data}. {recente.resumo} A versão Web de 22/10/2026 está em <Link para="jogar">Jogar no navegador</Link>; os instaladores atualizados do Release v2026.10.22.3 ficam em <Link para="download">Baixar o jogo</Link>.
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
