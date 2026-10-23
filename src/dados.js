import atual from "./dados-jogo.json";
// Números do jogo, copiados das tabelas do código do AlgoLand (o arquivo de origem está ao lado de cada bloco).
// Se o balanceamento mudar no jogo, atualize aqui.

export const ESTACOES = ["Primavera", "Verão", "Outono", "Inverno"];
export const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// codigo/dados/plantas.gd
export const PLANTAS = [
  { id: "cenoura", nome: "Cenoura", estacao: 0, dias: 3, raridade: "comum", item: [2, 6], saco: [0, 6], larg: 128, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "batata", nome: "Batata", estacao: 0, dias: 4, raridade: "comum", item: [2, 4], saco: [0, 4], larg: 128, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "couve_flor", nome: "Couve-flor", estacao: 0, dias: 5, raridade: "incomum", item: [2, 10], saco: [0, 10], larg: 128, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "morango", nome: "Morango", estacao: 0, dias: 6, raridade: "incomum", item: [2, 2], saco: [0, 2], larg: 128, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "girassol", nome: "Girassol", estacao: 1, dias: 3, raridade: "comum", item: [11, 5], saco: [9, 5], larg: 160, alta: true, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "tomate", nome: "Tomate", estacao: 1, dias: 4, raridade: "raro", item: [11, 4], saco: [9, 4], larg: 160, alta: false, quadros: [0, 1, 2, 3, 4, 6] },
  { id: "milho", nome: "Milho", estacao: 1, dias: 5, raridade: "incomum", item: [20, 4], saco: [18, 4], larg: 160, alta: true, quadros: [0, 1, 2, 3, 4, 5, 7] },
  { id: "melancia", nome: "Melancia", estacao: 1, dias: 6, raridade: "epico", item: [11, 11], saco: [9, 11], larg: 160, alta: false, quadros: [0, 1, 2, 3, 4, 5, 7] },
  { id: "beterraba", nome: "Beterraba", estacao: 2, dias: 3, raridade: "comum", item: [20, 1], saco: [18, 1], larg: 128, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "berinjela", nome: "Berinjela", estacao: 2, dias: 4, raridade: "epico", item: [20, 5], saco: [18, 5], larg: 160, alta: false, quadros: [0, 1, 2, 3, 4, 5] },
  { id: "abobora", nome: "Abóbora", estacao: 2, dias: 5, raridade: "incomum", item: [20, 2], saco: [18, 2], larg: 128, alta: false, quadros: [0, 2, 3, 4, 5] },
  { id: "uva", nome: "Uva", estacao: 2, dias: 6, raridade: "raro", item: [20, 3], saco: [18, 3], larg: 128, alta: true, quadros: [0, 2, 3, 4, 5] },
];
// codigo/dados/loja_sementes.gd (preço em Brasas, com o Tomás)
export const PRECO_SEMENTE = { comum: 2, incomum: 3, raro: 4, epico: 6 };
// codigo/logica/semente_drop.gd
// Chance por inimigo comum nas fendas (MULT_CHANCE_ANDAR = 0,25 da tabela base)
export const CHANCE_SEMENTE = { comum: "0,1%", incomum: "0,04%", raro: "0,0125%", epico: "0,004%" };

// codigo/dados/pocoes.gd
export const POCOES = [
  { id: "cura", nome: "Poção de Cura", efeito: "Cura 40% da vida", duracao: 0, receita: { cenoura: 2, morango: 1 }, icone: [2, 2], texto: "Um gole quente de cenoura com morango que fecha as feridas na hora." },
  { id: "folego", nome: "Poção de Fôlego", efeito: "Estamina 3x mais rápida", duracao: 30, receita: { batata: 2, couve_flor: 1 }, icone: [1, 3], texto: "Caldo de batata com couve-flor: o fôlego volta antes de acabar." },
  { id: "forca", nome: "Poção de Força", efeito: "+30% de dano", duracao: 30, receita: { tomate: 2, melancia: 1 }, icone: [3, 4], texto: "Suco de tomate com melancia que deixa cada golpe mais pesado." },
  { id: "velocidade", nome: "Poção de Velocidade", efeito: "+25% de velocidade", duracao: 30, receita: { girassol: 2, milho: 1 }, icone: [4, 3], texto: "Essência de girassol e milho: as pernas ficam leves como pluma." },
  { id: "pedra", nome: "Poção de Pedra", efeito: "-25% de dano recebido", duracao: 30, receita: { abobora: 2, beterraba: 1 }, icone: [4, 5], texto: "A casca da abóbora endurece a pele de quem bebe." },
  { id: "vampiro", nome: "Poção Vampírica", efeito: "12% do dano vira vida", duracao: 30, receita: { uva: 2, berinjela: 1 }, icone: [2, 5], texto: "Uva e berinjela fermentadas: o sangue do inimigo vira o seu." },
];

// codigo/cidade/dados_cidade.gd + falas_moradores.gd
export const MORADORES = [
  { id: "lia", nome: "Lia", oficio: "Cuida da comunidade", casa: "sede", casaNome: "Casa da comunidade",
    servico: "Troca Brasas por melhorias permanentes, contrata os apoios (Curandeira, Bardo, Mística) e compra a sua colheita por Brasas (VENDER COLHEITA). Dona da maioria dos pedidos do mural.",
    especialidade: "Brasas, melhorias e contratos", horario: [6, 19], folga: 5,
    rotina: [[6, "Organizando os pedidos (sede)"], [9, "Recebendo visitantes na praça"], [15, "Cuidando da comunidade (sede)"], [19, "Jantando na pousada"]],
    fala: "Bem-vindo à Vila das Flores! A fazenda fica a oeste e a trilha da arena a leste. Os pedidos estão no mural." },
  { id: "mercador", nome: "Tomás", oficio: "Comerciante", casa: "venda", casaNome: "Venda",
    servico: "Vende sementes da estação por Brasas e compra os peixes da sua mochila. Equipamentos e ferramentas ficam na forja do Ivo.",
    especialidade: "Sementes e venda de peixes", horario: [8, 17], folga: 6,
    rotina: [[6, "Abrindo a venda"], [8, "Atendendo na venda"], [17, "Conversando na praça"], [20, "Guardando as mercadorias"]],
    fala: "A venda abastece quem cuida da terra e quem enfrenta a floresta." },
  { id: "curandeira", nome: "Dona Rosa", oficio: "Curandeira", casa: "enfermaria", casaNome: "Enfermaria",
    servico: "Cura, e o botão POÇÕES abre o caldeirão: é com ela que a colheita vira poção. Quem cai na arena acorda no leito dela.",
    especialidade: "Vida e poções", horario: [8, 18], folga: 2,
    rotina: [[6, "Cuidando do jardim"], [8, "Atendendo na enfermaria"], [18, "Passeando na praça"], [19, "Preparando os remédios"]],
    fala: "Descanse antes de voltar a lutar. Uma vila também se cuida com pequenos gestos." },
  { id: "bardo", nome: "Caio", oficio: "Músico", casa: "pousada", casaNome: "Pousada",
    servico: "Toca no coreto de dia e atende no balcão da taverna à noite (18h às 2h). Cozinha com a sua colheita a qualquer hora (COZINHAR): o prato vale a próxima partida inteira. A pousada deixa passar a noite.",
    especialidade: "Lendas da arena, chefes e eventos", horario: null, folga: 0,
    rotina: [[6, "Tomando café na pousada"], [10, "Tocando no coreto"], [18, "Atendendo no balcão da taverna"]],
    fala: "Cada aventura merece uma canção. Volte para me contar a sua!" },
  { id: "mistica", nome: "Estela", oficio: "Mística", casa: "mistica", casaNome: "Casa da Mística",
    servico: "Lê os mapas: fala de checkpoint, mochila e sementes. Atende atrás da mesa de cristal.",
    especialidade: "Checkpoint, mochila e sementes", horario: [8, 18], folga: 4,
    rotina: [[6, "Consultando os mapas"]],
    fala: "As estações mudam, mas o que você aprendeu na floresta continua com você." },
  { id: "bento", nome: "Bento", oficio: "Agricultor", casa: "casa_bento", casaNome: "Casa do Bento",
    servico: "Ensina a cuidar da horta e dá duas sementes por dia quando há espaço na mochila. É quem resgata você no prólogo.",
    especialidade: "Horta", horario: [6, 19], folga: 3,
    rotina: [[6, "Cuidando da horta"], [12, "Descansando na praça"], [16, "Separando as sementes"], [19, "Jantando na pousada"]],
    fala: "Plante o que combina com a estação e regue todo dia. No inverno, prepare a terra para a primavera." },
];

MORADORES.push(
  { id:'ferreiro', nome:'Ivo', oficio:'Ferreiro', casa:'forja', casaNome:'Forja', servico:'Fabrica equipamentos por encomenda, refina armas e peças de conjunto, encanta e melhora ferramentas.', especialidade:'Receitas, materiais e encomendas', horario:[8,18], folga:2, rotina:[[6,'Afiando ferramentas'],[8,'Trabalhando na forja']], fala:'Na arena você aprende o desenho. A terra fornece o material. Eu junto as duas coisas.' },
  { id:'nilo', nome:'Nilo', oficio:'Pescador e artesão de varas', casa:'palafita', casaNome:'Palafita da praia', servico:'Refina a vara na oficina do cais. O guia reúne as espécies, a coleção, os desafios e as encomendas de pesca.', especialidade:'Pesca e refinamento da vara', horario:[8,17], folga:-1, rotina:[], fala:'Eu cuido da sua vara. Traga as pedras de refinamento que encontrar pescando.' },
  { id:'osvaldo', nome:'Osvaldo', oficio:'Carpinteiro, 65 anos', casa:'carpintaria', casaNome:'Carpintaria', servico:'Constrói e amplia o galinheiro e vende galinhas e galos por 25 Brasas.', especialidade:'Obras e animais', horario:[8,17], folga:-1, rotina:[], fala:'Traga madeira e pedra. Construo e amplio o abrigo das suas aves.' },
  { id:'helena', nome:'Helena', oficio:'Bordadeira, 55 anos', casa:'carpintaria', casaNome:'Casa da família do Osvaldo', servico:'Gosta de bordar e contar histórias. Usa cadeira de rodas e recebe a ajuda da filha Clara no dia a dia.', especialidade:'Histórias e amizade', horario:[], folga:-1, rotina:[], fala:'Clara me ajuda no dia a dia. Agora me conte de você: como anda sua fazenda?' },
  { id:'clara', nome:'Clara', oficio:'Artesã, 30 anos', casa:'carpintaria', casaNome:'Casa da família do Osvaldo', servico:'Divide o tempo entre suas encomendas e os cuidados com Helena. Suas histórias acompanham a amizade.', especialidade:'Artesanato e amizade', horario:[], folga:-1, rotina:[], fala:'Divido meu tempo entre minhas encomendas e os cuidados da minha mãe, Helena.' },
);

export const PEDIDOS = [
  { nome: "Conheça seus vizinhos", dono: "Lia", texto: "Converse com Tomás, Dona Rosa, Caio, Estela e Bento.", brasas: 10 },
  { nome: "Portas abertas", dono: "Lia", texto: "Visite a venda, a enfermaria, a pousada e a casa da mística.", brasas: 10 },
  { nome: "Da horta para a mesa", dono: "Bento", texto: "Entregue 3 colheitas da estação ao Bento. No inverno, qualquer colheita serve.", brasas: 15 },
  { nome: "Um cuidado para a vila", dono: "Dona Rosa", texto: "Entregue 2 colheitas à Dona Rosa para preparar os remédios.", brasas: 15 },
  { nome: "Uma história para cantar", dono: "Caio", texto: "Vença 3 andares na arena depois de aceitar o pedido e conte ao Caio.", brasas: 20 },
  { nome: "Caminhos da floresta", dono: "Estela", texto: "Derrote o guardião do andar 10 e fale com a Estela.", brasas: 25 },
];

// Espécies principais da fenda: slime_spawner.gd + gerador_encontros.gd.
export const ESTAGIOS = [
  { ondas: "1–2", ids: ["slime"], nomes: ["Slime"] },
  { ondas: "3–4", ids: ["morcego"], nomes: ["Morcego"] },
  { ondas: "5–6", ids: ["vespa"], nomes: ["Vespa"] },
  { ondas: "7–8", ids: ["cogumelo"], nomes: ["Cogumelo"] },
  { ondas: "9–10", ids: ["flor"], nomes: ["Flor"] },
  { ondas: "11–12", ids: ["caranguejo"], nomes: ["Caranguejo"] },
  { ondas: "13–14", ids: ["gremlin"], nomes: ["Gremlin"] },
  { ondas: "15–16", ids: ["falcao"], nomes: ["Falcão"] },
  { ondas: "17–18", ids: ["esqueleto_guerreiro", "esqueleto_arqueiro", "esqueleto_mago"], nomes: ["Esqueleto guerreiro", "Esqueleto arqueiro", "Esqueleto mago"] },
];

// codigo/logica/gerenciador_de_ondas.gd
export const CHEFES = [
  { id: "minotauro", nome: "Minotauro", golpes: ["Investida", "Pisão", "Machadada", "Pisão em fúria"], escala: 1.3 },
  { id: "medusa", nome: "Medusa", golpes: ["Garras", "Cauda", "Bote", "Olhar de pedra (petrifica)", "Ruína em área"], escala: 0.9 },
  { id: "goblin_maromba", nome: "Goblin Maromba", golpes: ["Porretada", "Varrida", "Salto", "Fúria", "Execução"], escala: 0.9 },
  { id: "cogumelo", nome: "Cogumelo Ancião", golpes: ["Esporos em área", "Invoca cogumelos"], escala: 4 },
  { id: "dragao_vermelho", nome: "Dragão Vermelho", golpes: ["Sopro", "Cauda", "Asas", "Patada", "Chuva de fogo"], escala: 2 },
];

export const EVENTOS = [
  { nome: "Lua de Sangue", resumo: "Inimigos 25% mais rápidos e fortes", ouro: "×1,5", cor: "#ff6661" },
  { nome: "Chuva de Ouro", resumo: "Nada muda, só o ouro", ouro: "×2", cor: "#ffd94d" },
  { nome: "Horda", resumo: "60% mais inimigos, com 35% menos vida", ouro: "—", cor: "#ffa64d" },
  { nome: "Elite", resumo: "Triplo de chance de mutantes", ouro: "×1,25", cor: "#bfb3ff" },
  { nome: "Neblina", resumo: "Visão reduzida, tela azulada", ouro: "×1,3", cor: "#b3d1f2" },
  { nome: "Tempestade", resumo: "Raios caem no campo (nunca no inverno)", ouro: "×1,4", cor: "#8cb8ff" },
];

// codigo/dados/equipamentos.gd
const NOMES_ARMAS = { espada_basica: "Espada Básica", lanca_basica: "Lança Básica", espada_gemea: "Espada de Duas Mãos", machado: "Machado", arco_curto: "Arco" };
const TIPOS_ARMAS = { espada_basica: "Espada de uma mão", lanca_basica: "Lança de duas mãos", espada_gemea: "Espada de duas mãos", machado: "Machado de duas mãos", arco_curto: "Arco · exige aljava" };
export const ARMAS = atual.armas.map(a => ({ ...a, nome: NOMES_ARMAS[a.id], tipo: TIPOS_ARMAS[a.id], libera: a.id === 'espada_basica' ? 'Kit inicial' : `Receita elegível a partir do andar ${a.meta}; fabricar com Ivo` }));
export const RECEITAS = atual.receitas;
export const ANDARES = atual.andares;
export const PEIXES = atual.peixes;
export const COMMIT_JOGO = atual.commit;
export const ENERGIA_MAXIMA = atual.energia;
export const ESCUDO = { vitalidade: [2, 4, 6, 9, 12], defesa: [4, 8, 13, 19, 26], custo: [0, 150, 400, 800, 1600] };
export const BIGORNA = { onda: [0, 4, 8, 14, 22], custo: [0, 200, 500, 1000, 2000] };
export const ASCENSAO = [2500, 3500, 5000, 7000];

// codigo/dados/encantamentos.gd (nível máximo 3, custa 120 × nível)
export const ENCANTAMENTOS = [
  { nome: "Fogo", cor: "#ff8c33", niveis: ["Queima 2 a cada 0,5 s por 3 s", "Queima 3 a cada 0,5 s por 3 s", "Queima 4 a cada 0,5 s por 3 s"] },
  { nome: "Gelo", cor: "#8cd9ff", niveis: ["25% mais lento por 2 s", "35% mais lento por 2 s", "45% mais lento por 2 s"] },
  { nome: "Raio", cor: "#fff266", niveis: ["40% do dano salta para 1 inimigo", "55% do dano salta", "70% do dano salta"] },
  { nome: "Elétrico", cor: "#73c7ff", niveis: ["Choque de 20%, 15% de paralisar", "Choque de 30%, 20% de paralisar", "Choque de 40%, 25% de paralisar"] },
];

// codigo/dados/raridades.gd
export const RARIDADES = [
  { id: "comum", nome: "Comum", cor: "#ebebeb", mult: "×1,00", afixos: 0, peso: "60%" },
  { id: "incomum", nome: "Incomum", cor: "#59d959", mult: "×1,08", afixos: 0, peso: "28%" },
  { id: "raro", nome: "Raro", cor: "#4d8cff", mult: "×1,18", afixos: 1, peso: "9%" },
  { id: "epico", nome: "Épico", cor: "#b359ff", mult: "×1,32", afixos: 2, peso: "2,5%" },
  { id: "lendario", nome: "Lendário", cor: "#ff9926", mult: "×1,50", afixos: 3, peso: "0,5%" },
];
export const AFIXOS = [
  { nome: "Crítico", valor: "+2% a 4%", onde: "Arma" },
  { nome: "Dano crítico", valor: "+10% a 20%", onde: "Arma" },
  { nome: "Roubo de vida", valor: "+1 a 2", onde: "Arma" },
  { nome: "Velocidade", valor: "+3 a 6", onde: "Tudo" },
  { nome: "Vitalidade", valor: "+1 a 2", onde: "Tudo" },
  { nome: "Defesa", valor: "+2 a 4", onde: "Escudo e armaduras" },
];

// codigo/dados/conjuntos_armadura.gd
export const CONJUNTOS = [
  { id: "carrasco", nome: "Carrasco", completo: "10% de chance de raio ao acertar (dano 200%, recarga 2 s)", parcial: "Metade da chance", nivel: "O nível também aumenta o dano do raio." },
  { id: "cavaleiro_rubro", nome: "Cavaleiro Rubro", completo: "+10% de defesa e +10% de vitalidade", parcial: "+5% e +5%" },
  { id: "cavalheiro", nome: "Mordomo", completo: "10% de chance de congelar o alvo por 2 s (recarga 2 s)", parcial: "Metade da chance" },
];

// codigo/globais/progresso.gd
export const MELHORIAS = [
  { nome: "Vigor", efeito: "+8% de vida máxima" },
  { nome: "Força", efeito: "+6% de dano" },
  { nome: "Couraça", efeito: "+4% de redução de dano" },
  { nome: "Fôlego", efeito: "+10% de estamina máxima" },
  { nome: "Bolsa", efeito: "+40 de ouro inicial" },
  { nome: "Saque", efeito: "+10% de ouro por abate" },
];
export const CUSTOS_MELHORIA = [10, 20, 35, 55, 80];
export const APOIOS = [
  { nome: "Curandeira", efeito: "Revive você 1 vez por partida, com metade da vida e 2 s invulnerável", custo: 40 },
  { nome: "Bardo", efeito: "+25% de Brasas ao fim da partida", custo: 25 },
  { nome: "Mística", efeito: "Começa a partida em um checkpoint liberado, com compensação de ouro conforme o andar escolhido", custo: 50 },
];

// codigo/dados/dados_dos_items_loja.gd (preço sobe 20% a cada cópia comprada na partida)
export const TOTENS = [
  { nome: "Fúria Afiada", preco: 120, efeito: "+3 de força (+3 de dano por golpe)" },
  { nome: "Sede de Sangue", preco: 250, efeito: "5% de roubo de vida sobre o dano" },
  { nome: "Passo do Relâmpago", preco: 150, efeito: "+6 de agilidade (+9 de velocidade)" },
  { nome: "Bastião Inquebrável", preco: 180, efeito: "+6 de defesa (reduz dano em %)" },
  { nome: "Coração Robusto", preco: 120, efeito: "+4 de vitalidade (+24 de vida máxima)" },
  { nome: "Olho do Falcão", preco: 200, efeito: "+5 de sorte (+5% de crítico, +0,1× dano crítico)" },
];

// codigo/dados/refeicoes.gd (o prato do Caio vale a próxima partida inteira e acaba junto com ela)
const NOMES_PRATOS = { sopa_raizes: "Sopa de Raízes", torta_morango: "Torta de Morango", milho_assado: "Milho Assado na Brasa", salada_verao: "Salada de Verão", ensopado_outono: "Ensopado de Outono", banquete: "Banquete da Colheita", peixe_assado: "Peixe Assado com Raízes", caldo_rio: "Caldo do Rio", salmao_grelhado: "Salmão Grelhado", omelete_horta: "Omelete da Horta" };
export const REFEICOES = atual.refeicoes.map(r => ({ ...r, nome: NOMES_PRATOS[r.id], bonus: r.texto_bonus, item: r.icone ?? Object.keys(r.receita)[0] }));
// codigo/globais/fazenda_dados.gd: Brasas pagas pela Lia por colheita, conforme a raridade da planta
export const BRASAS_COLHEITA = { comum: 3, incomum: 5, raro: 6, epico: 9 };
