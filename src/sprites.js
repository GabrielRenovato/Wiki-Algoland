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
  medusa: grade("chefes/medusa.png", [960, 640], [160, 160], 0, intervalo(0, 5), 7),
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
  ferreiro: morador("ivo"),
  nilo: grade("npcs/nilo.png", [256,64], [64,64], 0, [0], 0, [12,4,40,48]),
  osvaldo: morador("osvaldo"),
  helena: morador("helena"),
  clara: morador("clara"),
};

const casa = (id, l, a, resolucao = 4) => ({ src: `vila/${id}.png`, folha: [l * resolucao, a * resolucao], tam: [l, a], quadros: [[0, 0]], resolucao, suave: resolucao > 1 });
export const CASAS = {
  venda: casa('venda',128,112), enfermaria: casa('enfermaria',128,112), sede: casa('sede',192,128),
  pousada: casa('pousada',160,144), mistica: casa('mistica',144,128), casa_bento: casa('casa_bento',160,112),
  palafita: casa('palafita',160,160,1),
  casa_jogador: casa('casa_jogador',112,90), forja: casa('forja',128,112), carpintaria: casa('carpintaria',192,128),
};
export const PORTAL = { ...grade("vila/portal_arena.png", [1728,256], [192,256], 0, intervalo(0,8), 8), tam: [48,64], resolucao: 4, suave: true };

// --- Herói Raven: camadas de 320 x 9600 (30 ações de 320 px); "andar" é a primeira, linha 0 = para baixo ---------
const RAVEN = [320, 9600];
export const HEROI = grade(["heroi/corpo.png", "heroi/calca.png", "heroi/botas.png", "heroi/camisa.png", "heroi/cabelo.png"],
  RAVEN, [80, 80], 0, intervalo(0, 3), 6, [16, 8, 48, 56]);

// Quatro peças reais atuais sobre o corpo Raven; mesmas poses do jogador.
const conjunto = (id) => grade(['heroi/corpo.png', 'heroi/calca.png',
  `conjuntos/${id}_botas.png`, `conjuntos/${id}_peitoral.png`, `conjuntos/${id}_luvas.png`, `conjuntos/${id}_elmo.png`],
  RAVEN, [80,80], 0, intervalo(0,3), 6, [16,8,48,56]);
export const CONJUNTOS = { carrasco: conjunto('carrasco'), cavaleiro_rubro: conjunto('cavaleiro_rubro'), cavalheiro: conjunto('cavalheiro') };

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

export const peixe = (id) => celula(`peixes/${id}.png`, [16,16], 16, 0, 0);
export const OVO = celula('fazenda/ovo.png', [32,16], 16, 0, 0);
export const OMELETE = celula('fazenda/omelete.png', [32,16], 16, 0, 0);
