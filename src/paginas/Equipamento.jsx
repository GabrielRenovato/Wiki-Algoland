import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Tabela, Link, Ouro, Raridade, Passos } from "../componentes/ui.jsx";
import { ARMAS as SPR_ARMAS, ITENS_CONJUNTOS, VISUAIS, MORADORES as SPR } from "../sprites.js";
import { ARMAS, ESCUDO, BIGORNA, ENCANTAMENTOS, RARIDADES, AFIXOS, CONJUNTOS, ASCENSAO, RECEITAS } from "../dados.js";

export function Armas() {
  return (
    <>
      <Titulo sub="O arsenal atual: espada, espada de duas mãos, lança, machado, arco e escudo.">Armas e escudo</Titulo>
      <Secao>
        <p>
          Você começa com <b>espada e escudo</b>. Encontre receitas na fenda, use-as na mochila e
          encomende os outros equipamentos com <b>Ivo</b>. Os materiais são itens físicos da mochila.
          Troque de arma com <b>Z</b> (RB no controle).
        </p>
      </Secao>
      <Secao titulo="Arsenal">
        <Grade min={250}>
          {ARMAS.map((a) => (
            <article key={a.id} className="ficha arma">
              <div className="ficha-palco"><Sprite s={SPR_ARMAS[a.id]} escala={Math.min(100 / SPR_ARMAS[a.id].tam[0], 100 / SPR_ARMAS[a.id].tam[1])} parado titulo={a.nome} /></div>
              <div className="ficha-texto">
                <h3>{a.nome}</h3>
                <p className="etiqueta">{a.tipo}</p>
                <p>Dano por nível: <b>{a.dano.join(" / ")}</b></p>
                <p className="libera">🔓 {a.libera}</p>
              </div>
            </article>
          ))}
          <article className="ficha arma">
            <div className="ficha-palco"><Sprite s={SPR_ARMAS.escudo_basico} escala={6} parado titulo="Escudo" /></div>
            <div className="ficha-texto">
              <h3>Escudo Básico</h3>
              <p className="etiqueta">Defesa (C na Web / Ctrl no instalado / LT)</p>
              <p>Vitalidade: <b>{ESCUDO.vitalidade.join(" / ")}</b></p>
              <p>Defesa: <b>{ESCUDO.defesa.join(" / ")}</b></p>
            </div>
          </article>
        </Grade>
        <Caixa tipo="nota" titulo="Arcos">
          O modelo atual é o <b>Arco</b>, usado com uma aljava fabricada no Ivo. Maça, Arco Curvo e Arco Longo foram retirados do catálogo novo; os identificadores antigos são preservados para saves e encomendas existentes.
        </Caixa>
      </Secao>

      <Secao titulo="Fabricação com Ivo">
        <Passos itens={[
          <>Encontre a receita na fenda e use-a na mochila para aprender o modelo.</>,
          <>Leve os materiais pedidos à bigorna da ferraria e escolha <b>ENCOMENDAR</b>.</>,
          <>Espere o prazo no calendário do jogo: as receitas levam de <b>1 a 3 dias</b>. Avançar andares não reduz a espera.</>,
          <>Volte para <b>RETIRAR ENCOMENDA</b> quando o pedido estiver pronto.</>,
        ]} />
        <p>Durante o expediente, Ivo aviva o carvão com o fole, aquece o tarugo pela direita da fornalha, leva o ferro quente até a bigorna e martela. Essa animação não antecipa o prazo da encomenda: a retirada continua seguindo o calendário.</p>
        <p>O catálogo usa páginas, com ícones pixelados e mais receitas por página quando há espaço.</p>
        <p>Há {RECEITAS.length} receitas ativas de equipamentos. Os conjuntos têm quatro peças independentes; cada peça precisa ser fabricada.</p>
      </Secao>

      <Secao titulo="Catálogo de fabricação"><Tabela cabecalho={["Equipamento", "Materiais", "Prazo", "Receita"]} linhas={RECEITAS.map(r => [r.nome, Object.entries(r.materiais).map(([id,n]) => `${n} ${id}`).join(" + "), `${r.dias} dia(s)`, r.livre ? "Disponível desde o início" : `Elegível a partir do andar ${r.meta}`])} /><p>O marco torna a receita elegível para cair. Aprenda o pergaminho na mochila e encomende o item; vencer o andar não entrega a arma pronta.</p></Secao>
      <Secao titulo="Bigorna">
        <p>A bigorna sobe o nível da arma com ouro e exige progresso mínimo na fenda:</p>
        <Tabela cabecalho={["Nível", "Andar mínimo", "Arma", "Escudo"]}
          linhas={[1, 2, 3, 4].map((i) => [`${i} → ${i + 1}`, `andar ${BIGORNA.onda[i]}`, <Ouro n={BIGORNA.custo[i]} />, <Ouro n={ESCUDO.custo[i]} />])} compacta />
      </Secao>

      <Secao titulo="Encantamentos">
        <p>Só armas de ataque corpo a corpo; arcos e escudos não recebem encantamentos. Três níveis; cada nível custa 120 × o nível de ouro (120, 240, 360).</p>
        <Tabela cabecalho={["Tipo", "Nível 1", "Nível 2", "Nível 3"]}
          linhas={ENCANTAMENTOS.map((e) => [<b style={{ color: e.cor }}>{e.nome}</b>, ...e.niveis])} />
        <Caixa tipo="dica">Chefes não ficam paralisados pelo elétrico; contra eles, o raio e o fogo rendem mais.</Caixa>
      </Secao>
    </>
  );
}

export function RaridadePagina() {
  return (
    <>
      <Titulo sub="Equipamentos têm cinco raridades, cada uma com cor e multiplicador próprios.">Raridade</Titulo>
      <Secao>
        <div className="raridades">
          {RARIDADES.map((r) => (
            <div key={r.id} className="raridade-cartao" style={{ "--cor": r.cor }}>
              <Raridade id={r.id} />
              <b>{r.mult}</b>
              <span>status</span>
              <small>{r.afixos} bônus extra{r.afixos === 1 ? "" : "s"}</small>
            </div>
          ))}
        </div>
        <p>
          A raridade multiplica os status do item e sorteia <b>bônus extras</b> (afixos). O lendário pode trazer um
          encantamento no lugar de um dos bônus, já no nível 1. O catálogo da forja mostra a raridade inicial; peças de conjunto também podem subir de raridade na bigorna.
        </p>
      </Secao>
      <Secao titulo="Bônus extras (afixos)">
        <Tabela cabecalho={["Bônus", "Valor (comum)", "Onde pode sair"]} linhas={AFIXOS.map((a) => [a.nome, a.valor, a.onde])} compacta />
        <p>Os valores sobem com a raridade, mas são pequenos de propósito: o grosso do ganho está no multiplicador.</p>
      </Secao>
      <Secao titulo="Receitas e recompensas">
        <p>As chances de pergaminho são 0,2% por inimigo comum, 1% por elite/mutante e 20% por guardião. O sorteio considera apenas receitas elegíveis e ainda pendentes; não é um drop de equipamento pronto.</p>
        <p>O baú gigante da sala de tesouro tem 5% de chance de entregar uma receita de conjunto pendente (ou Moeda de Forja, se já tiver todas). <Link para="arena">Veja o tesouro da fenda.</Link></p>
      </Secao>
    </>
  );
}

export function Armaduras() {
  return (
    <>
      <Titulo sub="Dez conjuntos de quatro peças: elmo, peitoral, luvas e botas.">Armaduras</Titulo>
      <Secao>
        <p>
          Aprenda o pergaminho e fabrique cada peça com Ivo. O andar mínimo e os materiais variam por conjunto; veja o catálogo de fabricação. O baú do tesouro pode fornecer receitas. As quatro peças são independentes e podem ser misturadas. Os efeitos dos itens e a aparência cosmética são sistemas separados.
        </p>
      </Secao>
      <Secao titulo="Conjuntos">
        <Grade min={260}>
          {CONJUNTOS.map((c) => (
            <article key={c.id} className="ficha conjunto">
              <div className="ficha-palco">{VISUAIS[`conjunto_${c.id}`] && <div className="conjunto-modelo"><Sprite s={VISUAIS[`conjunto_${c.id}`]} escala={3} titulo={`${c.nome} no personagem atual`} /></div>}<div className="conjunto-itens">{c.pecas.map(tipo => <Sprite key={tipo} s={ITENS_CONJUNTOS[tipo]} escala={36 / Math.max(...ITENS_CONJUNTOS[tipo].tam)} parado titulo={tipo.replaceAll("_", " ")} />)}</div></div>
              <div className="ficha-texto">
                <h3>{c.nome}</h3><p className="etiqueta"><Raridade id={c.raridade} /> · Elmo elegível no andar {c.meta}</p>
                <p><b>4 peças:</b> {c.completo}</p>
                <p><b>2 ou 3 peças:</b> {c.parcial}</p>
                {c.nivel && <p className="etiqueta">{c.nivel}</p>}
              </div>
            </article>
          ))}
        </Grade>
      </Secao>
      <Secao titulo="Regras do bônus">
        <ul className="lista">
          <li>1 peça não dá bônus; 2 ou 3 dão metade; 4 dão o efeito completo.</li>
          <li>Cada nível acima do 1 soma <b>25%</b> ao efeito (nível 5 = o dobro).</li>
          <li>Vale o nível da peça <b>mais fraca</b> do conjunto equipado.</li>
        </ul>
      </Secao>
      <Secao titulo="Moeda de Forja e ascensão">
        <div className="lado-a-lado">
          <Sprite s={SPR.mercador} escala={3} titulo="Tomás" />
          <div>
            <p>
              Peças de conjunto sobem na bigorna pagando o mesmo ouro e o mesmo andar mínimo das armas, <b>mais 1 Moeda
              de Forja por nível</b>. Cada guardião derrotado deixa uma Moeda de Forja. É um material físico da mochila e permanece
              se você cair.
            </p>
            <p>
              No <b>nível 5</b> a peça para de subir de nível e passa a <b>subir de raridade</b>: cada melhoria custa 1
              Moeda de Forja e soma um bônus aleatório novo. O multiplicador da raridade passa a valer na vitalidade e na
              defesa da peça.
            </p>
          </div>
        </div>
        <Tabela cabecalho={["Ascensão", "Custo"]} compacta linhas={[
          [<><Raridade id="comum" /> → <Raridade id="incomum" /></>, <Ouro n={ASCENSAO[0]} />],
          [<><Raridade id="incomum" /> → <Raridade id="raro" /></>, <Ouro n={ASCENSAO[1]} />],
          [<><Raridade id="raro" /> → <Raridade id="epico" /></>, <Ouro n={ASCENSAO[2]} />],
          [<><Raridade id="epico" /> → <Raridade id="lendario" /></>, <Ouro n={ASCENSAO[3]} />],
        ]} />
        <p>O máximo é lendária nível 5, com 4 bônus.</p>
      </Secao>
    </>
  );
}
