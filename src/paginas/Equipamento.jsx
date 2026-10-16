import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Tabela, Link, Ouro, Raridade } from "../componentes/ui.jsx";
import { ARMAS as SPR_ARMAS, CONJUNTOS as SPR_CONJ, MORADORES as SPR } from "../sprites.js";
import { ARMAS, ESCUDO, BIGORNA, ENCANTAMENTOS, RARIDADES, AFIXOS, CONJUNTOS, ASCENSAO } from "../dados.js";

export function Armas() {
  return (
    <>
      <Titulo sub="Espadas, maça, machado, lança, arcos e o escudo; bigorna e encantamentos.">Armas e escudo</Titulo>
      <Secao>
        <p>
          Você começa com <b>espada e escudo</b> na mão e a <b>lança</b> na mochila. As outras armas são liberadas por
          desafios permanentes: depois de liberada, cada partida ela vem comum e no nível 1. Troque de arma com
          <b> Z</b> (RB no controle).
        </p>
      </Secao>
      <Secao titulo="Arsenal">
        <Grade min={250}>
          {ARMAS.map((a) => (
            <article key={a.id} className="ficha arma">
              <div className="ficha-palco"><Sprite s={SPR_ARMAS[a.id]} escala={a.id.startsWith("arco") ? 5 : 3.5} parado titulo={a.nome} /></div>
              <div className="ficha-texto">
                <h3>{a.nome}</h3>
                <p className="etiqueta">{a.tipo}</p>
                <p>Dano por nível: <b>{a.dano.join(" / ")}</b></p>
                <p className="libera">🔓 {a.libera}</p>
              </div>
            </article>
          ))}
          <article className="ficha arma">
            <div className="ficha-palco"><Sprite s={SPR_ARMAS.escudo_basico} escala={3.5} parado titulo="Escudo" /></div>
            <div className="ficha-texto">
              <h3>Escudo Básico</h3>
              <p className="etiqueta">Defesa (Ctrl / LT)</p>
              <p>Vitalidade: <b>{ESCUDO.vitalidade.join(" / ")}</b></p>
              <p>Defesa: <b>{ESCUDO.defesa.join(" / ")}</b></p>
            </div>
          </article>
        </Grade>
        <Caixa tipo="nota" titulo="Arcos">
          O arco curto atira rápido, o curvo bate mais forte e o longo dispara <b>3 flechas</b> em leque, mas é o mais
          lento. Com a força inicial, o dano por segundo no nível 1 fica perto de 30, 40 e 63 (se as 3 acertarem).
        </Caixa>
      </Secao>

      <Secao titulo="Bigorna">
        <p>Na janela entre ondas (ou com o Tomás na vila), a bigorna sobe o nível da arma. Cada nível pede uma onda mínima e ouro:</p>
        <Tabela cabecalho={["Nível", "Onda mínima", "Arma", "Escudo"]}
          linhas={[1, 2, 3, 4].map((i) => [`${i} → ${i + 1}`, `onda ${BIGORNA.onda[i]}`, <Ouro n={BIGORNA.custo[i]} />, <Ouro n={ESCUDO.custo[i]} />])} compacta />
      </Secao>

      <Secao titulo="Encantamentos">
        <p>Só armas de ataque (o escudo não). Três níveis; cada nível custa 120 × o nível de ouro (120, 240, 360).</p>
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
      <Titulo sub="Equipamentos caem com cinco raridades, cada uma com cor própria.">Raridade</Titulo>
      <Secao>
        <div className="raridades">
          {RARIDADES.map((r) => (
            <div key={r.id} className="raridade-cartao" style={{ "--cor": r.cor }}>
              <Raridade id={r.id} />
              <b>{r.mult}</b>
              <span>status</span>
              <small>{r.afixos} bônus extra{r.afixos === 1 ? "" : "s"} · cai em {r.peso}</small>
            </div>
          ))}
        </div>
        <p>
          A raridade multiplica os status do item e sorteia <b>bônus extras</b> (afixos). O lendário pode trazer um
          encantamento no lugar de um dos bônus, já no nível 1. Cada onda empurra o sorteio para cima, e mutantes e
          chefes sobem mais um ou dois degraus.
        </p>
      </Secao>
      <Secao titulo="Bônus extras (afixos)">
        <Tabela cabecalho={["Bônus", "Valor (comum)", "Onde pode sair"]} linhas={AFIXOS.map((a) => [a.nome, a.valor, a.onde])} compacta />
        <p>Os valores sobem com a raridade, mas são pequenos de propósito: o grosso do ganho está no multiplicador.</p>
      </Secao>
      <Secao titulo="Chance de cair">
        <ul className="lista">
          <li>Inimigo comum: <b>1,5%</b> de soltar equipamento.</li>
          <li>Mutante: <b>6%</b>, um degrau de raridade acima.</li>
          <li>Chefe: <b>sempre</b>, no mínimo raro, dois degraus acima.</li>
        </ul>
        <Caixa tipo="nota" titulo="Venda">
          Na arena, um item vale (6 + 1,5 × onda) × o multiplicador de preço da raridade. O Tomás paga 1,5× isso,
          calculado pela maior onda que você já venceu.
        </Caixa>
      </Secao>
    </>
  );
}

export function Armaduras() {
  return (
    <>
      <Titulo sub="Três conjuntos de quatro peças: elmo, peitoral, luvas e botas.">Armaduras</Titulo>
      <Secao>
        <p>
          As peças só caem de <Link para="chefes">chefes</Link>: o equipamento do chefe tem 10% de chance de ser de cada
          conjunto (30% no total). Elas vêm comuns e no nível 1. Cada peça aparece no corpo do personagem em todas as
          animações, e dá para misturar conjuntos.
        </p>
      </Secao>
      <Secao titulo="Conjuntos">
        <Grade min={260}>
          {CONJUNTOS.map((c) => (
            <article key={c.id} className="ficha conjunto">
              <div className="ficha-palco"><Sprite s={SPR_CONJ[c.id]} escala={4} titulo={c.nome} /></div>
              <div className="ficha-texto">
                <h3>{c.nome}</h3>
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
              Peças de conjunto sobem na bigorna pagando o mesmo ouro e a mesma onda mínima das armas, <b>mais 1 Moeda
              de Forja por nível</b>. A moeda cai de qualquer chefe com 5% de chance, vai direto para a bolsa e se perde
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
