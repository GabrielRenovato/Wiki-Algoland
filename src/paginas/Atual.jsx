import Sprite, { urlSprite } from '../componentes/Sprite.jsx';
import { Titulo, Secao, Caixa, Grade, Ficha, Passos, Link } from '../componentes/ui.jsx';
import { HEROI, VISUAIS } from '../sprites.js';
import { ROUPAS } from '../dados.js';

export function Personalizacao() {
  const categorias = { camisa: 'Camisas e casacos', calca: 'Calças e saias', calcado: 'Calçados', cabelo: 'Cabelos' };
  return <>
    <Titulo sub="O personagem atual usa um modelo 3D com pintura em pixel art, sobre os cenários 2D do jogo.">Personagem e aparência</Titulo>
    <Secao titulo="Criar e editar"><div className="lado-a-lado"><Sprite s={HEROI} escala={4} titulo="Personagem atual correndo" /><div>
      <p>Escolha nome, três tons de pele, olhos, tintura, cabelo, roupa e calçado ao criar a partida. As peças de roupa são independentes.</p>
      <p>Para mudar depois, abra <b>PAUSA → EDITAR VISUAL</b>. As abas organizam a prévia, as roupas e as cores. A tintura também oferece branco explícito.</p>
      <p>Personagens antigos recebem uma aparência equivalente. O visual atual acompanha o jogo, os retratos, a mochila, o sono, a cidade online e o pódio.</p>
    </div></div></Secao>
    <Caixa tipo="nota" titulo="Roupa e equipamento">A roupa escolhida é cosmética. As peças de <Link para="armaduras">armadura</Link> são itens da mochila, com atributos e bônus próprios. Mordomo, Carrasco e Cavaleiro Rubro já têm peças sobre o modelo 3D; os demais conjuntos mantêm seus efeitos, mesmo sem uma malha própria nesse visual.</Caixa>
    {Object.entries(categorias).map(([categoria, nome]) => <Secao key={categoria} titulo={nome}>
      <Grade min={180}>{ROUPAS[categoria].map(item => <Ficha key={item.id} nome={item.nome} sprite={VISUAIS[item.id]} escala={3}><p className="etiqueta">Prévia do modelo atual no jogo</p></Ficha>)}</Grade>
    </Secao>)}
  </>;
}

export function Mercado() {
  return <>
    <Titulo sub="Compre e venda itens com outros jogadores usando Brasas, pelo mural da vila.">Mercado entre jogadores</Titulo>
    <Secao titulo="Onde abrir"><p>No mural da <Link para="vila">Vila das Flores</Link>, escolha a aba <b>MERCADO</b>. A tela tem COMPRAR, VENDER e MEUS ANÚNCIOS. É preciso conexão com a internet.</p></Secao>
    <Secao titulo="Comprar e receber"><Passos itens={[
      <>Na aba <b>COMPRAR</b>, use os filtros e confira item, quantidade, nível, raridade e preço em Brasas.</>,
      <>Confirme a compra. Ela vai para o <b>correio de entregas</b> do mercado.</>,
      <>Recolha a entrega com espaço na mochila. Um aviso no HUD informa quando há itens ou Brasas esperando.</>,
    ]} /></Secao>
    <Secao titulo="Vender"><Passos itens={[
      <>Escolha um item da mochila na aba <b>VENDER</b>. Para pilhas, informe a quantidade que deseja anunciar.</>,
      <>Digite o preço em Brasas ou ajuste pelos botões. Escolha o prazo oferecido pela tela, normalmente 24 ou 48 horas.</>,
      <>Confira a taxa de anúncio, a taxa da venda e o valor líquido antes de confirmar.</>,
      <>Acompanhe em <b>MEUS ANÚNCIOS</b>. Cancelamentos e anúncios expirados devolvem o item pelo correio; vendas entregam as Brasas.</>,
    ]} /></Secao>
    <Caixa tipo="nota" titulo="Regras na própria tela">As taxas, os prazos e os limites são definidos pelo mercado e aparecem antes da confirmação. Ferramentas, vara e arma/escudo básicos não podem ser anunciados. O item anunciado sai da sua mochila até ser vendido ou devolvido.</Caixa>
    <Secao titulo="Seu perfil"><p>O mercado usa a identidade salva no aparelho, junto do ranking. Para mudar de aparelho preservando essa identidade, use a <Link para="transferencia">transferência de save</Link>.</p></Secao>
  </>;
}

export function Duelo() {
  return <>
    <Titulo sub="Combate online de um contra um, em salas com senha opcional e partida melhor de três.">Duelo online</Titulo>
    <Secao titulo="Criar ou entrar numa sala"><Passos itens={[
      <>Toque ou clique no <b>ícone de duas espadas cruzadas</b> na tela de jogo. Você também pode abrir a pausa e escolher <b>DUELO ONLINE</b>.</>,
      <>Crie uma sala com nome e senha opcional, ou entre numa sala da lista. Uma sala tem dois lugares.</>,
      <>Quem entrou marca <b>PRONTO</b>. Quando o adversário estiver pronto, o dono da sala usa <b>COMEÇAR</b>.</>,
      <>Dispute os rounds: vence a partida quem fizer duas vitórias.</>,
    ]} /></Secao>
    <Secao titulo="Personagem e equipamentos no lobby"><p>Os dois cartões mostram a aparência dos jogadores e os slots de arma, escudo, cabeça, corpo, luvas e botas, no estilo da mochila. Toque ou clique em um equipamento para consultar seu nome, nível e raridade; essa inspeção não troca nem remove itens.</p><p>Em telas estreitas, role para ver o outro cartão. Os botões de pronto, começar e sair ficam sempre disponíveis abaixo da área de jogadores.</p></Secao>
    <Secao titulo="Dentro da arena"><p>A arena do duelo não tem ondas de inimigos e limita a movimentação à área de terra. Use ataques, esquiva, defesa e aparo como no <Link para="combate">combate</Link> normal. O dano entre jogadores é ajustado para 60%.</p>
      <p>Ao terminar ou sair, você volta ao local anterior, com a vida que tinha antes. O duelo não leva à enfermaria nem causa as perdas de uma expedição da fenda.</p>
    </Secao>
    <Caixa tipo="nota">Duelo online, <Link para="online">cidade online e chat</Link> e <Link para="coop">cooperativo local</Link> são modos diferentes. O duelo precisa dos dois jogadores conectados; sua qualidade depende da conexão e da disponibilidade do servidor.</Caixa>
  </>;
}

export function Transferencia() {
  return <>
    <Titulo sub="Leve seu mundo solo entre computador, Android e navegador, preservando a identidade do ranking e do mercado.">Transferir save</Titulo>
    <Secao titulo="Passo a passo"><Passos itens={[
      <>No aparelho de origem, volte à tela inicial e abra <b>TRANSFERIR SAVE → ENVIAR</b>.</>,
      <>Anote o código de seis letras. Ele vale por <b>15 minutos</b>.</>,
      <>No outro aparelho, abra <b>TRANSFERIR SAVE</b>, digite o código e escolha <b>RECEBER</b>.</>,
      <>Conclua a importação e continue a partida nesse aparelho.</>,
    ]} /></Secao>
    <Caixa tipo="aviso" titulo="O mundo do destino será substituído">A transferência importa o mundo solo completo e guarda uma cópia do save anterior do destino em um backup local. O código dá acesso à partida: compartilhe apenas com quem deve recebê-la.</Caixa>
    <Secao titulo="Se a conexão cair"><p>Repita a tentativa enquanto o código estiver válido. O recebimento só é confirmado depois que os dados forem gravados e recarregados no destino; uma falha na importação não deve consumir o código antes disso.</p></Secao>
    <Secao titulo="Não é sincronização automática"><p>As partidas de cada aparelho continuam separadas. Para levar um progresso mais recente, envie novamente a partir do aparelho em que você jogou por último.</p></Secao>
  </>;
}

export function GaleriaCenario({ lugar }) {
  return <div className="grade-capturas">{['primavera','verao','outono','inverno'].map((e,i) => <figure key={e}>
    <img className="captura-jogo" src={urlSprite(`cenarios/${lugar}_${e}.png`)} alt={`${lugar === 'praia' ? 'Praia' : 'Floresta'} em ${['primavera','verão','outono','inverno'][i]}`} loading="lazy" />
    <figcaption>{['Primavera','Verão','Outono','Inverno'][i]}</figcaption>
  </figure>)}</div>;
}
