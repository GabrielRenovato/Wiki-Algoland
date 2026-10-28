import { Titulo, Secao, Caixa, Link } from "../componentes/ui.jsx";

// Histórico de atualizações do jogo, da mais nova para a mais antiga. Cada versão tem três listas opcionais:
// novo (o que chegou), melhorou (o que mudou) e corrigido (bugs que acabaram).
export const PATCHES = [
  {
    versao: "2026.10.23.1",
    conteudo: 52,
    data: "28 de outubro de 2026",
    resumo: "Duelo online e o visual atual do personagem em pixel art.",
    novo: ["Salas de duelo 1×1 com senha opcional, pronto/começar e melhor de três. Personagem com pintura em pixel art, roupas independentes e quatro penteados: Bagunçado, Raspado, Cacheado e Longo liso."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 51,
    data: "27 de outubro de 2026",
    resumo: "Downloads menores para atualizar no Android.",
    novo: ["Os pacotes de conteúdo passaram a ter no máximo 8 MiB por arquivo. Arquivos já baixados e íntegros podem ser reaproveitados numa nova tentativa."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 50,
    data: "27 de outubro de 2026",
    resumo: "Metas acessíveis e recuperação de jogadores fora do mapa.",
    novo: ["Pescar 3 sardinhas substitui a meta de linguados, por 50 Brasas. A missão final do Limiar pede três andares após aceitar. Posições inválidas são recuperadas na cidade, fazenda, praia e floresta."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 49,
    data: "27 de outubro de 2026",
    resumo: "Fisgada julgada pela posição que aparece na tela.",
    novo: ["O aperto do botão é avaliado antes de avançar o ponteiro do puzzle, corrigindo falsos erros em quadros demorados."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 48,
    data: "27 de outubro de 2026",
    resumo: "Criação reorganizada, pesca no toque e carregamento no Android.",
    novo: ["Prévia, abas de roupas e cores na criação. Puzzle de pesca maior no toque e encomendas diárias compatíveis com habilidade e vara. Melhorias de carregamento e de desempenho das patrulhas distantes."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 47,
    data: "27 de outubro de 2026",
    resumo: "Chuva e neve mais econômicas no Android.",
    novo: ["A precipitação usa uma composição mais leve e mantém sprites, transições e clima noturno."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 46,
    data: "27 de outubro de 2026",
    resumo: "Armaduras sobre o modelo 3D, brilho das armas e tintura.",
    novo: ["Mordomo, Carrasco e Cavaleiro Rubro ganharam quatro peças no modelo atual. Nível muda a aura da arma e raridade define o material. Arco e aljava ajustados nas costas; tintura sincronizada."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 45,
    data: "27 de outubro de 2026",
    resumo: "Rosto, roupas e cabelos pintados em pixel art.",
    novo: ["Novo acabamento do personagem com sombras em blocos e contorno fino. Um novo comando de movimento cancela o golpe corpo a corpo; manter a direção já segurada ao começar o golpe preserva o ataque."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 44,
    data: "27 de outubro de 2026",
    resumo: "Personagem atual nos retratos e nas telas do jogo.",
    novo: ["Visual 3D integrado à mochila, carregamento, cama, cidade online, ranking e pódio, com ajustes da introdução, petrificação e combate."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 43,
    data: "27 de outubro de 2026",
    resumo: "Contato do slime e pesca com a mochila cheia.",
    novo: ["Colisão de contato e área atingível do slime ajustadas ao corpo. Peixes iguais em espécie e qualidade continuam empilhando mesmo sem casas vazias na mochila."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 42,
    data: "27 de outubro de 2026",
    resumo: "Colisões e projéteis alinhados ao personagem 3D.",
    novo: ["Área de dano acompanha cabeça e pés. Contato da arma segue os golpes nas oito direções. Flechas verificam o caminho percorrido para não atravessar alvos pequenos."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 41,
    data: "27 de outubro de 2026",
    resumo: "Ajustes nos penteados dos personagens convertidos.",
    novo: ["Conversão de personagens antigos volta ao penteado Bagunçado e amplia as opções de cabelo. O catálogo mais recente está na página Personagem e aparência."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 40,
    data: "27 de outubro de 2026",
    resumo: "Personagem 3D e edição da aparência pela pausa.",
    novo: ["Aparência antiga convertida para roupas do novo modelo. PAUSA → EDITAR VISUAL permite trocar cabelo, roupa, pele, tintura e olhos. Inclui a correção das retentativas de transferência de save."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 38,
    data: "26 de outubro de 2026",
    resumo: "Transferência de save entre aparelhos.",
    novo: ["Na tela inicial, ENVIAR gera um código de seis letras válido por 15 minutos. RECEBER leva o mundo solo para PC, Android ou navegador, preservando a identidade do ranking e mercado e guardando backup do destino."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 37,
    data: "26 de outubro de 2026",
    resumo: "Checkpoints a cada cinco andares.",
    novo: ["Escolha os marcos azuis já alcançados no mapa do portal, sem exigir a Mística. Começar adiantado concede 40% do ouro de referência da subida."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 36,
    data: "26 de outubro de 2026",
    resumo: "Correção do personagem invisível.",
    novo: ["O jogador deixa de depender de um visual de teste ausente nos pacotes publicados."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 35,
    data: "26 de outubro de 2026",
    resumo: "Preço e quantidade digitáveis no mercado.",
    novo: ["A aba VENDER aceita números pelo teclado e ajusta os valores aos limites do anúncio e da pilha."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 34,
    data: "25 de outubro de 2026",
    resumo: "Arco reequilibrado e sem encantamentos.",
    novo: ["O arco dispara com intervalo de aproximadamente 0,70 s e mira automática até 200 px. Arcos antigos perdem os encantamentos; itens lendários recebem outro afixo."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 32,
    data: "25 de outubro de 2026",
    resumo: "Mercado entre jogadores e cinco montantes.",
    novo: ["Compra, venda e entregas em Brasas pelo mural, inclusive partes de pilhas. Cinco modelos de montantes ampliam o arsenal, do comum ao lendário."],
  },

  {
    versao: "2026.10.23.1",
    conteudo: 31,
    data: "25 de outubro de 2026",
    resumo: "Pesca até o nível 99, seis peixes novos e sete conjuntos de armadura.",
    novo: [
      <>A pesca tem nível próprio de 1 a 99, XP por captura e desbloqueios por nível. A coleção chega a 54 espécies, incluindo peixes dos níveis 50, 80 e 99.</>,
      <>Sete conjuntos novos completam o catálogo de dez armaduras, com quatro peças independentes, raridades de incomum a lendária, receitas e bônus próprios.</>,
    ],
    melhorou: [
      <>O aviso de captura usa uma moldura compacta e apresenta peixe, qualidade e XP, com tamanho ajustado ao celular.</>,
      <>A fabricação respeita os marcos de progressão e os custos das receitas. Os conjuntos concedem bônus parciais com duas peças e completos com quatro; os efeitos crescem com o nível.</>,
    ],
    corrigido: [
      <>Corrida dos conjuntos novos revisada: grade de seis quadros, pernas, encaixe dos elmos, limpeza dos contornos e cabo da espada visível de costas. A cabeça permanece no mesmo eixo horizontal na corrida de costas.</>,
      <>Atualização cumulativa para Android, Windows e Linux: aguarde o download, feche e reabra o jogo. No navegador, recarregue a página. Mantém os instaladores e os saves existentes.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 30,
    data: "25 de outubro de 2026",
    resumo: "Pódio do ranking no centro da praça.",
    novo: ["A praça foi reorganizada para destacar os três primeiros do ranking."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 29,
    data: "25 de outubro de 2026",
    resumo: "21 mapas, chefes mais rápidos e melhorias de combate.",
    novo: ["Dez mapas novos completam os andares 12–21. Aparar cancela golpes; bônus ficam visíveis no HUD. Portal de tesouro mais frequente e Moeda de Forja de todo guardião."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 28,
    data: "25 de outubro de 2026",
    resumo: "Colheita mais rápida e chat acompanhando mensagens.",
    novo: ["A animação de colher ficou 40% mais rápida e o chat rola ao final depois de enviar."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 26,
    data: "25 de outubro de 2026",
    resumo: "Teclado do celular com texto à vista.",
    novo: ["Chat, apelido e nome usam o teclado do sistema com uma barra para acompanhar o texto. O teclado do jogo continua disponível no controle. Ajuste complementar entregue como conteúdo 27 no Android."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 25,
    data: "25 de outubro de 2026",
    resumo: "Entrada de texto no celular.",
    novo: ["Campos de chat, apelido e criação receberam revisão do teclado e da pontuação."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 22,
    data: "24 de outubro de 2026",
    resumo: "Logo do AlgoLand na tela inicial.",
    novo: ["A apresentação e o alinhamento do menu inicial foram atualizados."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 21,
    data: "24 de outubro de 2026",
    resumo: "Chat com reconexão ao canal reserva.",
    novo: ["Se o servidor principal estiver indisponível, o jogo tenta o canal reserva e retorna sozinho quando o principal se recupera."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 20,
    data: "24 de outubro de 2026",
    resumo: "Poções de regeneração e precisão.",
    novo: ["O inverno ganhou duas poções com peixes. As receitas atuais de todas as oito poções acompanham o calendário e estão na página Poções."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 19,
    data: "24 de outubro de 2026",
    resumo: "Interface e desempenho no iPhone.",
    novo: ["Botões de fechar maiores no toque, botão VOLTAR no mapa e limites de resolução e FPS no navegador móvel."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 18,
    data: "24 de outubro de 2026",
    resumo: "Jogo instalável pelo navegador.",
    novo: ["Controles de toque em celulares e tablets, tela cheia, suporte à área segura do iPhone e instalação como app no iPhone, iPad e Android."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 17,
    data: "24 de outubro de 2026",
    resumo: "Retorno da animação de corrida.",
    novo: ["Corrida com seis quadros e revisão dos conjuntos originais de armadura."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 15,
    data: "24 de outubro de 2026",
    resumo: "Outros jogadores na cidade, floresta e praia.",
    novo: ["Presença por mapa com até 24 avatares e chat global em servidor próprio, com canal reserva."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 14,
    data: "24 de outubro de 2026",
    resumo: "Apelido editável pela pausa.",
    novo: ["O botão APELIDO muda o nome do personagem usado no chat, mapa e ranking."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 13,
    data: "24 de outubro de 2026",
    resumo: "Ascensão das armas e escudos.",
    novo: ["Equipamentos no nível 5 podem subir de raridade na bigorna. O chat mostra mensagens não lidas."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 12,
    data: "24 de outubro de 2026",
    resumo: "Chat global entre mapas.",
    novo: ["Mensagens e sessão acompanham a viagem, com preferências individuais no cooperativo."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 11,
    data: "24 de outubro de 2026",
    resumo: "Mais peso nos acertos e comandos antecipados.",
    novo: ["Impacto visual, tremor de câmera, avanço curto do golpe e uma janela para guardar ataques e esquivas pedidos um pouco antes."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 10,
    data: "24 de outubro de 2026",
    resumo: "Combos e esquiva mais responsivos.",
    novo: ["Ataque enfileirado reinicia o combo e esquiva pode cortar a parte final do golpe. Recarga do dash reduzida para 0,35 s."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 9,
    data: "24 de outubro de 2026",
    resumo: "Medusa, chat e marcadores de missão revisados.",
    novo: ["Garras nas quatro direções, margens do chat em telas pequenas e sinais de missão centralizados acima dos personagens."],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 8,
    data: "23 de outubro de 2026",
    resumo: "Ranking junto ao pódio, marcadores dos NPCs e missão principal alinhados.",
    corrigido: [
      <>O botão para consultar o ranking aparece junto à lateral direita da base do pódio, no computador e no celular.</>,
      <>O círculo dos sinais de missão voltou e permanece perto do NPC, inclusive quando há balão de fala.</>,
      <>O quadro da missão principal foi alinhado com o HUD e teve a largura ajustada, preservando o espaço interno dos textos.</>,
      <>Atualização de conteúdo para Android, Windows e Linux, sem novo instalador. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 7,
    data: "23 de outubro de 2026",
    resumo: "Corrida com capa revisada, pés visíveis e ombreira preservada.",
    corrigido: [
      <>A capa acompanha a inclinação do corpo e dobra na impulsão ao correr para cima, sem esconder a passada.</>,
      <>O calcanhar da perna dobrada mantém a bota e aparece à frente da capa. A ombreira acompanha o ombro sem deformar ou desaparecer.</>,
      <>Removidos os pontos de tecido que apareciam perto da cabeça durante a corrida.</>,
      <>Atualização cumulativa para Android, Windows e Linux na versão 2026.10.23.1: aguarde o download e feche e abra o jogo. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 6,
    data: "23 de outubro de 2026",
    resumo: "Receitas por descobrir na bigorna, balcão da Lia e online com menos atraso.",
    melhorou: [
      <>Na bigorna, as receitas que você ainda não tem aparecem como silhuetas pretas, para mostrar o que falta descobrir.</>,
      <>O balcão de atendimento da Lia ganhou uma vela apoiada no tampo, com a passagem livre.</>,
      <>O chat aceita mensagens com intervalo menor (0,5 s) e responde mais rápido. Os outros jogadores se movem no ritmo certo mesmo quando a conexão atrasa.</>,
    ],
    corrigido: [
      <>Atualização cumulativa para Android, Windows e Linux na versão 2026.10.23.1, sem outro instalador e sem mexer nos saves. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 5,
    data: "23 de outubro de 2026",
    resumo: "Menos sementes caindo, chat mais ajustado e online mais fluido.",
    melhorou: [
      <>O drop de sementes diminuiu: inimigos comuns soltam cerca de 60% menos e o chefe solta 1 semente garantida (antes eram 2), com chance extra menor.</>,
      <>O online ficou mais fluido: o jogo atualiza os outros jogadores a cada 0,55 s e eles se movem sem o atraso de quase 1 segundo.</>,
      <>No celular, o ícone do chat fica ao lado do botão MAPA, e os botões de ação ganharam um pequeno espaço entre eles.</>,
    ],
    corrigido: [
      <>O registro do chat no canto do computador tem largura proporcional à tela e não ocupa mais a janela inteira.</>,
      <>Digitar M (ou outras teclas de atalho) no chat não abre mais o mapa.</>,
      <>Os outros jogadores parados não ficam mais andando sozinhos.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.23.1, sem outro instalador. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 4,
    data: "23 de outubro de 2026",
    resumo: "Registro do chat no canto da tela, com campo para escrever, no computador.",
    melhorou: [
      <>No computador, o canto inferior esquerdo da cidade mostra o histórico das mensagens, como nos MMORPGs. Aperte Enter para escrever no campo ali mesmo, Enter para enviar e Esc para cancelar. O personagem não anda enquanto você digita.</>,
      <>Com a cidade offline, o registro mostra o estado e o Enter abre o chat para você ficar online.</>,
    ],
    corrigido: [
      <>No computador o ícone de balão saiu, porque o registro assume o lugar dele. No celular e na tela dividida com toque, o ícone continua.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.23.1, sem outro instalador. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 3,
    data: "23 de outubro de 2026",
    resumo: "Ícone para abrir o chat e balões dos NPCs presos aos moradores.",
    melhorou: [
      <>Ícone de balão no canto inferior esquerdo da cidade, disponível no computador, celular e tela dividida. Clique ou toque para abrir o chat e escolher FICAR ONLINE ou FICAR OFFLINE.</>,
    ],
    corrigido: [
      <>A fala dos NPCs permanece acima do próprio morador e sai da tela junto com ele. A câmera não prende mais o balão nas bordas nem o reposiciona perto do jogador.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.23.1, sem outro instalador. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 2,
    data: "23 de outubro de 2026",
    resumo: "Lobby opcional na cidade, chat e balões de fala entre jogadores.",
    corrigido: [
      <>Balões dos moradores acompanham a câmera durante a corrida, sem congelar a posição e saltar alguns pixels. A posição é ajustada depois da atualização da câmera.</>,
    ],
    novo: [
      <>A cidade principal agora permite encontrar outros jogadores online, com apelido, aparência e movimento. Cada jogador escolhe FICAR ONLINE ou FICAR OFFLINE; o padrão é offline e a escolha fica salva.</>,
      <>Abra CIDADE ONLINE / OFFLINE na pausa. No computador também há Enter e botão no HUD. O chat aceita teclado, toque e teclado virtual ABC para controle.</>,
      <>Mensagens aparecem em balões acima dos personagens, com o acabamento das conversas entre os NPCs, e permanecem no histórico do chat. Textos longos passam em trechos curtos; falas antigas não reaparecem ao conectar.</>,
    ],
    melhorou: [
      <>Lobby social com até oito participantes simultâneos. NPCs, missões, inventário e progresso continuam individuais. P1 e P2 têm sessões e preferências separadas.</>,
      <>Recuperação de conexão e limite de uso para manter o serviço gratuito. Sem conexão ou ao escolher offline, o jogo local continua disponível.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.23.1: aguarde a atualização e feche e abra o jogo. No navegador, recarregue a página. Preserva os saves e a temporada atual.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    conteudo: 1,
    data: "23 de outubro de 2026",
    resumo: "Ranking automático ao concluir cada andar e ao morrer, sem cadastro.",
    corrigido: [
      <>Concluir um andar ou morrer atualiza o ranking automaticamente, com aparência e uso de armas, usando o apelido atual do personagem.</>,
      <>Personagem sem nome aparece como “sem apelido”. Apelidos repetidos, com espaços ou acentos são aceitos: cada jogador continua com seu registro separado.</>,
      <>Removidos os campos de nome e os botões de cadastro da consulta e do fim de partida. O envio continua com menus ou pausa abertos e guarda o próximo resultado se outra requisição estiver em andamento.</>,
      <>Correção por patch para Android, Windows e Linux na versão2026.10.23.1: aguarde a atualização e feche e abra o jogo. No navegador, recarregue a página. Esta correção preserva os saves e a temporada atual.</>,
    ],
  },
  {
    versao: "2026.10.23.1",
    data: "23 de outubro de 2026",
    resumo: "Ranking global, pódio na praça e criação de galinhas mais exigente.",
    novo: [
      <>Ranking global com pódio dos três primeiros na praça da cidade: cada personagem conserva roupa, cabelo, armadura e nickname. Interaja com a frente do pódio para abrir a lista dos 15 primeiros.</>,
      <>Cada jogador local, incluindo P2, tem perfil e contagens de uso de armas separados. A arma mais usada aparece nas mãos do personagem no pódio.</>,
    ],
    melhorou: [
      <>Praça ampliada, pódio proporcional ao jogador e números centralizados. Consulta adaptada para computador, celular e cooperativo.</>,
      <>Construir o galinheiro exige 500 madeiras, 300 pedras e 150 fibras, com prazo de 4 dias. As ampliações exigem 1.200/800/100/400 e 2.500/1.600/250/800 unidades de madeira/pedra/ferro/fibra, com prazos de 6 e 8 dias.</>,
      <>Galinha e galo passam de 25 para 250 Brasas cada. Aves iniciais e incubação continuam disponíveis.</>,
      <><b>Reinício geral da progressão.</b> A estreia do ranking começa com saves e pontuações zerados. O reset ocorre uma única vez; as opções são preservadas.</>,
      <><b>Instaladores novos.</b> Android, Windows e Linux precisam da versão 2026.10.23.1 para adicionar o ranking. O atualizador da versão anterior oferece o download. No navegador, recarregue a página.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 10,
    data: "23 de outubro de 2026",
    resumo: "Armas nas costas do Raven e rega mais ágil.",
    melhorou: [
      <>Espada básica, espada de duas mãos e lança aparecem nas costas do personagem Raven e acompanham as seis poses da corrida nas quatro direções. O arco mantém somente a aljava.</>,
      <>O porte das armas funciona no corpo base com roupas, cabelos, capa e armadura. Ao atacar ou usar uma ferramenta, a animação da ação assume o lugar da arma guardada.</>,
      <>A animação de regar agora dura 0,7 segundo, mantendo uma única aplicação de água por ação.</>,
      <>Patch cumulativo para Android, Windows e Linux: aguarde o download e feche e abra o jogo para ativar. No navegador, recarregue a página para carregar a atualização.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 9,
    data: "23 de outubro de 2026",
    resumo: "Corrida em qualquer intensidade do joystick e rega mais rápida.",
    melhorou: [
      <>Todo movimento no joystick usa a corrida nova de seis quadros, inclusive no toque leve, com velocidade normal. A caminhada lenta foi removida.</>,
      <>A animação de regar passou de 1,24 segundo para 1 segundo, mantendo uma única rega por ação.</>,
      <>Patch cumulativo para Android, Windows e Linux: aguarde o download e feche e abra o jogo para ativar. No navegador, recarregue a página para carregar a atualização.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 8,
    data: "23 de outubro de 2026",
    resumo: "Corrida modular revisada, capas corrigidas e ajustes no espaço da interface.",
    novo: [
      <>Corrida de seis quadros nas quatro direções, com corpo base, cabelos, roupas e peças dos três conjuntos acompanhando o movimento.</>,
    ],
    melhorou: [
      <>No celular, toque leve no joystick caminha devagar com a animação original do Raven; toque forte corre.</>,
      <>Ao sair da arena, o personagem retorna à vila às 23h.</>,
      <>Atualização cumulativa para Android, Windows e Linux: aguarde o download e feche e abra o jogo. No navegador, recarregue a página para carregar a atualização.</>,
    ],
    corrigido: [
      <>Capa preservada durante a corrida e as ações de plantar e colher. Roupas e corpo mantêm os contornos, as cores e as sombras dos sprites originais.</>,
      <>A barra de itens deixa de subir sozinha quando o nome do item desaparece e continua desviando quando o personagem se aproxima.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 7,
    data: "23 de outubro de 2026",
    resumo: "Plantio e colheita animados, interface mobile mais livre e correções no dragão e nas cartas.",
    novo: [
      <>Novas animações de plantar e colher nas quatro direções, com corpo base, 28 cabelos, roupas, capas e peças dos três conjuntos acompanhando as poses.</>,
    ],
    melhorou: [
      <>A barra de itens sobe automaticamente quando o personagem se aproxima dela. O aviso do pombo acompanha o espaço disponível sem ficar escondido pela barra.</>,
      <>Relógio separado dos botões de pausa e mochila no celular; balões dos moradores menores e ajustados à tela. O nome do item selecionado desaparece após alguns segundos.</>,
      <>O especial do dragão marca uma área circular menor, trava a mira durante o aviso e oferece três segundos para sair do alcance.</>,
      <>A versão de navegador também recebeu estas atualizações. Recarregue a página do jogo para carregar o conteúdo novo.</>,
      <>Patch cumulativo para Android, Windows e Linux: inclui a Medusa e as atualizações anteriores. Aguarde o download e feche e abra o jogo para ativar.</>,
    ],
    corrigido: [
      <>Proteção contra bloqueios residuais de ataque ao entrar em um andar da fenda no celular.</>,
      <>Aceitar uma carta de um morador mantém o remetente correto, sem mostrar uma pessoa misteriosa por engano.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 6,
    data: "22 de outubro de 2026",
    resumo: "Interface mais compacta e melhor aproveitamento da tela no celular.",
    melhorou: [
      <>No celular, MAPA, mochila e pausa ficam juntos no topo; calendário e estado do andar aparecem em um resumo compacto.</>,
      <>O mapa do andar abre pelo botão MAPA, cabe na tela e fecha com um toque. Os controles de combate ficam ocultos durante a consulta e voltam ao fechar.</>,
      <>A barra inferior se encaixa entre os controles, e os botões de combate e o joystick se adaptam às telas menores. Missões sem objetivo no andar deixam de ocupar espaço durante a exploração da fenda.</>,
      <>O aviso do pombo-correio e outros eventos usam um cartão menor junto à borda inferior; o cartão da missão principal também ficou mais compacto.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.22.7, sem reinstalar. Inclui a Medusa e todas as correções anteriores. Aguarde o download e feche e abra o jogo para ativar.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 5,
    data: "22 de outubro de 2026",
    resumo: "Medusa redesenhada, com três fases e novos padrões de combate.",
    melhorou: [
      <>A Medusa ganhou cinco animações revisadas e uma Ruína com energia dos olhos, runas no chão e impacto animado.</>,
      <>A luta muda aos 60% e 25% de vida, com combos de até três golpes, finalizador retardado e abertura EXPOSTA para contra-atacar com 25% de dano extra. A mira trava antes do impacto.</>,
      <>A Ruína causa dano forte, respeita esquiva e bloqueio e não mata instantaneamente. O olhar petrificante participa dos padrões normais.</>,
      <>Patch para Android, Windows e Linux na versão 2026.10.22.7, sem reinstalar. Aguarde o download e feche e abra o jogo para ativar. As correções dos conteúdos anteriores continuam incluídas.</>,
    ],
    corrigido: [
      <>A petrificação congela e restaura o personagem corretamente. No cooperativo, cada golpe atinge uma vez cada jogador presente na mesma área, sem atingir parceiros em outro mapa.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 4,
    data: "22 de outubro de 2026",
    resumo: "Correção do corte dos botões na confirmação de novo jogo no celular.",
    corrigido: [
      <>A janela de confirmação agora reserva o espaço real do título e da moldura, mantendo a pergunta e os botões SIM e NAO inteiros em telas menores, em paisagem e retrato.</>,
      <>Atualização por patch para Android, Windows e Linux, sem reinstalar. Aguarde o download e feche e abra o jogo para ativar. As otimizações da cidade e a saída dos andares à meia-noite continuam incluídas.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 3,
    data: "22 de outubro de 2026",
    resumo: "Otimização da animação das bordas da grama para reduzir engasgos na cidade.",
    melhorou: [
      <>O vento agora reutiliza os quadros das bordas da grama, evitando milhares de consultas ao mapa durante a caminhada. A aparência e a animação foram preservadas nas quatro estações.</>,
      <>Disponível por patch para Android, Windows e Linux na versão 2026.10.22.7, sem outro APK ou EXE. Aguarde o download e feche e abra o jogo para ativar. Inclui a otimização da fonte e a saída dos andares à meia-noite.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 2,
    data: "22 de outubro de 2026",
    resumo: "Ao sair dos andares da fenda, o jogador chega à vila à meia-noite.",
    melhorou: [
      <>A saída dos andares agora marca 00:00 no relógio, em vez de 01:00, dando mais tempo para voltar para casa e dormir.</>,
      <>Disponível por patch para Android, Windows e Linux na versão 2026.10.22.7, sem reinstalar. A otimização da fonte do conteúdo 1 continua incluída.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    conteudo: 1,
    data: "22 de outubro de 2026",
    resumo: "Patch de desempenho da fonte de água da cidade, sem novo instalador.",
    melhorou: [
      <>A animação dos jatos, ondas e gotas da fonte foi otimizada para reduzir o custo de desenho da cidade, mantendo a água animada e as quatro estações.</>,
      <>Disponível pelo atualizador do Android, Windows e Linux na versão 2026.10.22.7. Abra o jogo, aguarde o download e depois feche e abra novamente para ativar. Não precisa baixar outro APK ou EXE.</>,
    ],
  },
  {
    versao: "2026.10.22.7",
    data: "22 de outubro de 2026",
    resumo: "Atualizações de conteúdo por área e nova tela de download no visual do AlgoLand.",
    novo: [
      <><b>Atualização por área.</b> Windows, Linux e Android recebem pacotes separados por área e andar. Instale esta versão uma vez para receber o novo atualizador; nas próximas mudanças compatíveis, só os pacotes alterados serão baixados.</>,
      <><b>Tela de atualização.</b> Molduras de madeira, pergaminho, fontes e botões do jogo acompanham a barra de download.</>,
    ],
    melhorou: [
      <>Uma atualização pendente bloqueia a entrada no jogo. Se o download falhar, tente novamente ou saia; fechar o aplicativo não apaga a pendência. Ao concluir, feche e abra o jogo para ativar o conteúdo novo.</>,
      <>Mudanças no motor e no núcleo do atualizador ainda precisam de um instalador novo. A versão Web continua sendo atualizada pela Wiki.</>,
    ],
  },
  {
    versao: "2026.10.22.6",
    data: "22 de outubro de 2026",
    resumo: "Menu de obras do carpinteiro no padrão da forja, tempo dos andares sem desmaio, saída da arena à 1h da manhã e ajustes na floresta.",
    novo: [
      <><b>Carpintaria do Osvaldo.</b> O balcão agora abre um catálogo no mesmo estilo da forja do Ivo: galinheiro em três níveis, galinha e galo, com os materiais mostrando quanto você tem e quanto precisa, o prazo e um botão grande de encomenda.</>,
    ],
    melhorou: [
      <><b>Corrida longa nos andares.</b> Dentro da fenda o tempo passa, mas ninguém desmaia mais às 2h da manhã. Ao sair da arena para a vila, o relógio marca 01:00, e o jogador precisa correr para dormir antes de apagar.</>,
      <><b>Passagens da floresta.</b> As saídas para a vila e para a fazenda cobrem a abertura inteira da mata, sem travar o personagem na parede.</>,
    ],
    corrigido: [
      <>A horta e as plantas da fazenda apareciam por engano na floresta entre a vila e a fazenda.</>,
    ],
  },
  {
    versao: "2026.10.22.5",
    data: "22 de outubro de 2026",
    resumo: "Correção para o aviso de atualização do Android funcionar.",
    corrigido: [
      <>O app Android não tinha permissão de internet e por isso nunca conseguia procurar atualizações. Agora tem: ao abrir o jogo, ele consulta o servidor e avisa quando há versão nova.</>,
      <>A tela de abertura passou a dizer o que aconteceu: "Jogo atualizado", ou "Sem conexão com as atualizações" quando a rede falha.</>,
    ],
    novo: [
      <>Quem está com a versão 2026.10.22.3 ou 2026.10.22.4 precisa instalar este APK uma vez; as próximas versões avisam sozinhas.</>,
    ],
  },
  {
    versao: "2026.10.22.4",
    data: "22 de outubro de 2026",
    resumo: "Floresta entre a vila e a fazenda com animais, estações e clima próprios em cada andar, minimapa nos andares, corrida do Raven com mais peso e várias correções.",
    novo: [
      <><b>Floresta do caminho.</b> Um mapa grande liga a vila à fazenda: estrada de terra, lago grande com sete pontos de pesca e cantinho de pesca, pedreira ao pé de um paredão, acampamento de lenhadores, placas nos cruzamentos e mata fechada nas bordas. Árvores e arbustos cortam com a machadinha e as pedras quebram com a picareta.</>,
      <><b>Bichos do Tiny RPG.</b> Cervos, coelhos, capivaras e corvos vivem na floresta. Quando você chega perto eles param e encaram; se chega mais perto, correm até uma árvore e somem atrás dela. Os corvos levantam voo, os coelhos ficam brancos no inverno e todos voltam depois, longe de você.</>,
      <><b>Minimapa nos andares.</b> Um mapa do andar no estilo Diablo mostra o que você já explorou, com o portal, o guardião e os jogadores. Aparece pequeno no canto; M, Tab, o botão MAPA do toque ou segurar R3 abrem a versão grande.</>,
      <><b>Estação e clima por andar.</b> Cada andar da fenda tem a sua estação e o seu clima. Ao voltar para a vila, a estação e o clima corretos do calendário continuam valendo.</>,
    ],
    melhorou: [
      <><b>O tempo passa dentro dos andares.</b> O relógio, a luz do dia e o cansaço da madrugada funcionam na fenda como no resto do jogo. O desmaio às 2h só acontece fora de combate.</>,
      <><b>Corrida do Raven.</b> O corpo balança 1 px ao correr, sobe com os pés juntos e desce no passo, e uma poeirinha sobe a cada passada.</>,
      <><b>Missão principal.</b> Dentro dos andares ela fica minimizada, a não ser que a etapa atual seja da fenda.</>,
      <><b>Andares 6 e 10.</b> As Ruínas ganharam o mesmo acabamento detalhado dos bosques: grama, terra, árvores e pedras pintadas nas quatro estações.</>,
      <><b>Cidade mais leve no celular.</b> Menos trabalho por quadro na vila, e a fonte da praça só simula a água quando está na tela.</>,
    ],
    corrigido: [
      <>Armaduras que não apareciam no personagem na versão Web.</>,
      <>Personagem sentado de costas, que parecia de pé atrás do banco, e sentado de lado na cadeira da casa da fazenda.</>,
      <>Velas das mesas grandes que flutuavam acima do tampo e poltronas pequenas em que não dava para sentar.</>,
    ],
  },
  {
    versao: "2026.10.22.3",
    data: "22 de outubro de 2026",
    resumo: "Cidade mais leve no celular, atualização automática de conteúdo no Android, versão Web que baixa mais rápido e ajustes nos móveis das casas.",
    novo: [
      <><b>Atualização automática (Android).</b> Ao abrir o jogo, ele procura uma atualização de conteúdo e baixa sozinha, sem reinstalar o app. Os arquivos são conferidos por assinatura antes de usar; sem internet, o jogo abre normalmente. Mudanças no motor ainda pedem um APK novo, e o jogo avisa.</>,
    ],
    melhorou: [
      <><b>Cidade mais leve no celular.</b> O personagem deixou de refazer a conta de aparência a cada quadro e a fonte da praça só simula a água quando está na tela, o que reduz bastante o trabalho por quadro na vila.</>,
      <><b>Versão Web mais rápida.</b> Download do jogo em partes paralelas, guardado no navegador para as próximas visitas, e pacote menor, sem arquivos de produção que o jogo não usa.</>,
      <><b>Lago da fazenda.</b> Deixou de redesenhar a cada quadro quando a água é a versão nova.</>,
    ],
    corrigido: [
      <>Móveis mal posicionados: cadeiras da carpintaria alinhadas à mesa e planta da pousada afastada do banco ao lado.</>,
      <>Poltronas pequenas que não dava para sentar foram removidas da pousada e da casa da Estela.</>,
    ],
  },
  {
    versao: "2026.10.22.2",
    data: "22 de outubro de 2026",
    resumo: "Interfaces no padrão dos cenários, ferraria com processo animado e correções na enfermaria, nas camas e na pesca.",
    novo: [
      <><b>Ferraria em funcionamento.</b> Braseiro aberto com coifa e chaminé, fole conectado à entrada de ar e bigorna separada. Ivo aciona o fole, aquece o ferro pela direita da fornalha, transporta o tarugo e martela no tampo.</>,
      <><b>Fogo que responde ao fole.</b> O carvão começa com brasas fracas; as sopradas aumentam o fogo, a luz e a fumaça. O ferro muda de cinza para vermelho-alaranjado ao aquecer.</>,
      <><b>Quarto da Dona Rosa.</b> A enfermeira passa a dormir em seu próprio quarto, deixando os leitos para os pacientes.</>,
    ],
    melhorou: [
      <><b>Interface pintada.</b> Tela inicial, criação de personagem, inventário, pausa e serviços usam madeira e pergaminho no padrão dos cenários. Fontes, personagens e ícones dos itens continuam pixelados.</>,
      <><b>Menus mais compactos.</b> Criação de personagem e catálogo da forja usam páginas para caber na tela, com setas dentro dos botões e mais opções por página quando há espaço.</>,
      <><b>Interações legíveis.</b> Os avisos de tecla usam um círculo pequeno com letra contrastante; as opções das lojas deixaram de ocupar cartões gigantes.</>,
      <><b>Interior da ferraria.</b> Passagens e móveis reorganizados, postos de trabalho independentes e trajeto do Ivo sem atravessar o fole nem prender na bigorna.</>,
    ],
    corrigido: [
      <>Compra de sementes com Brasas na venda do Tomás e validação dos pontos de pesca junto à água visível.</>,
      <>Recuperação depois de morrer: posição no leito, cobertor, rosto e liberação do movimento ao sair da enfermaria.</>,
      <>Rosto do jogador visível ao dormir na cama da fazenda; xícaras decorativas removidas da mesa.</>,
      <>Prévias do personagem sem giro automático e animação do Ivo com o corpo inteiro, sem recortes nos braços.</>,
    ],
  },
  {
    versao: "de desenvolvimento",
    data: "21 de outubro de 2026",
    resumo: "Personagens Raven, cenários detalhados nas quatro estações, fachadas no padrão da taverna e revisão completa dos guias.",
    novo: [
      <><b>Herói Raven.</b> Três tons de pele, 28 cabelos e opções de roupa; combate, ferramentas, pesca e peças de armadura acompanham a aparência.</>,
      <><b>Pesca ampliada.</b> 48 espécies, níveis de vara, qualidade, coleção, desafios e encomendas. O cardápio do Caio tem dez pratos, incluindo peixes e ovos.</>,
    ],
    melhorou: [
      <><b>Vila e fazenda.</b> Terrenos, água, árvores, pedras, cercas, tufos e flores detalhados, com integração nas quatro estações.</>,
      <><b>Construções.</b> Venda, sede, enfermaria, Mística, Bento, forja e carpintaria receberam o acabamento pintado da taverna. A casa do jogador tem inverno próprio e os fundos do menu mostram as artes novas.</>,
      <><b>Catálogo atual.</b> Cinco armas e 23 receitas ativas de equipamento; Maça, Arco Curvo e Arco Longo saíram do catálogo novo. Receita precisa ser recolhida, aprendida na mochila e fabricada com Ivo.</>,
      <><b>Guias da Wiki.</b> Guardiões por mapa, controles, energia, serviços dos moradores e itens preservados após a expedição foram conferidos no código atual.</>,
    ],
    corrigido: [
      <>As cercas da fazenda restauram corretamente o visual ao alternar a comparação Tiny.</>,
      <>Fontes de interface incluem os acentos e símbolos utilizados na versão Web.</>,
    ],
  },
  {
    versao: "0.8",
    data: "20 de outubro de 2026",
    resumo: "Nova interface, trilhas e ambientes sonoros, fenda por andares, fabricação de equipamentos e criação de galinhas.",
    novo: [
      <><b>Arena transformada em fenda por andares.</b> Agora você explora mapas com patrulhas, grupos, elites e um guardião por andar. A caçada pede parte dos pontos disponíveis, sem exigir limpar todos os becos. Depois do mapa 11, o circuito repete os mapas 2–11 com dificuldade crescente. Orion oferece melhorias e avanço depois da vitória.</>,
      <><b>Fabricação de equipamentos.</b> Ivo trabalha com receitas, materiais físicos da mochila e prazo no calendário. São 24 receitas de equipamentos, além dos conjuntos com quatro peças independentes, refino e ascensão de raridade.</>,
      <><b>Músicas e sons ambientes.</b> Vila, fazenda, praia, fenda e guardião têm trilhas próprias, com transições entre temas e ambientes de bosque, mar e caverna. Música, efeitos e ambiente têm controles de volume separados.</>,
      <><b>Interface renovada.</b> Menus de título e pausa, diário da jornada, barra de itens em todos os mapas e serviços nos balcões. A escala pode ser ajustada entre 75%, 100%, 125% e 150%, com preferência individual no cooperativo.</>,
      <><b>Osvaldo e sua família.</b> A casa e oficina ficam depois da ponte, a leste da vila. Conheça Osvaldo, Helena e Clara, com rotinas e histórias próprias.</>,
      <><b>Galinheiro ampliável.</b> Encomende a construção no balcão do Osvaldo. São três níveis, com espaço para 4, 8 e 12 aves, materiais físicos e prazo de obra.</>,
      <><b>Criação de aves.</b> Cuide das galinhas e dos galos diretamente no galinheiro: alimentação, carinho, coleta de ovos, incubação e portinha para os passeios.</>,
      <><b>Loja de animais.</b> O catálogo mostra a imagem da galinha e do galo, preço, saldo e lotação. Cada ave custa 25 Brasas.</>,
      <><b>Espada para roçar.</b> Selecione a espada na barra da fazenda e corte o mato para obter feno. A enxada continua retirando mato para obter fibra.</>,
    ],
    melhorou: [
      <><b>Continuar a partida.</b> Dia e horário são restaurados com a precisão do relógio interno, junto da posição, direção, vida e fôlego, inclusive no cooperativo com jogadores em locais diferentes.</>,
      <><b>Conjuntos mais leves.</b> O reaproveitamento de texturas reduz as travadas ao equipar conjuntos e ao ocultar cabelos sob elmos fechados.</>,
      <><b>Interface no celular.</b> Vida e calendário se acomodam em telas estreitas, preservando as margens e os comandos de toque.</>,
    ],
    corrigido: [
      <>O feno agora fica dentro do comedouro e aparece diretamente, sem um objeto voando.</>,
      <>As colisões frontais do galinheiro impedem andar sobre a parede e as pedras, mantendo o vão da porta livre.</>,
      <>Conversar com Helena, Clara e Osvaldo com amizade avançada não falha ao liberar histórias.</>,
      <>Bancos de equipamentos e áudio são liberados corretamente no encerramento; avisos dos scripts foram revisados.</>,
    ],
  },
  {
    versao: "0.7",
    data: "19 de outubro de 2026",
    resumo: "A Medusa ganha arte nova, o Orion aparece depois do andar e a bigorna evolui as ferramentas da fazenda.",
    novo: [
      <><b>Orion.</b> Depois de vencer o andar ele aparece na vila. A conversa abre as melhorias e o avanço, e ele ganhou a base visual dos moradores, cabelo grisalho e cajado.</>,
      <><b>Ferramentas na bigorna.</b> A tela agora tem as categorias FABRICAR e FERRAMENTAS. Enxada, regador, machadinha e picareta evoluem por materiais físicos nos níveis madeira, reforçada e ferro. Não há receitas para ferramentas, e a vara de pesca continua com o Nilo.</>,
    ],
    melhorou: [
      <><b>Medusa redesenhada.</b> Quadros nativos de 128 px, sem serrilhado e com a silhueta limpa. O golpe especial tem runas e impacto desenhados por shader.</>,
      <><b>Menus no controle.</b> A seleção do menu navega direito com o controle.</>,
    ],
    corrigido: [
      <>O <b>F do mercante</b> aparecia sem cor, escuro sobre o círculo escuro. Agora é amarelo, como as outras dicas de tecla.</>,
      <>Itens físicos do comércio eram consumidos e devolvidos de forma errada ao comprar e vender.</>,
    ],
  },
  {
    versao: "0.6",
    data: "17 de outubro de 2026",
    resumo: "A barra de itens aparece em qualquer mapa e cada jogador escolhe o tamanho da interface.",
    novo: [
      <><b>Tamanho da interface.</b> Em Opções, a seção INTERFACE troca o tamanho do HUD e dos menus entre 75%, 100%, 125% e 150%. A mudança vale na hora, não mexe no zoom da câmera, e os cliques e toques acompanham o tamanho novo. No cooperativo cada jogador tem o próprio ajuste.</>,
    ],
    melhorou: [
      <><b>Barra de itens em todos os mapas.</b> Ela aparecia só na fazenda, na pesca e na arena. Agora também está na cidade, nas casas, na praia e na palafita, inclusive quando os jogadores trocam de ambiente no cooperativo. No celular a barra ganha páginas quando não cabe tudo.</>,
      <><b>Menus e barra de itens ampliados.</b> Com a interface maior, os menus e a barra se reorganizam para continuar cabendo na tela. No celular a barra usa mais linhas para deixar livres os comandos dos polegares.</>,
    ],
  },
  {
    versao: "0.5",
    data: "17 de outubro de 2026",
    resumo: "O HUD ganha uma barra de energia no padrão das outras, um ícone novo para a estamina e setas fáceis de tocar nas conversas.",
    novo: [
      <><b>Ícone de corrida na estamina.</b> O raio saiu e entrou um personagem correndo, em 12x12 pixels. Continua amarelo e fica vermelho quando falta fôlego. Vale no PC e no celular.</>,
    ],
    melhorou: [
      <><b>Barra de energia no visual da vida e da estamina.</b> A energia da fazenda usa agora as mesmas bordas, pontas e brilho das outras barras, em verde, e fica vermelha quando está baixa. No PC fica no canto inferior direito.</>,
      <><b>Energia visível no celular.</b> Antes a barra ficava escondida na área do joystick. Agora aparece logo abaixo da vida e da estamina, longe do joystick e da barra de itens.</>,
      <><b>Setas de rolagem nas conversas.</b> Nas opções de resposta do diálogo com os moradores, as setas ficaram maiores e com área de toque de 44x32, fáceis de acertar no celular.</>,
    ],
  },
  {
    versao: "0.4",
    data: "17 de outubro de 2026",
    resumo: "A fazenda ganha energia, a pesca pede a vara na mão e o controle passa a fazer tudo que o mouse fazia na mochila.",
    novo: [
      <><b>Energia da fazenda.</b> Uma barra verde vertical no canto da tela mostra a energia de cada jogador. Enxada gasta 3, machadinha e picareta 4, regador 2; colher, plantar e encher o regador não gastam. Sem energia a ferramenta não funciona. Dormir (ou desmaiar) recupera tudo. No prólogo nada gasta.</>,
      <><b>Barra de itens na praia.</b> A barra de baixo também aparece na praia e na palafita, para escolher a vara de pesca.</>,
      <><b>Vara na mão.</b> Para pescar é preciso equipar a vara na barra de baixo (tecla da casa, RB/LB, clique ou toque). Escolher a arma de novo guarda a vara. Sem ela, o jogo avisa.</>,
      <><b>Pescar de qualquer ponto do cais.</b> A cerca continua lá, mas toda borda do cais voltada para o mar vale como ponto de pesca.</>,
      <><b>Salvar no menu de pausa.</b> O botão SALVAR grava o jogo sem sair, inclusive os dois jogadores no cooperativo.</>,
      <><b>Fileiras da barra.</b> Como no Stardew, a barra mostra uma fileira da mochila por vez. Troque com <b>X</b> no teclado, <b>L3</b> no controle ou o botão numerado ao lado da barra no celular.</>,
      <><b>Mover itens no controle.</b> <b>Y</b> pega o item da casa em foco e <b>Y</b> em outra casa solta ali (troca de lugar, como no arrastar). A casa do item fica com moldura azul.</>,
      <><b>Setinhas de "tem mais".</b> As listas sem barra de rolagem mostram uma seta para cima e para baixo quando há mais conteúdo.</>,
      <><b>Ícone novo</b> do jogo no Windows, no Linux e no Android.</>,
    ],
    melhorou: [
      <><b>Diálogos no mesmo visual.</b> O prólogo, a Dona Rosa na enfermaria, a aula da arena e as lojas fechadas agora usam a caixa de pergaminho das conversas da vila, com o busto de quem fala e o texto aparecendo letra a letra.</>,
      <><b>Telas de dormir e de fim de partida</b> com a moldura de pixel art do resto do jogo.</>,
      <><b>Bigorna no controle.</b> Depois da última aba, <b>RB</b> passa para a mochila e <b>LB</b> volta, para escolher a arma que vai evoluir.</>,
    ],
    corrigido: [
      <>Os <b>itens sumiam</b> ao fechar e reabrir o jogo: a vara de pesca fazia o jogo achar que o inventário já estava carregado e o salvamento seguinte apagava o resto. Se isso aconteceu com você, o save do prólogo pode ser recuperado.</>,
      <>Save antigo ou gravado no meio do prólogo que ficava sem <b>espada ou escudo</b> agora ganha os básicos na mão.</>,
      <>No <b>cooperativo</b>, quando os dois abriam a mochila ao mesmo tempo o jogador 1 travava e só o 2 mexia. Cada um tem agora o próprio foco.</>,
      <>No prólogo, a <b>cenoura de exemplo</b> podia ficar escondida atrás de um arbusto.</>,
    ],
  },
  {
    versao: "0.3",
    data: "17 de outubro de 2026",
    resumo: "A pesca chega ao jogo, a vara vira item da mochila e a vila fica mais fácil de percorrer.",
    novo: [
      <><b>Pesca jogável.</b> Quatro pontos no pier da praia: aperte <b>F</b> (ou A no controle) para lançar a linha, espere o <b>"!"</b> e aperte na hora certa.</>,
      <><b>Minigame de fisgada.</b> Um ponteiro gira no círculo; acerte a zona amarela (ou a branca, que vale mais) para encher a barra. Errar esvazia. Quanto mais difícil o peixe, mais rápido o ponteiro e menor a zona.</>,
      <><b>Peixes por raridade e estação.</b> Comum, incomum, raro e épico, com peixes de mar e de rio. Alguns só aparecem em certas estações. Veja a lista completa no catálogo do Nilo.</>,
      <><b>Venda ao Nilo.</b> Ele compra os peixes em Brasas e mostra no catálogo quantos você já pescou de cada um.</>,
      <><b>Vara de pesca como item.</b> Ela aparece na mochila de cada jogador, nos saves antigos também. O nível (1 a 5) e a cor mudam com o refinamento: comum, incomum, raro, épico e lendário.</>,
      <><b>Placas de destino.</b> Chegue perto de uma placa na trilha da fazenda, na praia ou na vila e o nome do lugar aparece em cima dela, como o balão dos moradores.</>,
    ],
    melhorou: [
      <><b>Trilha da fazenda sem botão.</b> Correr pela borda da vila leva direto à fazenda, e o mesmo vale na volta, com o efeito de passagem de sempre.</>,
      <><b>Pedido pronto abre a entrega.</b> Falar com um morador que tem um pedido concluído abre direto a tela do pedido, com o botão ENTREGAR liberado.</>,
      <><b>Balão de pedido pronto.</b> Fica centralizado em cima da cabeça do morador e sai da frente dos balões de conversa, inclusive os de papo entre vizinhos.</>,
      <><b>Equipar no celular.</b> Dois toques num item equipam ou desequipam, no lugar do clique direito. A aljava também equipa assim.</>,
    ],
    corrigido: [
      <>A <b>aljava</b> não aparecia em saves antigos, e sem ela o arco não equipava. Agora o jogo devolve uma ao carregar.</>,
      <>O jogo travava ao clicar em <b>VER DESAFIOS</b> no inventário de pesca.</>,
      <>O <b>balão de papo</b> entre vizinhos chegava a ficar com quase mil pixels de altura quando o texto era longo.</>,
    ],
  },
  {
    versao: "0.2",
    data: "16 de outubro de 2026",
    resumo: "A fazenda passa a ajudar na arena e o cooperativo local recebe uma rodada grande de correções.",
    novo: [
      <><b>Refeições do Caio.</b> Cozinhe com a colheita e o prato vale a próxima partida inteira na arena. Veja os pratos em <Link para="refeicoes">Refeições</Link>.</>,
      <><b>Venda de colheita à Lia.</b> Troque o que você colheu por Brasas, de 3 a 9 por unidade.</>,
      <><b>Download na wiki.</b> A página <Link para="download">Baixar o jogo</Link> traz os builds para Windows, Linux e Android.</>,
    ],
    melhorou: [
      <>O <b>cooperativo</b> ganhou disputa de interação por jogador: cada um vê o <b>F</b> só do que está perto dele, e o banco vazio tem prioridade sobre o morador sentado ao lado.</>,
      <>A <b>festa de sábado</b> na taverna da pousada senta os seis moradores em duplas nas mesas.</>,
      <>Dormir no co-op espera o outro jogador: quem deita primeiro aguarda, e o dia só passa quando os dois estão na cama.</>,
    ],
    corrigido: [
      <>O jogador 2 não conseguia sentar na taverna, e o aviso de F aparecia para todo mundo.</>,
      <>O taverneiro travava depois que os dois jogadores sentavam.</>,
      <>Trocar de ferramenta no controle não funcionava, e a pausa travava o jogo no co-op.</>,
      <>Depois de dormir em dupla o relógio ficava em 22h e o mapa continuava escuro.</>,
    ],
  },
];

const Lista = ({ titulo, itens }) =>
  itens && itens.length > 0 ? (
    <>
      <h3 className="patch-titulo">{titulo}</h3>
      <ul className="lista">
        {itens.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  ) : null;

export const rotuloVersao = (p) => `${p.versao}${p.conteudo ? ` · conteúdo ${p.conteudo}` : ""}`;

export function Patch() {
  const [recente, ...antigos] = PATCHES;
  return (
    <>
      <Titulo sub="Atualização atual e histórico. As notas antigas descrevem o comportamento das versões anteriores.">Patch de atualizações</Titulo>
      <Secao>
        <Caixa tipo="nota" titulo={`Versão atual: ${rotuloVersao(recente)}`}>
          {recente.data}. {recente.resumo} A versão Web atualizada está em <Link para="jogar">Jogar no navegador</Link>; os instaladores do Release v2026.10.23.1 ficam em <Link para="download">Baixar o jogo</Link> e recebem as atualizações de conteúdo sozinhos.
        </Caixa>
      </Secao>
      {[recente, ...antigos].map((p) => (
        <Secao key={rotuloVersao(p)} titulo={`Versão ${rotuloVersao(p)} · ${p.data}`} id={`v${p.versao.replace(".", "-")}${p.conteudo ? `-c${p.conteudo}` : ""}`}>
          <p>{p.resumo}</p>
          <Lista titulo="Novo" itens={p.novo} />
          <Lista titulo="Melhorias" itens={p.melhorou} />
          <Lista titulo="Correções" itens={p.corrigido} />
        </Secao>
      ))}
      <Caixa tipo="aviso" titulo="Saves">
        O jogo ainda está em construção. Se um patch avisar que o save mudou, faça uma cópia da pasta de saves antes de atualizar.
      </Caixa>
    </>
  );
}
