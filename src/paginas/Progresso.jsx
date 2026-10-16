import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Link, Brasas } from "../componentes/ui.jsx";
import { MORADORES as SPR, BRASA } from "../sprites.js";
import { MELHORIAS, CUSTOS_MELHORIA, APOIOS } from "../dados.js";

export function Progresso() {
  return (
    <>
      <Titulo sub="O que fica de uma partida para a outra.">Brasas e progresso</Titulo>
      <Secao>
        <div className="lado-a-lado">
          <Sprite s={BRASA} escala={8} parado titulo="Brasa" />
          <div>
            <p>
              <b>Brasas</b> são a moeda permanente. O ouro só vale dentro da partida; as Brasas ficam para sempre.
            </p>
            <Tabela cabecalho={["Como ganhar", "Brasas"]} compacta linhas={[
              ["Cada onda vencida", <Brasas n={2} />],
              ["Cada chefe derrotado", <Brasas n={15} />],
              ["Cada estágio bônus (mímicos)", <Brasas n={5} />],
              ["Pedidos do mural", <Brasas n="10 a 25" />],
              ["Colheita vendida à Lia", <Brasas n="3 a 9 cada" />],
              ["Bardo contratado", "+25% no fim da partida"],
            ]} />
          </div>
        </div>
      </Secao>

      <Secao titulo="Melhorias permanentes (com a Lia)">
        <div className="lado-a-lado">
          <Sprite s={SPR.lia} escala={3} titulo="Lia" />
          <p>
            Cada melhoria tem 5 níveis. Os custos são <b>{CUSTOS_MELHORIA.join(", ")}</b> Brasas, do nível 1 ao 5.
          </p>
        </div>
        <Tabela cabecalho={["Melhoria", "Por nível", "No nível 5"]} linhas={MELHORIAS.map((m) => {
          const n = parseFloat(m.efeito.match(/\d+/)[0]) * 5;
          return [<b>{m.nome}</b>, m.efeito, m.efeito.replace(/\d+/, n)];
        })} />
      </Secao>

      <Secao titulo="Apoios (contratos)">
        <p>Contratados uma vez com a Lia, ficam para sempre.</p>
        <Grade min={240}>
          {APOIOS.map((a) => (
            <Ficha key={a.nome} sprite={SPR[{ Curandeira: "curandeira", Bardo: "bardo", "Mística": "mistica" }[a.nome]]}
              nome={a.nome} etiqueta={<Brasas n={a.custo} />}>
              <p>{a.efeito}</p>
            </Ficha>
          ))}
        </Grade>
      </Secao>

      <Secao titulo="Desafios de armas">
        <p>Marcos permanentes que liberam armas novas para todas as partidas:</p>
        <Tabela cabecalho={["Desafio", "Meta", "Libera"]} compacta linhas={[
          ["Primeiros disparos", "Vencer a onda 3", "Arco Curto"],
          ["Dois gumes", "Vencer a onda 5", "Espada Gêmea"],
          ["Abrindo caminho", "Vencer a onda 8", "Maça"],
          ["Quebra-guarda", "Derrotar o chefe da onda 10", "Machado"],
          ["Mira paciente", "Vencer a onda 15", "Arco Curvo"],
          ["Três flechas", "Derrotar o chefe da onda 20", "Arco Longo"],
        ]} />
        <p>Veja os números de cada uma em <Link para="armas">Armas</Link>.</p>
      </Secao>

      <Secao titulo="O que se perde e o que fica">
        <Tabela cabecalho={["Fica para sempre", "Se perde ao cair"]} linhas={[
          ["Brasas, melhorias e apoios", "Ouro da partida"],
          ["Colheita e poções guardadas", "O prato do Caio (acaba com a partida)"],
          ["Armas liberadas pelos desafios", "Totens comprados"],
          ["Fazenda, plantas e sementes", "Saque ainda não vendido"],
          ["Amizades, pedidos e baú", "Moedas de Forja"],
          ["Recorde e checkpoint", "Equipamento da partida"],
        ]} />
        <Caixa tipo="dica">
          Novo Jogo apaga tudo, inclusive Brasas e amizades. Para recomeçar só a partida, basta cair ou usar o botão CIDADE.
        </Caixa>
      </Secao>
    </>
  );
}
