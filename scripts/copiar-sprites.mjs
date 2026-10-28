// Copia do jogo só as folhas de sprite que a wiki usa, com nomes curtos, para public/sprites.
// O caminho do jogo pode ser trocado com a variável ALGOLAND (padrão: ../AlgoLand ao lado deste projeto).
// As folhas usadas pela Wiki são versionadas para o build sem o jogo ao lado.
import { copyFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jogo = resolve(process.env.ALGOLAND ?? join(raiz, "..", "AlgoLand"));
const assets = join(jogo, "assets");
const destino = join(raiz, "public", "sprites");

const MS = "inimigos/mana_seed";
const ARQUIVOS = {
  // Inimigos comuns (estágios da arena)
  "inimigos/slime.png": `${MS}/20.11b - Slippery Slime 2.0/slippery slime v01.png`,
  "inimigos/morcego.png": `${MS}/22.04b - Bashful Bat 2.0/bashful bat v01.png`,
  "inimigos/vespa.png": `${MS}/22.05b - Wayward Wasp 2.0/wayward wasp (regular)/wayward wasp v01.png`,
  "inimigos/cogumelo.png": `${MS}/22.12a - Moody Mushroom 3.0/moody mushroom A v01.png`,
  "inimigos/flor.png": `${MS}/22.08a - Fiendish Flower 2.0/fiendish flower v01.png`,
  "inimigos/caranguejo.png": `${MS}/22.06a - Cranky Crab 2.0/cranky crab A v01.png`,
  "inimigos/gremlin.png": `${MS}/22.10a - Greedy Gremlin/greedy gremlin (base) v01.png`,
  "inimigos/falcao.png": `${MS}/22.11a - Harrowing Hawk 2.0/harrowing hawk A v01.png`,
  "inimigos/mimico.png": `${MS}/22.07a - Malevolent Mimic 2.0/malevolent mimic A v01.png`,
  "inimigos/esqueleto_guerreiro.png": "inimigos/esqueletos/guerreiro.png",
  "inimigos/esqueleto_arqueiro.png": "inimigos/esqueletos/arqueiro.png",
  "inimigos/esqueleto_mago.png": "inimigos/esqueletos/mago.png",
  // Chefes
  "chefes/minotauro.png": "inimigos/minotauro/movimento.png",
  "chefes/medusa.png": "inimigos/medusa/movimento.png",
  "chefes/goblin_maromba.png": "inimigos/goblin_maromba/movimento.png",
  "chefes/dragao_vermelho.png": "inimigos/dragao_vermelho/movimento.png",
  // Moradores da vila
  "npcs/tomas.png": "npcs/cidade/tomas.png",
  "npcs/rosa.png": "npcs/cidade/rosa.png",
  "npcs/caio.png": "npcs/cidade/caio.png",
  "npcs/estela.png": "npcs/cidade/estela.png",
  "npcs/lia.png": "npcs/cidade/lia.png",
  "npcs/bento.png": "npcs/cidade/bento.png",
  // Construções da vila
  "vila/venda.png": "cenario/cidade/fachadas_detalhadas/venda/primavera.png",
  "vila/enfermaria.png": "cenario/cidade/fachadas_detalhadas/enfermaria/primavera.png",
  "vila/sede.png": "cenario/cidade/fachadas_detalhadas/sede/primavera.png",
  "vila/pousada.png": "cenario/cidade/fachadas_detalhadas/pousada/primavera.png",
  "vila/mistica.png": "cenario/cidade/fachadas_detalhadas/mistica/primavera.png",
  "vila/casa_bento.png": "cenario/cidade/fachadas_detalhadas/casa_bento/primavera.png",
  "vila/casa_jogador.png": "cenario/cidade/fachadas_detalhadas/casa_jogador/primavera.png",
  "vila/portal_arena.png": "cenario/cidade/complementos/portal/primavera.png",
  // Armas: ícones atuais do jogo
  "armas/espada_basica.png": "personagens/raven_fantasy/icones/espada_basica.png",
  "armas/espada_gemea.png": "personagens/raven_fantasy/icones/espada_gemea.png",
  "armas/machado.png": "personagens/raven_fantasy/icones/machado.png",
  "armas/maca.png": "personagens/raven_fantasy/icones/maca.png",
  "armas/lanca_basica.png": "personagens/raven_fantasy/icones/lanca_basica.png",
  "armas/escudo_basico.png": "personagens/raven_fantasy/icones/escudo_basico.png",
  "armas/arco_curto.png": "personagens/raven_fantasy/icones/arco_curto.png",
  "armas/arco_curvo.png": "personagens/raven_fantasy/icones/arco_curvo.png",
  "armas/arco_longo.png": "personagens/raven_fantasy/icones/arco_longo.png",
  // Fazenda e interface
  "fazenda/plantas.png": "cenario/Farm RPG/Crops/All Crops.png",
  "fazenda/ferramentas.png": "ui/fazenda/icones_ferramentas.png",
  "fazenda/pocoes.png": "ui/fazenda/pocoes.png",
  "fazenda/drops.png": "ui/fazenda/drops.png",
  "fazenda/relogio.png": "ui/fazenda/relogio.png",
  "ui/brasa.png": "ui/icone_brasa.png",
  "ui/moedas.png": "ui/icons-coin/16x16.png",
};
for (const id of ['ivo', 'nilo', 'osvaldo', 'helena', 'clara']) ARQUIVOS[`npcs/${id}.png`] = `npcs/cidade/${id}.png`;
for (const id of ['forja', 'carpintaria']) ARQUIVOS[`vila/${id}.png`] = `cenario/cidade/fachadas_detalhadas/${id}/primavera.png`;
ARQUIVOS['vila/palafita.png'] = 'cenario/praia/palafita/exterior.png';
ARQUIVOS['ui/mapa_mundi.png'] = 'ui/mapa_mundi/algoland.png';
// Tiras de crescimento das plantas
const TIRAS = {
  cenoura: "Spring/Carrot.png", batata: "Spring/Potato.png", couve_flor: "Spring/Cauliflower.png",
  morango: "Spring/Strawberry.png", girassol: "Summer/Sunflower.png", tomate: "Summer/Tomato.png",
  milho: "Fall/Corn.png", melancia: "Summer/Watermelon.png", beterraba: "Fall/Beetroot.png",
  berinjela: "Fall/Eggplant.png", abobora: "Fall/Pumpkin.png", uva: "Fall/Grapes.png",
};
for (const [id, tira] of Object.entries(TIRAS)) {
  ARQUIVOS[`plantas/${id}.png`] = `cenario/Farm RPG/Crops/${tira}`;
}

if (!existsSync(assets)) {
  // Build fora desta máquina (Netlify): sem o jogo ao lado, usa as folhas que já vieram em public/sprites
  if (existsSync(join(destino, "inimigos", "slime.png"))) {
    console.log("Pasta do jogo não encontrada; usando os sprites que já estão em public/sprites");
    process.exit(0);
  }
  console.error(`Pasta do jogo não encontrada: ${assets}\nDefina ALGOLAND=/caminho/do/AlgoLand`);
  process.exit(1);
}
const praia = JSON.parse(readFileSync(join(assets, 'pesca/catalogo.json'), 'utf8'));
for (const [id, peixe] of Object.entries(praia.peixes)) ARQUIVOS[`peixes/${id}.png`] = peixe.icone.replace('res://assets/', '');
ARQUIVOS['fazenda/ovo.png'] = 'cenario/fazenda/galinheiro/ovo.png';
ARQUIVOS['fazenda/omelete.png'] = 'cenario/fazenda/galinheiro/omelete.png';
let faltando = 0;
for (const [nome, origem] of Object.entries(ARQUIVOS)) {
  const de = join(assets, origem);
  if (!existsSync(de)) {
    console.warn(`faltando: ${origem}`);
    faltando++;
    continue;
  }
  const para = join(destino, nome);
  mkdirSync(dirname(para), { recursive: true });
  copyFileSync(de, para);
}
console.log(`${Object.keys(ARQUIVOS).length - faltando} sprites copiados para public/sprites (${faltando} faltando)`);

if (faltando) process.exitCode = 1;
