import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Brasas } from "../componentes/ui.jsx";
import { CASAS, PORTAL, MORADORES as SPR } from "../sprites.js";
import { MORADORES, PEDIDOS, DIAS_SEMANA } from "../dados.js";

const LUGARES = [
  { casa: "sede", nome: "Casa da comunidade", dono: "Lia", texto: "Mural de pedidos, melhorias com Brasas e contratação dos apoios." },
  { casa: "venda", nome: "Venda", dono: "Tomás", texto: "Sementes da estação por Brasas e venda de peixes." },
  { casa: "enfermaria", nome: "Enfermaria", dono: "Dona Rosa", texto: "Cura, caldeirão de poções e o leito onde você acorda depois de cair." },
  { casa: "pousada", nome: "Pousada", dono: "Caio", texto: "Quartos para passar a noite, taverna das 18h às 2h e abrigo no inverno." },
  { casa: "mistica", nome: "Casa da Mística", dono: "Estela", texto: "Mesa de cristal, mapas e conselhos sobre checkpoint e mochila." },
  { casa: "forja", nome: "Forja", dono: "Ivo", texto: "Fabricação por encomenda, refino, encantamentos e melhorias de ferramentas." },
  { casa: "carpintaria", nome: "Carpintaria", dono: "Osvaldo e família", texto: "Construção do galinheiro, ampliações e loja de aves." },
  { casa: "palafita", nome: "Palafita e cais", dono: "Nilo", texto: "Na praia ao sul: oficina da vara e guia de pesca." },
  { casa: "casa_bento", nome: "Casa do Bento", dono: "Bento", texto: "Orientação da horta e duas sementes de presente por dia." },
];

export function Vila() {
  return (
    <>
      <Titulo sub="O centro do jogo: lojas, moradores, pedidos e o portal da arena.">Vila das Flores</Titulo>
      <Secao>
        <p>
          A vila tem construções em volta da praça, um riacho com ponte, um laguinho e uma horta. Depois da ponte, a leste, fica a casa e carpintaria da família do Osvaldo. A
          trilha <b>oeste</b> leva à <Link para="fazenda">fazenda</Link>. O <b>portal</b> leva à <Link para="arena">arena</Link>.
          Use <b>F</b> (ou A no controle) para abrir portas e conversar.
        </p>
      </Secao>
      <Secao titulo="A vila nas quatro estações">
        <p>As fachadas seguem o acabamento detalhado da taverna, com materiais, vegetação e neve próprios de cada estação.</p>
        <div className="grade-capturas">{["primavera","verao","outono","inverno"].map((e,i) => <figure key={e}><img className="captura-jogo" src={`${import.meta.env.BASE_URL}sprites/cenarios/vila_${e}.png`} alt={`Vila no jogo: ${["primavera","verão","outono","inverno"][i]}`} loading="lazy" /><figcaption>{["Primavera","Verão","Outono","Inverno"][i]}</figcaption></figure>)}</div>
      </Secao>
      <Secao titulo="Construções">
        <Grade min={260}>
          {LUGARES.map((l) => (
            <Ficha key={l.casa} sprite={CASAS[l.casa]} escala={1} nome={l.nome} etiqueta={`de ${l.dono}`}>
              <p>{l.texto}</p>
            </Ficha>
          ))}
          <Ficha sprite={PORTAL} escala={1.6} nome="Portal da arena" etiqueta="Na vila">
            <p>Interaja para abrir o desafio da arena. Explore a fenda e complete a caçada para invocar o guardião de cada andar.</p>
          </Ficha>
        </Grade>
        <Caixa tipo="nota" titulo="Cômodos por dentro">
          Os interiores são divididos em cômodos, como no Stardew Valley. Dá para sentar nas cadeiras e bancos, e os
          moradores também sentam virados para a mesa mais próxima.
        </Caixa>
      </Secao>
      <Secao titulo="Carpintaria e família do Osvaldo">
        <p><b>Osvaldo</b> recebe encomendas das 8h às 17h no balcão da oficina, depois da ponte a leste da praça.
          Ali você constrói e amplia o <Link para="fazenda">galinheiro</Link> e abre a loja de animais,
          com galinhas e galos por 25 Brasas.</p>
        <p>A casa também é o lar de <b>Helena</b>, que gosta de bordar e contar histórias, e de <b>Clara</b>,
          artesã que acompanha a mãe nos passeios. As conversas e as histórias mudam conforme a amizade.</p>
      </Secao>
      <Secao titulo="Mural de pedidos">
        <p>
          O mural da praça (e o da casa da comunidade) mostra onde cada morador está e os pedidos abertos. Aceitar é de
          graça; a entrega é feita com quem pediu e rende Brasas e amizade. Pedidos de colheita guardam a estação em
          que foram aceitos.
        </p>
        <Tabela cabecalho={["Pedido", "Quem pede", "O que fazer", "Recompensa"]}
          linhas={PEDIDOS.map((p) => [<b>{p.nome}</b>, p.dono, p.texto, <Brasas n={p.brasas} />])} />
      </Secao>
      <Secao titulo="Vida na vila">
        <ul className="lista">
          <li>Os moradores seguem a agenda do relógio: trabalham, encontram-se na praça, conversam entre si e voltam para casa.</li>
          <li>Cada um tem um <b>dia de folga</b> por semana e um <b>horário comercial</b>. Loja fechada avisa numa caixa de diálogo.</li>
          <li>No <b>inverno</b>, os encontros passam para dentro da pousada.</li>
          <li>Na <b>chuva</b>, todos saem de capa ou guarda-chuva.</li>
          <li><b>Sábado à noite</b> tem festa na taverna da pousada: os moradores se reúnem nas mesas e Caio atende no balcão (e você pode sentar com eles).</li>
          <li>No último dia de cada estação, a praça ganha bandeirinhas; ao anoitecer, lampiões.</li>
        </ul>
      </Secao>
    </>
  );
}

const hora = (h) => `${h}h`;

export function Moradores() {
  return (
    <>
      <Titulo sub="A vila, a carpintaria e o cais têm moradores com rotinas e serviços próprios.">Moradores</Titulo>
      <Secao>
        <p>
          Conversar uma vez por dia aumenta a amizade. Cada conversa tem os botões <b>CONVERSAR</b>, <b>DICA</b> (conselho
          útil para o momento do seu jogo), <b>HISTÓRIA</b> (liberada com amizade 1, 3, 5, 7 e 9), <b>VIZINHOS</b> (o que
          ele acha dos outros), além do serviço, dos <b>PEDIDOS</b> e de <b>DORMIR</b> onde houver cama.
        </p>
        <Caixa tipo="dica">
          As dicas leem o seu jogo de verdade: vida, ouro, Brasas, horta, mochila e o próximo chefe. Pergunte ao
          especialista certo.
        </Caixa>
      </Secao>
      {MORADORES.map((m) => (
        <Secao key={m.id}>
          <article className="morador">
            <div className="morador-palco">
              <Sprite s={SPR[m.id]} escala={3} titulo={m.nome} />
              <Sprite s={CASAS[m.casa]} escala={0.9} parado titulo={m.casaNome} />
            </div>
            <div>
              <h2>{m.nome} <small>· {m.oficio}</small></h2>
              <blockquote>“{m.fala}”</blockquote>
              <p>{m.servico}</p>
              <dl className="ficha-dados">
                <dt>Especialista em</dt><dd>{m.especialidade}</dd>
                <dt>Onde mora</dt><dd>{m.casaNome}</dd>
                <dt>Horário</dt><dd>{m.horario?.length === 2 ? `${hora(m.horario[0])} às ${hora(m.horario[1])}` : m.id === "bardo" ? "Taverna das 18h às 2h" : "Conversas durante a rotina"}</dd>
                <dt>Folga</dt><dd>{DIAS_SEMANA[m.folga] ?? "Rotina própria"}</dd>
              </dl>
              <div className="rotina">
                {m.rotina.map(([h, o]) => (
                  <span key={h}><b>{hora(h)}</b> {o}</span>
                ))}
                {m.rotina.length > 0 && <span><b>{m.id === "bardo" ? "Após a taverna" : "22h"}</b> Descanso {m.id === "lia" ? "na pousada" : "em casa"}</span>}
              </div>
            </div>
          </article>
        </Secao>
      ))}
    </>
  );
}
