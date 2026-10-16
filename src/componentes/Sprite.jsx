import { useEffect, useState } from "react";

// Mostra um quadro (ou uma animação) de uma folha de sprites sem recortar o arquivo: a folha vira fundo CSS
// e a posição do fundo escolhe o quadro. `s` vem de src/sprites.js:
//   { src: "x.png" | ["camada_baixo.png", "camada_cima.png"], folha: [L, A], tam: [l, a], quadros: [[x, y], ...], fps }
// `escala` multiplica o tamanho em pixels; a imagem fica nítida com image-rendering: pixelated.
export default function Sprite({ s, escala = 2, parado = false, titulo, className = "" }) {
  const [i, setI] = useState(0);
  const total = s.quadros.length;
  const animar = !parado && total > 1;

  useEffect(() => {
    if (!animar) return;
    const id = setInterval(() => setI((n) => (n + 1) % total), 1000 / (s.fps ?? 6));
    return () => clearInterval(id);
  }, [animar, total, s.fps]);

  const [x, y] = s.quadros[animar ? i % total : 0];
  const camadas = (Array.isArray(s.src) ? s.src : [s.src]).map((c) => `url("${import.meta.env.BASE_URL}sprites/${c}")`);
  const [L, A] = s.folha;
  const [l, a] = s.tam;

  return (
    <span
      className={`sprite ${className}`}
      role="img"
      aria-label={titulo}
      title={titulo}
      style={{
        width: l * escala,
        height: a * escala,
        // A primeira camada do CSS fica por cima: inverte para que o array siga de baixo para cima
        backgroundImage: camadas.reverse().join(","),
        backgroundSize: `${L * escala}px ${A * escala}px`,
        backgroundPosition: `${-x * escala}px ${-y * escala}px`,
      }}
    />
  );
}
