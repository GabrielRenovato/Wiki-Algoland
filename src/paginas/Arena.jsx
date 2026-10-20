import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Passos, Brasas, Ouro } from "../componentes/ui.jsx";
import { INIMIGOS, CHEFES as SPR_CHEFES, PORTAL, MORADORES as SPR } from "../sprites.js";
import { ESTAGIOS, CHEFES, TOTENS } from "../dados.js";

export function Arena() {
  return (
    <>
      <Titulo sub="Explore a fenda, complete a caçada e enfrente o guardião de cada andar.">Fenda por andares</Titulo>
      <Secao titulo="Como avançar">
        <div className="lado-a-lado">
          <Sprite s={PORTAL} escala={3} titulo="Portal" />
          <Passos itens={[
            <>Entre pelo <b>portal da vila</b> e escolha o desafio.</>,
            <>Explore o mapa e enfrente patrulhas, grupos e elites para preencher os <b>pontos da caçada</b>.</>,
            <>A meta exige apenas parte dos encontros disponíveis. Você pode escolher o caminho sem limpar todos os becos.</>,
            <>Ao completar a caçada, procure e derrote o <b>guardião do andar</b>.</>,
            <>Depois da vitória, converse com <b>Orion</b> para acessar as melhorias, avançar ou voltar à cidade.</>,
          ]} />
        </div>
      </Secao>
      <Secao titulo="Mapas e exploração">
        <p>A fenda tem <b>11 mapas</b>. Depois do mapa 11, o circuito repete os mapas 2 a 11 com dificuldade crescente.</p>
        <p>Os encontros ficam distribuídos pelo cenário. Observe os caminhos e os avisos dos ataques antes de entrar em combate.</p>
        <Caixa tipo="dica" titulo="Materiais para a forja">
          Concluir andares rende fragmentos da arena. Leve a picareta para minerar os veios e guarde os materiais físicos na mochila para fabricar equipamentos com Ivo.
        </Caixa>
      </Secao>
      <Secao titulo="Entre os andares">
        <p>A vitória chama Orion; o menu não abre automaticamente por cima do saque. Fale com ele quando estiver pronto.</p>
        <Tabela cabecalho={["Serviço", "Para que serve"]} linhas={[
          [<b>MELHORIAS</b>, "Totens pagos com ouro, válidos até o fim da partida."],
          [<b>BIGORNA</b>, <>Evolução de armas e escudo. <Link para="armas">Veja os equipamentos</Link>.</>],
          [<b>ENCANTAR</b>, <>Encantamentos para armas de ataque. <Link para="armas">Veja os efeitos</Link>.</>],
          [<b>SAQUE</b>, "Escolha o que levar ou vender quando o equipamento não couber na mochila."],
        ]} />
      </Secao>
      <Secao titulo="Totens">
        <p>Os bônus duram a partida. Cada cópia comprada do mesmo totem custa 20% a mais.</p>
        <Tabela cabecalho={["Totem", "Preço base", "Efeito"]} linhas={TOTENS.map((t) => [<b>{t.nome}</b>, <Ouro n={t.preco} />, t.efeito])} />
      </Secao>
      <Secao titulo="Morrer e sair">
        <Grade min={260}>
          <Ficha sprite={SPR.curandeira} nome="Se você cair">
            <p>Você acorda na enfermaria com Dona Rosa. As conquistas permanentes da fazenda e os equipamentos continuam fazendo parte da sua progressão.</p>
          </Ficha>
          <Ficha sprite={PORTAL} nome="Voltar à cidade">
            <p>Depois da vitória, converse com Orion para encerrar a expedição ou continuar no próximo andar.</p>
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
