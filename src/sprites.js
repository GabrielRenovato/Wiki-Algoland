// Catálogo dos sprites da wiki: qual folha, o tamanho do quadro e quais quadros animar.
// As folhas são copiadas do jogo por scripts/copiar-sprites.mjs; as grades seguem as cenas do Godot
// (hframes/vframes) e os manifestos do jogo.

const intervalo = (de, ate) => Array.from({ length: ate - de + 1 }, (_, k) => de + k);

/** Quadros de uma linha da grade: colunas `cols` da linha `linha`. `miolo` = [dx, dy, l, a] recorta só o
 *  meio de cada quadro (os quadros de 64 px do Mana Seed têm muita borda vazia). */
export function grade(src, folha, tam, linha, cols, fps = 6, miolo = null) {
  const [dx, dy, l, a] = miolo ?? [0, 0, ...tam];
  return { src, folha, tam: [l, a], fps, quadros: cols.map((c) => [c * tam[0] + dx, linha * tam[1] + dy]) };
}

/** Uma célula parada de uma folha em grade (coluna, linha). */
export function celula(src, folha, lado, col, linha) {
  return { src, folha, tam: [lado, lado], quadros: [[col * lado, linha * lado]] };
}

/** Recorte livre de um retângulo (x, y, l, a) de uma folha. */
export function recorte(src, folha, x, y, l, a) {
  return { src, folha, tam: [l, a], quadros: [[x, y]] };
}

// --- Inimigos comuns ---------------------------------------------------------------------------------------------
export const INIMIGOS = {
  slime: grade("inimigos/slime.png", [512, 512], [64, 64], 0, intervalo(0, 3), 6, [12, 16, 40, 40]),
  morcego: grade("inimigos/morcego.png", [128, 128], [32, 32], 0, intervalo(0, 3), 8),
  vespa: grade("inimigos/vespa.png", [128, 128], [32, 32], 0, intervalo(0, 3), 10),
  cogumelo: grade("inimigos/cogumelo.png", [256, 256], [32, 32], 0, intervalo(0, 3), 6),
  flor: grade("inimigos/flor.png", [128, 160], [32, 32], 0, intervalo(0, 3), 6),
  caranguejo: grade("inimigos/caranguejo.png", [256, 512], [64, 64], 0, intervalo(0, 3), 6, [12, 12, 40, 40]),
  gremlin: grade("inimigos/gremlin.png", [512, 512], [64, 64], 0, intervalo(0, 3), 6, [12, 12, 40, 40]),
  falcao: grade("inimigos/falcao.png", [128, 256], [32, 32], 0, intervalo(0, 3), 8),
  mimico: grade("inimigos/mimico.png", [256, 320], [64, 64], 0, intervalo(0, 3), 6, [12, 12, 40, 40]),
  esqueleto_guerreiro: grade("inimigos/esqueleto_guerreiro.png", [384, 448], [64, 64], 0, intervalo(0, 5), 8),
  esqueleto_arqueiro: grade("inimigos/esqueleto_arqueiro.png", [384, 448], [64, 64], 0, intervalo(0, 5), 8),
  esqueleto_mago: grade("inimigos/esqueleto_mago.png", [384, 448], [64, 64], 0, intervalo(0, 5), 8),
};

// --- Chefes (6 quadros x 4 direções; a linha 0 olha para baixo) -------------------------------------------------
export const CHEFES = {
  minotauro: grade("chefes/minotauro.png", [1152, 768], [192, 192], 0, intervalo(0, 5), 7),
  medusa: grade("chefes/medusa.png", [1536, 1024], [256, 256], 0, intervalo(0, 5), 7),
  // O Goblin Maromba tem 12 quadros por linha (o jogo ajusta hframes em goblin_maromba.gd)
  goblin_maromba: grade("chefes/goblin_maromba.png", [3072, 1024], [256, 256], 0, intervalo(0, 11), 10),
  // O Cogumelo Ancião é o cogumelo comum em escala 2,4
  cogumelo: INIMIGOS.cogumelo,
  dragao_vermelho: grade("chefes/dragao_vermelho.png", [768, 512], [128, 128], 0, intervalo(0, 5), 7),
};

// --- Moradores (PixelLab: 7 colunas = parado + 6 passos; linhas baixo, direita, cima, esquerda) -----------------
const morador = (id) => grade(`npcs/${id}.png`, [448, 256], [64, 64], 0, intervalo(1, 6), 8, [12, 4, 40, 48]);
export const MORADORES = {
  mercador: morador("tomas"),
  curandeira: morador("rosa"),
  bardo: morador("caio"),
  mistica: morador("estela"),
  lia: morador("lia"),
  bento: morador("bento"),
};

export const CASAS = {
  venda: { src: "vila/venda.png", folha: [128, 112], tam: [128, 112], quadros: [[0, 0]] },
  enfermaria: { src: "vila/enfermaria.png", folha: [128, 112], tam: [128, 112], quadros: [[0, 0]] },
  sede: { src: "vila/sede.png", folha: [192, 128], tam: [192, 128], quadros: [[0, 0]] },
  pousada: { src: "vila/pousada.png", folha: [160, 144], tam: [160, 144], quadros: [[0, 0]] },
  mistica: { src: "vila/mistica.png", folha: [144, 128], tam: [144, 128], quadros: [[0, 0]] },
  casa_bento: { src: "vila/casa_bento.png", folha: [160, 112], tam: [160, 112], quadros: [[0, 0]] },
  casa_jogador: { src: "vila/casa_jogador.png", folha: [112, 90], tam: [112, 90], quadros: [[0, 0]] },
};
export const PORTAL = grade("vila/portal_arena.png", [432, 64], [48, 64], 0, intervalo(0, 8), 8);

// --- Herói Raven: camadas de 320 x 9600 (30 ações de 320 px); "andar" é a primeira, linha 0 = para baixo ---------
const RAVEN = [320, 9600];
export const HEROI = grade(["heroi/corpo.png", "heroi/calca.png", "heroi/botas.png", "heroi/camisa.png", "heroi/cabelo.png"],
  RAVEN, [80, 80], 0, intervalo(0, 3), 6, [16, 8, 48, 56]);

// --- Armaduras (páginas Mana Seed: folha 8x8 de 64 px). Linha 4 da página 1 = andando para baixo (quadros 0 a 5)
const PAGINA = [512, 512];
const MIOLO_PERSONAGEM = [16, 12, 32, 44];
const andando = (src) => grade(src, PAGINA, [64, 64], 4, intervalo(0, 5), 8, MIOLO_PERSONAGEM);
export const CONJUNTOS = {
  carrasco: andando(["conjuntos/corpo_mana.png", "conjuntos/carrasco.png"]),
  cavaleiro_rubro: andando(["conjuntos/corpo_mana.png", "conjuntos/cavaleiro_rubro.png"]),
  cavalheiro: andando(["conjuntos/corpo_mana.png", "conjuntos/cavalheiro.png"]),
};

// --- Armas: ícones do jogo (um quadro por arquivo) ------------------------------------------------------------------
const icone = (id, [l, a]) => recorte(`armas/${id}.png`, [l, a], 0, 0, l, a);
export const ARMAS = {
  espada_basica: icone("espada_basica", [10, 19]),
  espada_gemea: icone("espada_gemea", [9, 17]),
  machado: icone("machado", [12, 16]),
  maca: icone("maca", [9, 18]),
  lanca_basica: icone("lanca_basica", [51, 10]),
  escudo_basico: icone("escudo_basico", [17, 18]),
  arco_curto: icone("arco_curto", [18, 10]),
  arco_curvo: icone("arco_curvo", [18, 10]),
  arco_longo: icone("arco_longo", [18, 10]),
};

// --- Fazenda -----------------------------------------------------------------------------------------------------
const CROPS = [416, 288];
export const colhido = ([c, l]) => celula("fazenda/plantas.png", CROPS, 16, c, l);
export const crescimento = (id, largura, alta, quadros) =>
  ({ src: `plantas/${id}.png`, folha: [largura, alta ? 32 : 16], tam: [16, alta ? 32 : 16], fps: 1.5,
     quadros: quadros.map((q) => [q * 16, 0]) });

export const FERRAMENTAS = {
  enxada: celula("fazenda/ferramentas.png", [80, 16], 16, 0, 0),
  regador: celula("fazenda/ferramentas.png", [80, 16], 16, 1, 0),
  machadinha: celula("fazenda/ferramentas.png", [80, 16], 16, 3, 0),
  picareta: celula("fazenda/ferramentas.png", [80, 16], 16, 4, 0),
};
export const pocao = ([c, l]) => celula("fazenda/pocoes.png", [80, 112], 16, c, l);
export const DROPS = {
  madeira: celula("fazenda/drops.png", [32, 16], 16, 0, 0),
  pedra: celula("fazenda/drops.png", [32, 16], 16, 1, 0),
};

// --- Interface ---------------------------------------------------------------------------------------------------
export const BRASA = recorte("ui/brasa.png", [9, 10], 0, 0, 9, 10);
export const MOEDA = grade("ui/moedas.png", [256, 112], [16, 16], 0, intervalo(0, 7), 10);
