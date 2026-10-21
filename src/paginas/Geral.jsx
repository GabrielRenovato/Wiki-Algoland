import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Tecla, Link, Passos, Brasas } from "../componentes/ui.jsx";
import { HEROI, PORTAL, CASAS, MORADORES as SPR_MORADORES, FERRAMENTAS, CONJUNTOS, CHEFES as SPR_CHEFES, colhido } from "../sprites.js";
import { ESTACOES, DIAS_SEMANA } from "../dados.js";

export function Inicio() {
  return (
    <>
      <div className="banner">
        <div className="banner-texto">
          <p className="sobretitulo">Wiki oficial</p>
          <h1>AlgoLand</h1>
          <p>
            Um jogo 2D em pixel art que mistura <b>vida no campo</b> com <b>arena roguelite</b>. Você mora na Vila das
            Flores, cuida de uma fazenda, faz amizade com os vizinhos e atravessa o portal para segurar as ondas de
            criaturas da Arena do Limiar. Cada queda vira Brasas, e as Brasas deixam você mais forte para sempre.
          </p>
          <a className="botao-baixar" href="#/jogar">▶ Jogar no navegador</a>
          <a className="botao-baixar" href="#/download">⬇ Baixar para Windows, Linux ou Android</a>
        </div>
        <div className="banner-palco">
          <Sprite s={HEROI} escala={4} titulo="Herói" />
          <Sprite s={PORTAL} escala={3} titulo="Portal da arena" />
        </div>
      </div>

      <Secao titulo="O ciclo do jogo">
        <div className="ciclo">
          <a className="ciclo-no" href="#/fazenda">
            <Sprite s={colhido([2, 6])} escala={3} parado />
            <b>Fazenda</b>
            <span>oeste da vila</span>
            <small>Planta, rega e colhe. A colheita vira poção.</small>
          </a>
          <span className="ciclo-seta" aria-hidden>⇄</span>
          <a className="ciclo-no" href="#/vila">
            <Sprite s={CASAS.venda} escala={0.75} parado />
            <b>Vila das Flores</b>
            <span>o centro de tudo</span>
            <small>Lojas, pedidos, amizades, melhorias e a cama.</small>
          </a>
          <span className="ciclo-seta" aria-hidden>⇄</span>
          <a className="ciclo-no" href="#/arena">
            <Sprite s={PORTAL} escala={1.4} />
            <b>Arena</b>
            <span>pelo portal</span>
            <small>Ondas de inimigos, chefes, ouro e saque.</small>
          </a>
        </div>
        <Passos itens={[
          <>Na <Link para="fazenda">fazenda</Link> você planta sementes da estação e colhe em poucos dias.</>,
          <>A <Link para="moradores">Dona Rosa</Link> transforma a colheita em <Link para="pocoes">poções</Link> e o <Link para="refeicoes">Caio</Link> a cozinha em pratos que valem a partida inteira na arena.</>,
          <>No portal da vila você entra na <Link para="arena">arena</Link>: cada onda vencida dá ouro, saque e abre a janela de compras.</>,
          <>A cada 10 ondas vem um <Link para="chefes">chefe</Link>. Ele solta sementes, equipamento e às vezes a Moeda de Forja.</>,
          <>Se você cair, a partida vira <Brasas n="Brasas" />. Com a Lia, elas viram <Link para="progresso">melhorias permanentes</Link>.</>,
        ]} />
      </Secao>

      <Secao titulo="Por onde começar">
        <Grade min={220}>
          <Ficha sprite={SPR_MORADORES.bento} nome="Primeiros passos" etiqueta="Prólogo e tutorial">
            <p>O Bento resgata você e mostra a vila e a fazenda. <Link para="comecando">Ler o guia</Link></p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.enxada} escala={4} nome="Controles" etiqueta="Teclado, controle e toque">
            <p>Todas as teclas e botões. <Link para="controles">Ver controles</Link></p>
          </Ficha>
          <Ficha sprite={CONJUNTOS.carrasco} nome="Equipamento" etiqueta="Armas, raridade e armaduras">
            <p>Bigorna, encantamentos e conjuntos. <Link para="armas">Ver armas</Link></p>
          </Ficha>
          <Ficha sprite={SPR_CHEFES.dragao_vermelho} escala={0.9} nome="Chefes" etiqueta="Ondas 10, 20, 30, 40 e 50">
            <p>Golpes, avisos no chão e recompensas. <Link para="chefes">Ver chefes</Link></p>
          </Ficha>
        </Grade>
      </Secao>
    </>
  );
}

export function Controles() {
  const linhas = [
    ["Andar", <><Tecla>W</Tecla><Tecla>A</Tecla><Tecla>S</Tecla><Tecla>D</Tecla></>, "Analógico esquerdo / direcional"],
    ["Atacar (ou usar a ferramenta na fazenda)", <><Tecla>Espaço</Tecla> ou clique</>, "X ou RT"],
    ["Interagir: portas, conversas, portal, baú", <Tecla>F</Tecla>, "A"],
    ["Esquivar (rolamento)", <Tecla>Shift</Tecla>, "B"],
    ["Defender (aparar com o escudo)", <Tecla>Ctrl</Tecla>, "LT"],
    ["Beber poção (arena) / colher (fazenda)", <Tecla>R</Tecla>, "Y"],
    ["Trocar a poção do cinto / a ferramenta", <><Tecla>Q</Tecla><Tecla>E</Tecla></>, "LB / RB"],
    ["Trocar de arma", <Tecla>Z</Tecla>, "RB"],
    ["Escolher uma casa da barra", <><Tecla>1</Tecla>…<Tecla>5</Tecla></>, "—"],
    ["Abrir a mochila", <Tecla>I</Tecla>, "View (botão de janelas)"],
    ["Ver o status do personagem", <Tecla>Tab</Tecla>, "R3 (L3 fecha o lembrete)"],
    ["Pausar / fechar janela", <Tecla>Esc</Tecla>, "Start / B"],
  ];
  return (
    <>
      <Titulo sub="O jogo aceita teclado e mouse, controle (padrão Xbox) e toque no celular.">Controles</Titulo>
      <Secao>
        <Tabela cabecalho={["Ação", "Teclado", "Controle"]} linhas={linhas} />
      </Secao>
      <Secao titulo="Barra rápida e mochila">
        <p>
          A barra de baixo da tela é a <b>primeira linha da mochila</b>. As teclas 1 a 5 escolhem a casa. Na fazenda,
          escolher uma ferramenta ou uma semente a deixa ativa (o nome aparece acima da barra). Na arena, só armas,
          escudo e poções fazem efeito; na fazenda, só ferramentas e sementes.
        </p>
        <Caixa tipo="dica">
          Itens se arrastam livremente na mochila. Coloque na primeira linha o que você usa mais.
        </Caixa>
      </Secao>
      <Secao titulo="Celular (toque)">
        <p>
          No Android aparecem botões na tela: um analógico virtual para andar e os botões ATACAR, ROLAR, AGIR, DEFESA
          (só na arena), COLHER (só na fazenda), ITENS (mochila) e pausa. Para digitar o nome do personagem abre um
          teclado virtual.
        </p>
      </Secao>
    </>
  );
}

export function Comecando() {
  return (
    <>
      <Titulo sub="O que acontece nas primeiras horas, passo a passo.">Primeiros passos</Titulo>
      <Secao titulo="Criação do personagem">
        <div className="lado-a-lado">
          <Sprite s={HEROI} escala={4} titulo="Herói" />
          <p>
            No <b>Novo Jogo</b> você escolhe nome, cabelo, cor do cabelo e roupa. A aparência acompanha todas as
            animações, inclusive com armadura vestida: cada peça de armadura aparece no corpo.
          </p>
        </div>
      </Secao>
      <Secao titulo="O prólogo">
        <Passos itens={[
          <>Você acorda na <b>Arena do Limiar</b>. O <b>Bento</b> chega, explica as ondas e entrega a espada e o escudo de quem guardava o lugar.</>,
          <>Ele vai na frente e você atravessa o <b>portal</b> até a <b>Vila das Flores</b>, onde ele apresenta os moradores.</>,
          <>Juntos vocês vão até a <b>fazenda vazia</b> a oeste. Lá ele ensina, com tarefas de verdade: cortar uma árvore com a machadinha, quebrar uma pedra com a picareta, arar com a enxada, plantar e regar.</>,
          <>Durante o prólogo o relógio fica parado. Depois do primeiro sono, os dias voltam a passar normalmente.</>,
          <>Na <b>primeira onda vencida</b> depois do prólogo, o Bento aparece de novo na arena e explica a janela entre ondas: ouro, saque, melhorias, bigorna e encantamentos.</>,
        ]} />
        <Caixa tipo="nota">
          O progresso do prólogo fica salvo. Se você fechar o jogo no meio, ele continua do último ponto.
        </Caixa>
      </Secao>
      <Secao titulo="O que fazer no primeiro dia">
        <Grade min={220}>
          <Ficha sprite={SPR_MORADORES.lia} nome="Fale com a Lia" etiqueta="Casa da comunidade">
            <p>Aceite os pedidos do mural. “Conheça seus vizinhos” e “Portas abertas” já dão <Brasas n={20} />.</p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.regador} escala={4} nome="Plante cedo" etiqueta="Fazenda">
            <p>Plante pela manhã e regue todo dia. Plantas curtas (3 dias) rendem logo a primeira poção.</p>
          </Ficha>
          <Ficha sprite={PORTAL} nome="Teste a arena" etiqueta="Portal da vila">
            <p>As primeiras ondas são leves. Use o ouro na bigorna: a espada nível 2 já sai na onda 4.</p>
          </Ficha>
        </Grade>
      </Secao>
    </>
  );
}

export function Tempo() {
  return (
    <>
      <Titulo sub="Relógio, estações, clima e sono.">Tempo e calendário</Titulo>
      <Secao titulo="Estações">
        <p>
          O ano tem <b>4 estações de 30 dias</b> cada (120 dias): {ESTACOES.join(", ")}. A semana tem 7 dias, de {DIAS_SEMANA[0]} a {DIAS_SEMANA[6]},
          e corre sozinha, sem depender da estação: os moradores têm folga num dia fixo da semana.
        </p>
        <Tabela cabecalho={["Estação", "O que muda"]} linhas={[
          ["Primavera", "Cenoura, batata, couve-flor e morango. Jardins floridos."],
          ["Verão", "Girassol, tomate, milho e melancia. Tardes longas."],
          ["Outono", "Beterraba, berinjela, abóbora e uva. Folhas nos caminhos."],
          ["Inverno", "Sem plantio. Neve, encontros dentro da pousada, e a Tempestade não sorteia na arena."],
        ]} />
        <Caixa tipo="aviso">
          Uma planta precisa amadurecer dentro da própria estação. Se os dias que faltam não bastam, o jogo avisa
          “não dá tempo até o fim da estação” e nem deixa plantar. Na virada da estação, o que sobrou da estação
          anterior <b>murcha</b> e precisa ser arrancado com a enxada. Com 30 dias há tempo de sobra: as plantas mais
          demoradas (6 dias) só ficam de fora se você plantar nos últimos dias da estação.
        </Caixa>
      </Secao>
      <Secao titulo="Clima">
        <p>
          Cada dia sorteia o clima: limpo, nublado, chuva leve, chuva forte, tempestade, neve leve ou neve forte.
          Na chuva os moradores usam capa e guarda-chuva e a horta fica regada sozinha. A arena tem relógio e clima próprios.
        </p>
      </Secao>
      <Secao titulo="Dia, noite e sono">
        <Tabela cabecalho={["Horário", "O que acontece"]} linhas={[
          ["6h", "A vila acorda; quem tem comércio fica em casa até abrir."],
          ["8h – 18h", "Horário comercial (cada loja tem o seu)."],
          ["Anoitecer", "Lampiões acendem na praça e as janelas das casas brilham."],
          ["18h – 2h", "Taverna da pousada aberta, com o Caio no balcão."],
          ["22h", "Os moradores vão dormir na própria cama."],
          ["2h", "Se você ainda estiver acordado, desmaia de cansaço e acorda em casa."],
        ]} />
        <p>
          Dormir na cama de casa (ou na pousada) passa para o dia seguinte: as plantas regadas crescem e o clima do novo dia é sorteado. No último dia de cada estação a
          praça ganha bandeirinhas, e no sábado à noite tem festa com todos os moradores.
        </p>
      </Secao>
    </>
  );
}

export function Cooperativo() {
  return (
    <>
      <Titulo sub="Dois jogadores no mesmo computador, em tela dividida.">Cooperativo local</Titulo>
      <Secao>
        <div className="lado-a-lado">
          <div className="dupla">
            <Sprite s={HEROI} escala={3} titulo="Jogador 1" />
            <Sprite s={CONJUNTOS.cavaleiro_rubro} escala={3} titulo="Jogador 2" />
          </div>
          <div>
            <Passos itens={[
              <>Conecte um <b>segundo controle</b>.</>,
              <>Segure <b>START por 1 segundo</b> nele: o jogador 2 entra. Segurar de novo faz ele sair.</>,
              <>A tela se divide ao meio, como no Stardew Valley: cada um tem a própria câmera.</>,
            ]} />
          </div>
        </div>
      </Secao>
      <Secao titulo="Regras do co-op">
        <ul className="lista">
          <li>Vale para o <b>jogo inteiro</b>: vila, fazenda, interiores e arena.</li>
          <li>Cada jogador entra sozinho pelas portas; a <b>entrada e a saída da arena</b> são sempre juntas.</li>
          <li>Cada um tem a <b>própria carteira de ouro</b>. Recompensas da onda caem nas duas; compras e vendas mexem só na de quem fez.</li>
          <li>O preço dos totens sobe por jogador: cada um paga pelas próprias cópias.</li>
          <li>Os inimigos miram o jogador mais próximo.</li>
          <li>O jogador 2 tem uma barra de vida sobre a cabeça e pode cair e levantar.</li>
          <li><b>Dormir:</b> quem deita espera o outro, e a noite só passa com os dois deitados. Quem se arrependeu levanta com B ou com o botão de interagir. No desmaio das 2h os dois vão juntos.</li>
          <li><b>Pausa:</b> START de qualquer controle abre e fecha a pausa.</li>
          <li><b>Banco:</b> o banco vazio tem prioridade sobre o morador ao lado na hora de apertar o botão de interagir.</li>
          <li>Os dois podem ir cada um para um lugar (a vila para um, a fazenda para o outro), e cada um tem a própria tela, relógio e barra de ferramentas.</li>
        </ul>
      </Secao>
    </>
  );
}

export function Dicas() {
  return (
    <>
      <Titulo sub="Perguntas frequentes e atalhos de quem já jogou bastante.">Dicas e dúvidas</Titulo>
      <Secao>
        <div className="faq">
          {[
            ["O que eu perco quando morro?", "O ouro da partida, o saque ainda não vendido, as Moedas de Forja e o equipamento que caiu nessa partida. Você acorda na enfermaria da Dona Rosa. Ficam: fazenda, sementes, ferramentas (voltam com o kit), Brasas, melhorias e amizades."],
            ["Como fico mais forte de forma permanente?", "Com Brasas na Lia (melhorias e apoios), liberando armas novas pelos desafios e evoluindo peças de conjunto na bigorna. A colheita que sobrar também vira Brasas: a Lia compra por 3 a 9 Brasas cada."],
            ["Como a fazenda ajuda na arena?", "De três jeitos: poções com a Dona Rosa, pratos do Caio (um bônus forte que dura a partida inteira) e Brasas pela colheita vendida à Lia. Quem entra na arena sem prato volta bem mais cedo."],
            ["Onde faço poções?", "Com a Dona Rosa, no botão POÇÕES da conversa. Ela usa as receitas fixas do caldeirão."],
            ["Para que serve a amizade?", "Conversar uma vez por dia dá amizade. Mais amizade libera histórias novas de cada morador e entregar pedidos dá amizade extra."],
            ["Minha mochila encheu na arena. E agora?", "O equipamento vai para a aba SAQUE da janela entre ondas (12 casas). Lá você escolhe o que levar ou vender. Voltar à cidade vende o resto; morrer perde."],
            ["Vender equipamento deixa rico?", "Não de propósito: na arena o preço é (6 + 1,5 × onda) × a raridade. Na loja do Tomás a venda paga 1,5× isso."],
            ["Posso sair da arena no meio?", "Sim. O botão CIDADE da janela pede confirmação e encerra a partida: você ganha as Brasas, volta à onda 1 e o equipamento fica."],
          ].map(([p, r]) => (
            <details key={p}>
              <summary>{p}</summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </Secao>
      <Secao titulo="Dicas rápidas">
        <Grade min={240}>
          <Ficha sprite={colhido([2, 2])} escala={3} nome="Cura sempre no cinto">
            <p>2 cenouras + 1 morango = Poção de Cura. É a receita mais barata e a que mais salva.</p>
          </Ficha>
          <Ficha sprite={SPR_MORADORES.mistica} nome="Contrate a Mística">
            <p>Depois do primeiro chefe ela deixa você começar direto do checkpoint.</p>
          </Ficha>
          <Ficha sprite={CASAS.casa_jogador} escala={0.7} nome="Durma antes das 2h">
            <p>Às 2h você desmaia de cansaço e acorda em casa. Melhor ir para a cama por conta própria.</p>
          </Ficha>
        </Grade>
      </Secao>
    </>
  );
}
