import { Titulo, Secao, Caixa, Tabela, Link } from '../componentes/ui.jsx';
import { urlSprite } from '../componentes/Sprite.jsx';
export function Mapa() {
  return <>
    <Titulo sub="Localize os serviços, os moradores e os dois jogadores.">Mapa-múndi</Titulo>
    <Secao><img className="captura-jogo mapa-mundi" src={urlSprite("ui/mapa_mundi.png")} alt="Mapa ilustrado do AlgoLand, com a fazenda a oeste, a vila ao centro e a praia ao sul" /></Secao>
    <Secao titulo="Como abrir"><p>Pressione <b>M</b> no teclado ou segure <b>R3 por 0,4 segundo</b> no controle. No celular, use MAPA sob o relógio; a pausa também oferece acesso. O toque curto de R3 continua com a ação de troca de arma.</p><p>Use zoom de 1 a 3 vezes e arraste para percorrer a carta. No cooperativo, o painel acompanha o jogador que abriu o mapa.</p></Secao>
    <Secao titulo="Destinos"><Tabela cabecalho={['Região','O que encontrar']} linhas={[
      [<Link para="fazenda">Fazenda · oeste</Link>,'Casa, baú, horta, árvores, pedras, lago e galinheiro.'],
      [<Link para="vila">Vila das Flores · centro</Link>,'Praça, mural, venda, enfermaria, pousada, forja e casa do Bento. Carpintaria depois da ponte a leste.'],
      [<Link para="pesca">Praia · sul</Link>,'Cais, Nilo, oficina da vara e palafita.'],
    ]} /><Caixa tipo="nota">A carta mostra posições e serviços; não oferece viagem rápida. Retratos seguem os moradores carregados ou a agenda quando o ambiente está distante. A arena fica fora da carta.</Caixa></Secao>
  </>;
}
