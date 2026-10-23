import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Passos, Brasas, Ouro } from "../componentes/ui.jsx";
import { INIMIGOS, CHEFES as SPR_CHEFES, PORTAL, MORADORES as SPR } from "../sprites.js";
import { ESTAGIOS, CHEFES, TOTENS, ANDARES } from "../dados.js";

const nomeChefe = id => CHEFES.find(c => c.id === id)?.nome ?? id;
export function Arena() {
  return <>
    <Titulo sub="Explore a fenda, complete a caçada e enfrente o guardião de cada andar.">Fenda por andares</Titulo>
    <Secao titulo="Como avançar">
      <div className="lado-a-lado"><Sprite s={PORTAL} escala={3} titulo="Portal" />
        <Passos itens={[
          <>Entre pelo <b>portal da vila</b> e escolha o desafio.</>,
          <>Explore o mapa e enfrente patrulhas, grupos e elites para preencher os <b>pontos da caçada</b>.</>,
          <>A meta exige apenas parte dos encontros disponíveis. Escolha o caminho sem precisar limpar todos os becos.</>,
          <>Com a caçada completa, procure e derrote o <b>guardião do andar</b>.</>,
          <>Converse com <b>Orion</b> depois da vitória para acessar as melhorias, avançar ou voltar à cidade.</>,
        ]} />
      </div>
    </Secao>
    <Secao titulo="Mapas e guardiões">
      <p>Há 11 mapas. A partir do andar 12, o circuito repete os mapas 2–11 com dificuldade crescente. Cada mapa tem seu próprio guardião.</p>
      <Tabela cabecalho={["Mapa", "Região", "Guardião"]} linhas={ANDARES.map(a => [a.andar,a.nome,nomeChefe(a.guardiao)])} />
      <Caixa tipo="dica" titulo="Materiais e receitas">Cada andar concluído rende um fragmento da arena. Leve a picareta para os veios de ferro, disponíveis nos andares 6, 9, 12… Os guardiões fornecem núcleos. Receitas são pergaminhos: use-os na mochila e leve os materiais ao Ivo.</Caixa>
    </Secao>
    <Secao titulo="Eventos e tesouro">
      <p>A partir do andar 4, há 25% de chance de um evento: Lua de Sangue, Chuva de Ouro, Neblina ou Tempestade. Tempestade não aparece no inverno. Horda e Elite pertencem ao modo antigo de ondas; os grupos de elite da fenda já fazem parte dos mapas.</p>
      <p>Ao entrar num andar, há 2% de chance de aparecer o <b>portal do tesouro</b> (sorteado uma vez por andar em cada partida). Ele leva ao Bosque do Tesouro, uma clareira de mímicos que rendem 5× mais ouro, e devolve você ao mesmo andar.</p>
      <p>O baú gigante do bosque entrega um prêmio: 5% de chance de uma receita de conjunto que você ainda não tem (ou uma Moeda de Forja, se já tiver todas), 35% poção, 30% comida (omelete da horta, peixe assado ou sopa de raízes) e 30% Moeda de Forja. Ele nunca entrega armadura pronta.</p>
    </Secao>
    <Secao titulo="Mineração">
      <p>Nos andares <b>6 e 9</b> surgem veios de ferro pelo mapa. Selecione a <b>picareta</b> na barra para trocar o ataque por mineração: a cada 3 golpes o veio solta 1 ferro, que cai no chão e ocupa espaço na mochila. Cada golpe gasta energia da picareta, conforme o nível dela.</p>
      <p>Cada jogador tem o próprio veio. Golpes já dados ficam guardados se você sair e voltar durante a mesma partida. O ferro serve para fabricar armas com o <Link para="armas">Ivo</Link> e para evoluir as ferramentas da fazenda na bigorna.</p>
    </Secao>
    <Secao titulo="Entre os andares">
      <p>A vitória chama Orion; o menu não abre automaticamente por cima dos drops. Fale com ele quando estiver pronto. Totens usam ouro e duram até o fim da expedição.</p>
      <Tabela cabecalho={["Totem", "Preço base", "Efeito"]} linhas={TOTENS.map(t => [<b>{t.nome}</b>, <Ouro n={t.preco} />,t.efeito])} />
      <p>Cada cópia do mesmo totem custa 20% a mais. A fabricação de equipamentos fica na <Link para="armas">forja do Ivo</Link>, na vila.</p>
    </Secao>
    <Secao titulo="Morrer e sair"><Grade min={260}>
      <Ficha sprite={SPR.curandeira} nome="Se você cair"><p>Você acorda na enfermaria. Ouro, totens e equipamento temporário são reiniciados; conjuntos, receitas, materiais e demais itens permanentes ficam. <Link para="progresso">Confira o que é preservado.</Link></p></Ficha>
      <Ficha sprite={PORTAL} nome="Voltar à cidade"><p>Depois da vitória, fale com Orion para encerrar a expedição e receber as Brasas ou seguir para o próximo andar.</p></Ficha>
    </Grade></Secao>
  </>;
}

export function Inimigos() {
  return <>
    <Titulo sub="Grupos, patrulhas e elites distribuídos pelos mapas da fenda.">Inimigos</Titulo>
    <Secao><p>A espécie principal muda a cada dois andares. Cavernas também podem misturar morcegos aos grupos. Os esqueletos alternam guerreiro, arqueiro e mago.</p>
      <Grade min={230}>{ESTAGIOS.map(e => <article key={e.ondas} className="ficha inimigo">
        <div className="ficha-palco">{e.ids.map(id => <Sprite key={id} s={INIMIGOS[id]} escala={2} titulo={id} />)}</div>
        <div className="ficha-texto"><h3>{e.nomes.join(", ")}</h3><p className="etiqueta">Andares {e.ondas === "9" ? "9–10" : e.ondas}</p></div>
      </article>)}</Grade>
      <Caixa tipo="nota">Depois do andar 18, a sequência principal repete a partir do morcego. Isso é independente do circuito dos 11 mapas. A dificuldade continua subindo.</Caixa>
    </Secao>
    <Secao titulo="Elites"><p>Os grupos marcados como elite incluem um inimigo mutante, com coroa cinza e atributos maiores. Ele vale mais pontos de caçada. Essa distribuição é definida no mapa, sem depender da antiga chance de mutantes por onda.</p></Secao>
    <Secao titulo="Esqueletos"><Tabela cabecalho={["Classe","Como luta"]} linhas={[["Guerreiro","Combate corpo a corpo."],["Arqueiro","Mantém distância e dispara flechas."],["Mago","Lança projéteis mágicos."]]} compacta /></Secao>
  </>;
}

export function Chefes() {
  return <>
    <Titulo sub="Cada andar tem um guardião; a espécie depende do mapa.">Guardiões</Titulo>
    <Secao><p>Complete a caçada para invocar o guardião na clareira reservada. Observe os avisos no chão antes dos golpes fortes. A lista de mapas e seus guardiões está em <Link para="arena">Fenda por andares</Link>.</p></Secao>
    {CHEFES.map(c => <Secao key={c.id}><article className="chefe">
      <div className="chefe-palco"><Sprite s={SPR_CHEFES[c.id]} escala={c.escala} titulo={c.nome} /></div>
      <div><p className="sobretitulo">Mapas {ANDARES.filter(a => a.guardiao === c.id).map(a => a.andar).join(", ")}</p><h2>{c.nome}</h2><div className="golpes">{c.golpes.map(g => <span key={g}>{g}</span>)}</div></div>
    </article></Secao>)}
    <Secao titulo="Recompensas"><ul className="lista">
      <li>O guardião tem 20% de chance de soltar uma receita elegível ainda não aprendida ou guardada. Equipamento pronto sempre vem da fabricação.</li>
      <li>Garante uma semente da estação, além das chances extras. No inverno não caem sementes.</li>
      <li>Conta para a recompensa de <Brasas n={15} /> por guardião no encerramento, além das <Brasas n={2} /> do andar.</li>
      <li>Pode deixar uma Moeda de Forja (5% de chance). Materiais e moedas de forja são preservados ao encerrar a expedição.</li>
      <li>Os checkpoints selecionáveis continuam em blocos de dez: 1, 11, 21… após alcançar os marcos correspondentes, com o apoio da Mística.</li>
    </ul><Caixa tipo="aviso" titulo="Medusa">O olhar de pedra petrifica por um instante. Observe o aviso e saia da frente dela.</Caixa></Secao>
  </>;
}
