import { GaleriaCenario } from './Atual.jsx';
import Sprite from '../componentes/Sprite.jsx';
import { Titulo, Secao, Caixa, Tabela, Passos, Link, Brasas } from '../componentes/ui.jsx';
import { PEIXES, ESTACOES } from '../dados.js';
import { peixe, MORADORES } from '../sprites.js';

export function Pesca() {
  return <>
    <Titulo sub="Praia, cais e lago da fazenda: 54 espécies de mar e de água doce, com progressão até o nível 99.">Pesca</Titulo>
    <Secao titulo="Como pescar"><Passos itens={[
      <>Selecione a <b>vara</b> na barra da mochila e fique perto da água, na praia, na borda do cais ou no lago da fazenda.</>,
      <>Segure <b>atacar/usar</b> para carregar a força oscilante. Solte para lançar a linha; no mar o alcance vai de 28 a 120 unidades, e no lago a boia fica dentro da água.</>,
      <>Espere a beliscada. Na fisgada, acerte a zona do círculo com o ponteiro; a zona ótima rende mais progresso. Erros reduzem a barra.</>,
      <>Guarde o peixe na mochila. Espécies e qualidades diferentes formam pilhas separadas. O histórico da coleção continua mesmo depois de vender ou cozinhar.</>,
    ]} /><Caixa tipo="nota">A pesca usa a vara e o botão de ataque. F é para conversar e interagir; não é o comando de lançar a linha.</Caixa></Secao>
    <Secao titulo="A praia nas quatro estações"><GaleriaCenario lugar="praia" /></Secao>
    <Secao titulo="Nilo e a vara"><div className="lado-a-lado"><Sprite s={MORADORES.nilo} escala={3} titulo="Nilo" /><p>A oficina do Nilo, no cais, atende das <b>8h às 17h</b>. O refinamento é individual para cada jogador e gasta Pedras da Vara da mochila.</p></div>
      <Tabela cabecalho={["Nível novo","Pedras necessárias"]} linhas={[[2,1],[3,2],[4,4],[5,6]]} compacta />
      <p>O sorteio de pedras tem 0,25% de chance e só fica disponível após as primeiras 30 capturas. Depois de receber uma pedra, é preciso acumular mais 50 capturas para voltar a participar do sorteio. Peixes com nível recomendado acima da sua vara continuam disponíveis, mas ficam mais difíceis de fisgar.</p>
    </Secao>
    <Secao titulo="Coleção, encomendas e cozinha"><p>O guia de pesca reúne a coleção, desafios de capturas e qualidade, metas por espécie e marcos de 3 a 54 espécies. Há duas encomendas por dia: uma de mar e outra de rio, compatíveis com a estação, seu nível de pesca e sua vara. A seleção fica fixa no primeiro acesso do dia, separada por jogador. Elas pagam o triplo do valor-base da quantidade pedida.</p>
      <p>A meta antiga de linguados foi substituída por <b>pescar 3 sardinhas</b>, com recompensa de 50 Brasas e aproveitamento do histórico. Tomás compra os peixes na venda. Peixes também entram em três <Link para="refeicoes">pratos do Caio</Link>: Peixe Assado com Raízes, Caldo do Rio e Salmão Grelhado.</p>
    </Secao>
    {['mar','rio'].map(ambiente => <Secao key={ambiente} titulo={ambiente === 'mar' ? 'Espécies do mar' : 'Espécies de água doce'}>
      <Tabela cabecalho={['Peixe','Raridade','Estações','Nível de pesca','Vara recomendada','Venda base']} linhas={PEIXES.filter(p => p.ambiente === ambiente).map(p => [<span className="peixe-nome"><Sprite s={peixe(p.id)} escala={2} parado titulo={p.nome} />{p.nome}</span>,p.raridade,p.estacoes.length ? p.estacoes.map(e => ESTACOES[e]).join(', ') : 'Ano todo',p.nivel_pesca ?? 1,p.nivel_vara,<Brasas n={p.brasas} />])} />
      <p className="etiqueta">O valor da tabela é a base da espécie; o preço final considera a qualidade da captura.</p>
    </Secao>)}
  </>;
}
