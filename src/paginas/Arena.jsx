import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Passos, Brasas, Ouro } from "../componentes/ui.jsx";
import { INIMIGOS, CHEFES as SPR_CHEFES, PORTAL, MORADORES as SPR } from "../sprites.js";
import { ESTAGIOS, CHEFES, EVENTOS, TOTENS } from "../dados.js";

export function Arena() {
  return (
    <>
      <Titulo sub="A Arena do Limiar: ondas cada vez mais fortes, chefes a cada 10 e uma janela de compras entre elas.">Arena</Titulo>
      <Secao titulo="Como uma partida funciona">
        <div className="lado-a-lado">
          <Sprite s={PORTAL} escala={3} titulo="Portal" />
          <Passos itens={[
            <>Interaja com o <b>portal da vila</b> e escolha o desafio. Você é levado à arena e a onda começa sozinha.</>,
            <>Derrote todos os inimigos. Cada abate dá <Ouro n="ouro" />; o fim da onda dá um bônus maior.</>,
            <>Sementes e equipamentos que caíram <b>voam até você</b> no fim da onda.</>,
            <>Abre a <b>janela entre ondas</b>, com abas de compras e o saque.</>,
            <>Clique em PRÓXIMA ONDA ou fique alguns segundos no <b>círculo brilhante</b> do chão.</>,
          ]} />
        </div>
      </Secao>

      <Secao titulo="A janela entre ondas">
        <Tabela cabecalho={["Aba", "Para que serve"]} linhas={[
          [<b>MELHORIAS</b>, "Totens pagos com ouro, que valem até o fim da partida (veja abaixo)."],
          [<b>BIGORNA</b>, <>Sobe o nível da arma e do escudo. Peças de conjunto pedem também a Moeda de Forja. <Link para="armas">Detalhes</Link></>],
          [<b>ENCANTAR</b>, <>Fogo, gelo, raio ou elétrico na arma. <Link para="armas">Detalhes</Link></>],
          [<b>SAQUE</b>, "12 casas para o equipamento que não coube na mochila. Escolha o que levar ou vender."],
        ]} />
        <p>
          No rodapé ficam <b>CIDADE</b> (pede confirmação e encerra a partida, você fica com as Brasas e o
          equipamento) e <b>PRÓXIMA ONDA</b>. Se fechar a janela, o portal da arena a reabre entre as ondas.
        </p>
        <Caixa tipo="dica" titulo="Vender sozinho">
          No SAQUE existe o filtro “vender sozinho ao pegar”: nada, só comuns, ou até incomuns. Poupa tempo nas ondas altas.
        </Caixa>
      </Secao>

      <Secao titulo="Totens (aba MELHORIAS)">
        <p>Cada cópia comprada na mesma partida custa 20% a mais. Somem quando a partida acaba.</p>
        <Tabela cabecalho={["Totem", "Preço base", "Efeito"]} linhas={TOTENS.map((t) => [<b>{t.nome}</b>, <Ouro n={t.preco} />, t.efeito])} />
      </Secao>

      <Secao titulo="Ouro e dificuldade">
        <ul className="lista">
          <li>Abate: <b>3 de ouro</b>, mais 1 a cada 4 ondas. Fim da onda: <b>25 + 13 × onda</b>.</li>
          <li>Cada onda tem 2 inimigos a mais que a anterior (até 60 por onda, 25 ao mesmo tempo).</li>
          <li>Nas 5 primeiras ondas a vida e o dano sobem devagar (+8% e +4% por onda); depois, +18% e +10%.</li>
          <li>A espada nível 2 (200 de ouro) fica ao alcance na onda 4, e a nível 3 (500) na onda 8.</li>
        </ul>
      </Secao>

      <Secao titulo="Eventos de onda">
        <p>A partir da onda 4, cada onda tem 25% de chance de trazer um evento (nunca na de chefe nem no bônus).</p>
        <div className="eventos">
          {EVENTOS.map((e) => (
            <div key={e.nome} className="evento" style={{ "--cor": e.cor }}>
              <b>{e.nome}</b>
              <span>{e.resumo}</span>
              <small>Ouro {e.ouro}</small>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Estágio bônus: mímicos">
        <div className="lado-a-lado">
          <Sprite s={INIMIGOS.mimico} escala={3} titulo="Mímico" />
          <p>
            A partir da onda 3, há 15% de chance de aparecer um estágio só de <b>mímicos</b> (baús que mordem). Ele não
            conta como onda, e cada abate rende <b>5× o ouro</b>, com <b>3× o bônus</b> no final. Vencer dá <Brasas n={5} />.
          </p>
        </div>
      </Secao>

      <Secao titulo="Morrer e sair">
        <Grade min={260}>
          <Ficha sprite={SPR.curandeira} nome="Se você cair">
            <p>
              Você acorda deitado num leito da enfermaria, com a Dona Rosa ao lado. A partida vira Brasas; ouro,
              Moedas de Forja e saque não vendido se perdem. Fazenda, sementes e melhorias ficam.
            </p>
          </Ficha>
          <Ficha sprite={PORTAL} nome="Se você voltar à vila">
            <p>
              O botão CIDADE pede confirmação e encerra a partida: você recebe as Brasas, perde os totens, o saque que
              sobrou é vendido sozinho e a próxima partida volta à onda 1. O equipamento fica com você.
            </p>
          </Ficha>
        </Grade>
      </Secao>
    </>
  );
}

export function Inimigos() {
  return (
    <>
      <Titulo sub="Cada estágio dura 2 ondas e usa uma só espécie (menos os esqueletos, que vêm em trio).">Inimigos</Titulo>
      <Secao>
        <Grade min={230}>
          {ESTAGIOS.map((e) => (
            <article key={e.ondas} className="ficha inimigo">
              <div className="ficha-palco">
                {e.ids.map((id) => <Sprite key={id} s={INIMIGOS[id]} escala={INIMIGOS[id].tam[0] > 40 ? 1.5 : INIMIGOS[id].tam[0] > 32 ? 2 : 3} titulo={id} />)}
              </div>
              <div className="ficha-texto">
                <h3>{e.nomes.join(", ")}</h3>
                <p className="etiqueta">Ondas {e.ondas}{e.nota ? ` (${e.nota})` : ""}</p>
              </div>
            </article>
          ))}
        </Grade>
        <Caixa tipo="nota" titulo="Depois da onda 18">
          A sequência recomeça do morcego (sem o estágio só de slimes), e a vida e o dano continuam subindo a cada onda.
          A velocidade também cresce, até um teto.
        </Caixa>
      </Secao>
      <Secao titulo="Mutantes">
        <p>
          A partir da onda 6 surgem <b>mutantes</b>: maiores, mais fortes e com uma coroa cinza acima da barra de vida.
          A chance começa em 5% e sobe 1,5% por onda, até 35% (até 90% no evento ELITE). Eles soltam equipamento com mais
          frequência (6% contra 1,5% dos comuns) e com raridade melhor.
        </p>
      </Secao>
      <Secao titulo="Esqueletos">
        <Tabela cabecalho={["Classe", "Como luta"]} linhas={[
          ["Guerreiro", "Corpo a corpo, avança até você."],
          ["Arqueiro", "Mantém distância e atira flechas."],
          ["Mago", "Lança projéteis mágicos de longe."],
        ]} compacta />
      </Secao>
    </>
  );
}

export function Chefes() {
  return (
    <>
      <Titulo sub="A cada 10 ondas um chefe entra sozinho, sem escolta, em rodízio.">Chefes</Titulo>
      <Secao>
        <p>
          Chefes têm <b>coroa dourada</b>, barra de vida própria no HUD e mostram <b>avisos no chão</b> antes dos
          golpes fortes: saia da área marcada. Depois do 5º chefe o rodízio recomeça, mais forte.
        </p>
      </Secao>
      {CHEFES.map((c) => (
        <Secao key={c.id}>
          <article className="chefe">
            <div className="chefe-palco">
              <Sprite s={SPR_CHEFES[c.id]} escala={c.escala} titulo={c.nome} />
            </div>
            <div>
              <p className="sobretitulo">Onda {c.onda}</p>
              <h2>{c.nome}</h2>
              {c.nota && <p className="etiqueta">{c.nota}</p>}
              <div className="golpes">{c.golpes.map((g) => <span key={g}>{g}</span>)}</div>
            </div>
          </article>
        </Secao>
      ))}
      <Secao titulo="Recompensas de chefe">
        <ul className="lista">
          <li>Sempre solta <b>equipamento</b>, no mínimo raro. Há 10% de chance de cada conjunto de <Link para="armaduras">armadura</Link> (30% no total).</li>
          <li>Sempre solta <b>2 sementes</b> garantidas, com chance boa de raras e épicas.</li>
          <li>Rende <Brasas n={15} /> e tem <b>5%</b> de chance da <b>Moeda de Forja</b>.</li>
          <li>Libera a onda seguinte (11, 21, 31…) como <b>checkpoint</b> para a Mística.</li>
        </ul>
        <Caixa tipo="aviso" titulo="Medusa">
          O olhar de pedra petrifica você por um instante. Fique de olho no aviso e saia da frente dela.
        </Caixa>
      </Secao>
    </>
  );
}
