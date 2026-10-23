import Sprite from "./Sprite.jsx";
import { BRASA, MOEDA } from "../sprites.js";
import { RARIDADES } from "../dados.js";

export function Titulo({ children, sub }) {
  return (
    <header className="titulo-pagina">
      <h1>{children}</h1>
      {sub && <p className="sub">{sub}</p>}
    </header>
  );
}

/** Âncora estável a partir do título (o sumário "Nesta página" usa os ids das seções). */
export const ancora = (texto) =>
  String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function Secao({ titulo, id, children }) {
  const automatico = typeof titulo === "string" ? ancora(titulo) : undefined;
  return (
    <section className="secao" id={id ?? automatico}>
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  );
}

/** Caixa de destaque: "dica", "aviso" ou "nota". */
export function Caixa({ tipo = "dica", titulo, children }) {
  const rotulo = { dica: "Dica", aviso: "Atenção", nota: "Como funciona" }[tipo];
  const simbolo = { dica: "💡", aviso: "⚠️", nota: "📘" }[tipo];
  return (
    <aside className={`caixa caixa-${tipo}`}>
      <span className="caixa-simbolo" aria-hidden>{simbolo}</span>
      <div className="caixa-corpo">
        <strong>{titulo ?? rotulo}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}

/** Cartão com sprite à esquerda (ou em cima) e texto. */
export function Ficha({ sprite, escala = 2, nome, etiqueta, children, largo = false }) {
  return (
    <article className={`ficha ${largo ? "ficha-larga" : ""}`}>
      {sprite && (
        <div className="ficha-palco">
          <Sprite s={sprite} escala={escala} titulo={nome} />
        </div>
      )}
      <div className="ficha-texto">
        <h3>{nome}</h3>
        {etiqueta && <p className="etiqueta">{etiqueta}</p>}
        {children}
      </div>
    </article>
  );
}

export function Grade({ children, min = 240 }) {
  return <div className="grade" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))` }}>{children}</div>;
}

export function Tabela({ cabecalho, linhas, compacta = false }) {
  return (
    <div className="tabela-rolagem">
      <table className={compacta ? "compacta" : ""}>
        <thead>
          <tr>{cabecalho.map((c, i) => <th key={i}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i}>{l.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Tecla = ({ children }) => <kbd>{children}</kbd>;

export function Brasas({ n }) {
  return (
    <span className="moeda brasa">
      <Sprite s={BRASA} escala={1.6} parado titulo="Brasas" />
      {n}
    </span>
  );
}

export function Ouro({ n }) {
  return (
    <span className="moeda ouro">
      <Sprite s={MOEDA} escala={1} parado titulo="Ouro" />
      {n}
    </span>
  );
}

export function Raridade({ id }) {
  const r = RARIDADES.find((x) => x.id === id) ?? RARIDADES[0];
  return <span className="raridade" style={{ "--cor": r.cor }}>{r.nome}</span>;
}

/** Link interno para outra página da wiki. */
export const Link = ({ para, children }) => <a href={`#/${para}`}>{children}</a>;

/** Fluxo em passos (1 → 2 → 3). */
export function Passos({ itens }) {
  return (
    <ol className="passos">
      {itens.map((p, i) => (
        <li key={i}>
          <span className="passo-num">{i + 1}</span>
          <div>{p}</div>
        </li>
      ))}
    </ol>
  );
}
