import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Passos, Brasas } from "../componentes/ui.jsx";
import { FERRAMENTAS, CASAS, DROPS, MORADORES as SPR, colhido, crescimento, celula, pocao } from "../sprites.js";
import { PLANTAS, POCOES, ESTACOES, PRECO_SEMENTE, CHANCE_SEMENTE, REFEICOES, BRASAS_COLHEITA } from "../dados.js";

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
          <Ficha sprite={colhido([2, 6])} escala={4} nome="Colher">
            <p>Colhe a planta madura. Atalho: <b>R</b> ou <b>Y</b> no controle.</p>
          </Ficha>
        </Grade>
        <Caixa tipo="nota" titulo="Kit inicial">
          O kit inicial inclui espada, escudo, enxada, regador, machadinha e picareta. Colher é um comando próprio,
          sem ocupar uma casa da mochila. A espada também pode ser selecionada na fazenda para roçar o mato e obter feno.
        </Caixa>
      </Secao>

      <Secao titulo="Galinheiro e animais" id="galinheiro">
        <p>Na <Link para="vila">carpintaria do Osvaldo</Link>, depois da ponte a leste da vila,
          encomende o abrigo ou uma ampliação. O atendimento funciona das <b>8h às 17h</b>.</p>
        <Tabela cabecalho={["Nível", "Capacidade", "Materiais", "Prazo"]} linhas={[
          ["1", "4 aves", "12 madeiras + 8 pedras", "2 dias"],
          ["2", "8 aves", "24 madeiras + 16 pedras + 4 ferros", "3 dias"],
          ["3", "12 aves", "40 madeiras + 24 pedras + 8 ferros", "4 dias"],
        ]} />
        <Passos itens={[
          <>A primeira construção chega com <b>duas galinhas e um galo</b>. O comedouro começa vazio.</>,
          <>Corte mato com a <b>espada</b> para ganhar feno, ou prepare <b>14 porções com 2 fibras</b> no depósito do galinheiro.</>,
          <>Selecione o feno na barra, aproxime-se do comedouro e use o botão de ataque/usar. Cada uso coloca uma porção.</>,
          <>Cada ave alimentada consome uma porção por dia. Galinhas adultas alimentadas botam ovos; galos não botam.</>,
          <>Com um galo adulto, coloque um ovo no ninho de incubação. O pintinho nasce em <b>3 dias</b>, precisa de uma vaga e amadurece após <b>5 dias</b>.</>,
        ]} />
        <Caixa tipo="nota" titulo="Loja e cuidados">
          O catálogo do Osvaldo mostra a imagem e o preço: <b>25 Brasas por galinha ou galo</b>.
          Vagas de incubação entram na lotação. Os cuidados, ovos, carinho e portinha são feitos diretamente no cenário.
          Ficar sem feno pausa a produção, sem matar as aves nem retirar o vínculo.
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

export function Refeicoes() {
  return (
    <>
      <Titulo sub="A colheita vira prato com o Caio, e o prato vale a próxima partida inteira na arena.">Refeições</Titulo>
      <Secao>
        <div className="lado-a-lado">
          <Sprite s={SPR.bardo} escala={3} titulo="Caio" />
          <div>
            <Passos itens={[
              <>Colha na <Link para="fazenda">fazenda</Link> e leve a colheita para a vila.</>,
              <>Converse com o <b>Caio</b> (a qualquer hora) e escolha <b>COZINHAR</b>. O botão ganha um * quando você já tem os ingredientes de algum prato.</>,
              <>Escolha o prato: ele gasta os ingredientes e o bônus passa a valer. Ao entrar na arena o jogo lembra qual prato está ativo.</>,
              <>O prato acaba junto com a partida (quando você cai ou volta pelo botão CIDADE). Aí o Caio cozinha outro.</>,
            ]} />
          </div>
        </div>
        <Caixa tipo="nota" titulo="Regras">
          Um prato por vez, e ele só vale uma partida. O bônus soma por cima das melhorias permanentes da Lia. No
          cooperativo, os dois jogadores ficam com o mesmo prato. O prato fica salvo se você fechar o jogo antes de entrar.
        </Caixa>
      </Secao>
      <Secao titulo="Os pratos">
        <Grade min={290}>
          {REFEICOES.map((r) => (
            <article key={r.id} className="ficha pocao">
              <div className="ficha-palco"><Sprite s={colhido(planta(r.item).item)} escala={4} parado titulo={r.nome} /></div>
              <div className="ficha-texto">
                <h3>{r.nome}</h3>
                <p className="etiqueta"><b>{r.bonus}</b></p>
                <div className="receita">
                  {Object.entries(r.receita).map(([id, n]) => (
                    <span key={id} title={planta(id).nome}>
                      <Sprite s={colhido(planta(id).item)} escala={2} parado titulo={planta(id).nome} />
                      ×{n}
                    </span>
                  ))}
                </div>
                <p className="citacao">{r.texto}</p>
              </div>
            </article>
          ))}
        </Grade>
        <p>
          Os valores são fortes de propósito: a Sopa de Raízes, por exemplo, vale quase 4 níveis de Vigor. Quem planta
          entra na arena bem mais forte do que quem ignora a horta.
        </p>
      </Secao>
      <Secao titulo="Vender colheita para a Lia">
        <p>
          A colheita que sobrar vira Brasas para as melhorias permanentes: na conversa com a <Link para="moradores">Lia</Link>,
          escolha <b>VENDER COLHEITA</b>. Cada unidade paga mais do que a semente custou, e quanto mais rara a planta, mais ela vale.
        </p>
        <Tabela compacta cabecalho={["Raridade da planta", "Brasas por unidade"]} linhas={[
          [<RaridadeSemente r="comum" />, <Brasas n={BRASAS_COLHEITA.comum} />],
          [<RaridadeSemente r="incomum" />, <Brasas n={BRASAS_COLHEITA.incomum} />],
          [<RaridadeSemente r="raro" />, <Brasas n={BRASAS_COLHEITA.raro} />],
          [<RaridadeSemente r="epico" />, <Brasas n={BRASAS_COLHEITA.epico} />],
        ]} />
        <Caixa tipo="dica">
          Plante a estação inteira: o que não cabe em prato nem em poção ainda paga as melhorias da vila.
        </Caixa>
      </Secao>
    </>
  );
}
