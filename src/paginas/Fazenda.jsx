import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Passos, Brasas } from "../componentes/ui.jsx";
import { FERRAMENTAS, CASAS, DROPS, MORADORES as SPR, colhido, crescimento, celula, pocao } from "../sprites.js";
import { PLANTAS, POCOES, ESTACOES, PRECO_SEMENTE, CHANCE_SEMENTE } from "../dados.js";

const COR_RARIDADE = { comum: "#ebebe0", incomum: "#73ff66", raro: "#66adff", epico: "#d173ff" };
const NOME_RARIDADE = { comum: "Comum", incomum: "Incomum", raro: "Rara", epico: "Épica" };
const RaridadeSemente = ({ r }) => <span className="raridade" style={{ "--cor": COR_RARIDADE[r] }}>{NOME_RARIDADE[r]}</span>;
const saco = (p) => celula("fazenda/plantas.png", [416, 288], 16, p.saco[0], p.saco[1]);
const planta = (id) => PLANTAS.find((p) => p.id === id);

export function Fazenda() {
  return (
    <>
      <Titulo sub="A oeste da vila: horta grande, pomar, pedreira, laguinho e a sua casa.">Fazenda</Titulo>
      <Secao>
        <div className="lado-a-lado">
          <Sprite s={CASAS.casa_jogador} escala={2} parado titulo="Sua casa" />
          <p>
            A fazenda é cercada por um paredão de pedra ao norte e floresta fechada nos outros lados, com a estrada
            que volta para a vila. No meio fica a <b>horta</b>, a área onde dá para arar e plantar. A sua <b>casa</b> tem
            cômodos, a cama onde você dorme e o <b>baú</b>.
          </p>
        </div>
      </Secao>

      <Secao titulo="Ferramentas">
        <p>Ferramentas são itens da mochila. Escolha a casa da barra e use o botão de ataque/usar.</p>
        <Grade min={220}>
          <Ficha sprite={FERRAMENTAS.enxada} escala={4} nome="Enxada">
            <p>Ara a terra da horta, arranca o mato e limpa plantas murchas.</p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.regador} escala={4} nome="Regador">
            <p>Molha o solo arado. Tem <b>20 regas</b>; enche de novo no laguinho da fazenda.</p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.machadinha} escala={4} nome="Machadinha">
            <p>Corta árvores, arbustos e arvoretas. Árvore cortada vira toco, que sai com mais 2 golpes.</p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.picareta} escala={4} nome="Picareta">
            <p>Quebra as pedras da pedreira e as que nascem no meio da horta.</p>
          </Ficha>
          <Ficha sprite={colhido([2, 6])} escala={4} nome="Mão (colher)">
            <p>Colhe a planta madura. Atalho: <b>R</b> ou <b>Y</b> no controle.</p>
          </Ficha>
        </Grade>
        <Caixa tipo="nota" titulo="Kit inicial">
          Espada e escudo na mão; enxada, regador e mão na primeira linha da mochila; a lança na segunda. Se você cair
          na arena, as ferramentas voltam com o kit e as sementes ficam.
        </Caixa>
      </Secao>

      <Secao titulo="Como plantar">
        <Passos itens={[
          <>Limpe o canteiro: mato sai com a <b>enxada</b>, pedra com a <b>picareta</b>, arbusto e arvoreta com a <b>machadinha</b>.</>,
          <>Are a terra com a <b>enxada</b> (só dentro da área de plantio; no inverno o solo congela).</>,
          <>Escolha um saco de semente <b>da estação</b> na barra e plante na terra arada.</>,
          <>Regue <b>todo dia</b>. Só cresce o dia em que a planta foi regada; a chuva rega tudo sozinha.</>,
          <>Quando madura, colha: cada colheita dá um item, que empilha na mochila.</>,
        ]} />
      </Secao>

      <Secao titulo="Entulho, árvores e pedras">
        <div className="lado-a-lado">
          <div className="dupla">
            <Sprite s={DROPS.madeira} escala={4} parado titulo="Madeira" />
            <Sprite s={DROPS.pedra} escala={4} parado titulo="Pedra" />
          </div>
          <p>
            Como no Stardew Valley, a horta fica cheia de entulho: na primeira visita surgem <b>60</b> peças (mato,
            pedra, arbusto e arvoreta) e nascem mais <b>4 por noite</b>, até o teto de <b>90</b>. As árvores do pomar
            voltam em <b>5 dias</b>; arbustos e pedras, em <b>3</b>.
          </p>
        </div>
      </Secao>

      <Secao titulo="Baú e laguinho">
        <Grade min={260}>
          <Ficha nome="Baú da casa">
            <p>Começa com <b>8 casas</b>. Guarda qualquer item da mochila (menos a arma e o escudo em uso); sementes iguais empilham.</p>
          </Ficha>
          <Ficha nome="Laguinho">
            <p>O regador só enche aqui: use-o virado para a água, como no Harvest Moon. No inverno a água congela, mas você quebra o gelo e enche igual.</p>
          </Ficha>
          <Ficha sprite={SPR.bento} nome="Sementes do Bento">
            <p>Vende sementes da estação por Brasas e dá 2 sementes por dia se houver espaço na mochila.</p>
          </Ficha>
        </Grade>
      </Secao>
      <p className="continua">Continua em <Link para="plantas">Plantas</Link> e <Link para="pocoes">Poções</Link>.</p>
    </>
  );
}

export function Plantas() {
  return (
    <>
      <Titulo sub="Doze plantas, quatro por estação. O inverno não tem plantio.">Plantas</Titulo>
      <Secao>
        <p>
          As sementes vêm do <Link para="moradores">Bento</Link> (compradas com Brasas) ou caem dos inimigos da arena.
          Quanto melhor a poção que a planta faz, mais rara é a semente.
        </p>
      </Secao>
      {[0, 1, 2].map((e) => (
        <Secao key={e} titulo={ESTACOES[e]}>
          <Grade min={250}>
            {PLANTAS.filter((p) => p.estacao === e).map((p) => (
              <article key={p.id} className="ficha planta">
                <div className="planta-palco">
                  <Sprite s={saco(p)} escala={3} parado titulo={`Semente de ${p.nome}`} />
                  <span className="seta">→</span>
                  <Sprite s={crescimento(p.id, p.larg, p.alta, p.quadros)} escala={3} titulo={`${p.nome} crescendo`} />
                  <span className="seta">→</span>
                  <Sprite s={colhido(p.item)} escala={3} parado titulo={p.nome} />
                </div>
                <div className="ficha-texto">
                  <h3>{p.nome}</h3>
                  <p className="etiqueta"><RaridadeSemente r={p.raridade} /> · {p.dias} dias regados</p>
                  <p>Semente: <Brasas n={PRECO_SEMENTE[p.raridade]} /> · cai de {CHANCE_SEMENTE[p.raridade]} dos inimigos</p>
                </div>
              </article>
            ))}
          </Grade>
        </Secao>
      ))}
      <Secao titulo="Sementes na arena">
        <p>
          Cada inimigo comum tem uma chance pequena de soltar semente: 1% (comum), 0,4% (incomum), 0,12% (rara) e
          0,04% (épica). Mutantes têm o triplo de chance, e todo <Link para="chefes">chefe</Link> solta pelo menos
          <b> 2 sementes garantidas</b>. Sementes raras e épicas brilham no chão.
        </p>
      </Secao>
    </>
  );
}

export function Pocoes() {
  return (
    <>
      <Titulo sub="A colheita vira poção com a Dona Rosa; a poção é bebida na arena.">Poções</Titulo>
      <Secao>
        <div className="lado-a-lado">
          <Sprite s={SPR.curandeira} escala={3} titulo="Dona Rosa" />
          <p>
            Converse com a <b>Dona Rosa</b> na enfermaria e escolha <b>POÇÕES</b>: abre o caldeirão com as receitas
            fixas. Cada estação de plantio tem duas receitas, feitas só com plantas da própria estação. As poções vão para
            o <b>cinto</b> do HUD na arena: <b>Q</b>/<b>E</b> trocam, <b>R</b> bebe (Y no controle).
          </p>
        </div>
      </Secao>
      <Secao titulo="Receitas">
        <Grade min={280}>
          {POCOES.map((p) => (
            <article key={p.id} className="ficha pocao">
              <div className="ficha-palco"><Sprite s={pocao(p.icone)} escala={4} parado titulo={p.nome} /></div>
              <div className="ficha-texto">
                <h3>{p.nome}</h3>
                <p className="etiqueta">{p.efeito}{p.duracao ? ` por ${p.duracao} s` : " (na hora)"}</p>
                <div className="receita">
                  {Object.entries(p.receita).map(([id, n]) => (
                    <span key={id} title={planta(id).nome}>
                      <Sprite s={colhido(planta(id).item)} escala={2} parado titulo={planta(id).nome} />
                      ×{n}
                    </span>
                  ))}
                </div>
                <p className="citacao">{p.texto}</p>
              </div>
            </article>
          ))}
        </Grade>
      </Secao>
      <Tabela cabecalho={["Estação", "Poções"]} linhas={[
        ["Primavera", "Cura e Fôlego"], ["Verão", "Força e Velocidade"], ["Outono", "Pedra e Vampírica"],
      ]} compacta />
    </>
  );
}
