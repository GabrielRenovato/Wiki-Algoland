# AlgoLand Wiki

Wiki do jogo AlgoLand em React (Vite), separada do projeto do jogo.

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera dist/ (abre em qualquer pasta, base relativa)
```

`npm run dev` e `npm run build` copiam antes as folhas de sprite do jogo para `public/sprites`
(`scripts/copiar-sprites.mjs`). O jogo é procurado em `../AlgoLand`; para outro caminho use `ALGOLAND=/caminho npm run dev`.

## Estado atual da wiki

Revisada em 28/10/2026 para o conteúdo 54 da base 2026.10.23.1, catálogos conferidos na fonte `b0e0ba6f7` (inclui as correções visuais posteriores).
As páginas cobrem aparência atual, duelo, chat global/presença por mapa, mercado,
transferência do mundo solo, checkpoints e as regras atuais de pesca, combate e fabricação.
O catálogo extraído contém 21 mapas, dez armas, dez conjuntos de quatro peças,
56 receitas, 54 peixes, oito poções (32 receitas sazonais) e dez refeições.

Para atualizar os dados e as imagens de apresentação, sem reexportar o jogo Web:

```bash
python3 scripts/sincronizar-dados.py ../AlgoLand
python3 scripts/capturar-visuais.py ../AlgoLand
npm run build
```

A captura usa Godot com renderização real e save exclusivo de testes. Exporta o
personagem com o shader atual, 19 opções de roupa/cabelo, as três armaduras com
malhas 3D, ícones das 40 peças e cinco montantes, além de vila/fazenda/praia/floresta
nas quatro estações. Gera também `src/sprites-atuais.js` com as dimensões dos ícones.
O build não volta a copiar capturas antigas nem as camadas antigas do herói.
As imagens exportadas ficam versionadas para publicar sem Godot na hospedagem.
O histórico abaixo registra versões anteriores e não substitui o estado atual.

Validação: `npm run build` confere as dimensões e os quadros de todas as imagens.
Para conferir navegação, busca, arquivos ausentes e encaixe dos textos em 33 páginas,
rode `npm run dev -- --port 5176` e, em outro terminal, `npm run verificar:interface`.
A verificação usa Playwright/Chromium (`npx playwright install chromium` na primeira
execução), três larguras e relatório/capturas em `/tmp/algoland-wiki-*`.


## Onde mexer

- `src/dados-jogo.json`: catálogo extraído diretamente do código com `scripts/sincronizar-dados.py` (armas, receitas, mapas/guardiões, conjuntos, poções sazonais, melhorias, 54 peixes e dez pratos), com o commit de origem. O extrator usa saves isolados; com `--check`, compara as tabelas sem regravá-las.
- `src/dados.js`: números do jogo (plantas, poções, armas, chefes...), com o arquivo de origem do código ao lado de cada bloco.
  Se o balanceamento mudar no jogo, atualize aqui.
- `src/sprites.js`: qual folha, tamanho do quadro e quadros animados de cada sprite.
- `src/componentes/Sprite.jsx`: recorta e anima o quadro direto da folha (fundo CSS), sem gerar imagens novas.
- `src/paginas/`: o texto das páginas. A lista do menu e da busca fica em `src/App.jsx`.

## No celular: app no navegador

Abaixo de 960 px a wiki usa layout de app: barra de cima com voltar e título, abas fixas embaixo (Início, Páginas,
Buscar, Jogar, Baixar), lista de páginas em gaveta que sobe e busca em tela cheia. Ela também é instalável (PWA):
`public/manifest.webmanifest`, ícones próprios em `public/icones/` (pixel art feita para a wiki, sem arte dos pacotes)
e `public/sw.js`, que só é registrado no build e guarda o que já foi visto para abrir sem rede (o jogo em `/jogar/`
fica de fora). Ao mudar o service worker, troque o nome em `CACHE` para descartar o cache antigo.

## Licença da arte

Os sprites pertencem aos pacotes usados pelo jogo (Mana Seed, Farm RPG, PixelLab e outros). As folhas e capturas que a wiki
usa ficam versionadas em `public/sprites`, para o build do Netlify funcionar sem o jogo. A licença do Mana Seed proíbe usar a arte junto com código gerado por IA,
e esta wiki foi escrita com IA: não publique a wiki com essas folhas antes de resolver isso.

## Publicar no Netlify

`netlify.toml` já define o build (`npm run build`, pasta `dist`, Node 20). As rotas usam `#`, então não há
redirecionamento a configurar. Sem a pasta do jogo ao lado (caso do Netlify), o build usa o que já estiver em
`public/sprites`.

- **Arrastar e soltar:** rode `npm run build` aqui e solte a pasta `dist/` em app.netlify.com/drop.
- **Pelo Git:** em app.netlify.com, "Add new site" > "Import an existing project" > GitHub > `Wiki-Algoland`.
  O `netlify.toml` já preenche o build; não mude o diretório base (deixe vazio) nem a pasta de publicação (`dist`).

## Versão jogável no navegador

A rota `#/jogar` incorpora a exportação Godot de `public/jogar/`. O botão inicia o download (o tamanho é lido do manifesto da exportação); também é possível abrir o jogo em outra aba. A partida fica no armazenamento do navegador, separada da instalação nativa. Use HTTPS na publicação, como o endereço padrão do Netlify, ou localhost durante o desenvolvimento.

Os arquivos exportados ficam versionados: `npm run build` e a publicação no Netlify não precisam instalar Godot nem acessar o repositório do jogo. Não há etapa de deploy nestes scripts.

Para atualizar a versão a partir do jogo em uma pasta vizinha, com Python, Godot 4.7.2 e seus templates Web instalados via Flatpak:

```bash
python3 scripts/sincronizar-dados.py ../AlgoLand
python3 scripts/exportar-jogo-web.py ../AlgoLand /tmp/algoland-web-export
npm run build
```

O exportador usa um projeto temporário e o preset em `scripts/web/export_presets.cfg`; não modifica os presets nem a partida do jogo original. A exportação usa os recursos já integrados, incluindo os recortes WebGL de personagens e armaduras, sem executar geradores que possam sobrescrever a arte do jogo. A exportação usa renderização Compatibility e uma única thread. O pacote é dividido em partes de 32 MiB para respeitar o limite de arquivos do GitHub; o carregador o monta antes de iniciar o Godot.

Se a exportação Web já estiver pronta em outro ambiente, com o executável chamado `index`:

```bash
node scripts/preparar-jogo-web.mjs /caminho/da/exportacao
```

O carregador e o HTML de origem ficam em `scripts/web/`. Após alterá-los, execute novamente o empacotador. Para conferir o site final localmente, use `npm run preview` depois do build. Valide o carregamento, uma nova partida, o retorno ao save e a apresentação em computador e celular antes de enviar uma atualização.

O build confere as dimensões reais dos PNGs e o encaixe de cada quadro com `scripts/verificar-sprites.mjs`, incluindo os 48 peixes. Isso detecta folhas diferentes, como a pose estática do Nilo.

## Referência desta atualização

Wiki e jogo Web atualizados em 22/10/2026, junto dos instaladores do Release `v2026.10.22.7`: Windows x86_64 (ZIP), Linux x86_64 (TAR.GZ) e Android arm64 (APK dentro de ZIP, código 17). Esta exportação inclui o estado de trabalho local do jogo baseado em `f4accc284`, com as alterações posteriores de interface, ferraria, enfermaria, camas e pesca; esse commit sozinho não representa todo o conteúdo publicado. O catálogo sincronizado tem cinco armas, 23 receitas de equipamento, 48 peixes e dez pratos.

A ferraria tem braseiro com coifa/chaminé, fole conectado, combustão que responde às sopradas e bigorna independente. Ivo aquece o ferro pelo lado direito e transporta o tarugo até o tampo. Fontes e ícones pixelados foram preservados nas interfaces pintadas. Os dados são extraídos do jogo com saves isolados; o pacote Web é identificado pelo SHA-256 em `public/jogar/manifesto.json`.

As páginas de histórico registram o comportamento de cada versão antiga. Os guias atuais usam a fenda por andares, com guardião por mapa, receitas físicas e fabricação por encomenda. A compra de sementes e a venda de peixes ficam com Tomás; refino da vara com Nilo; equipamentos e ferramentas com Ivo.

A release 2026.10.22.7 inclui o novo atualizador de conteúdo por área para Android, Windows e Linux. A tela usa a interface do jogo e bloqueia entrada enquanto houver atualização pendente; a ativação exige reabrir o aplicativo. As bases de patches ficam no projeto do jogo, separadas por plataforma. Esta release não substitui o pacote Web existente.

Conteúdo 1 da versão 2026.10.22.7: patch assinado de 9.168 bytes por plataforma para otimizar o desenho da fonte de água da cidade. Os instaladores da release permanecem os mesmos; o atualizador baixa o pacote e o ativa ao reabrir. Os três pacotes contêm apenas `codigo/cidade/agua_fonte.gdc`.

A versão Web foi atualizada em 23/10/2026 com as alterações do conteúdo 7: Medusa, HUD mobile, cartas, especial do dragão e animações modulares de plantio e colheita. O pacote é identificado pelo manifesto publicado em `public/jogar/manifesto.json`; os patches dos aplicativos permanecem separados em `public/jogar/atualizacao/`.

Conteúdo 8 publicado em 23/10/2026 para Android, Windows, Linux e navegador: corrida modular de seis quadros, caminhada lenta no toque leve, correções de capa e roupas na corrida e colheita, ajuste da barra de itens e retorno da arena às 23h. Os pacotes dos aplicativos são cumulativos e assinados; a versão Web tem exportação própria identificada em `public/jogar/manifesto.json`.

Conteúdo 9 publicado em 23/10/2026 para Android, Windows, Linux e navegador: corrida nova em qualquer intensidade do joystick, sem caminhada lenta, e animação de regar reduzida de 1,24s para 1s. Os pacotes assinados preservam o conteúdo anterior.

Conteúdo 10 publicado em 23/10/2026 para Android, Windows, Linux e navegador: porte modular de espada básica, espada de duas mãos e lança nas costas do Raven, mantendo só a aljava para arcos, e rega de 0,7s. Pacotes cumulativos assinados preservam as atualizações anteriores.

Release2026.10.23.1 em23/10/2026: ranking global, pódio sazonal com nicknames/aparência/arma favorita, perfis separados P1/P2, galinheiro com custos500/300/150,1200/800/100/400 e2500/1600/250/800 (madeira/pedra/ferro/fibra nas ampliações), prazos4/6/8 dias e aves por250 Brasas. Reset geral autorizado na versão2 dos saves e temporada1 do ranking. Exige instaladores novos por adicionar o autoload Ranking; os pacotes da base2026.10.22.7 continuam preservados e o manifesto anuncia os novos downloads. Web exportada novamente.

Conteúdo1 da versão2026.10.23.1: ranking automático ao concluir cada andar e na morte, usando apelido atual ou `sem apelido`, sem formulário de cadastro; aceita nomes repetidos, espaços e acentos. Fila continua durante pausa e envia andares recebidos enquanto outra requisição está em andamento. Migração preserva os registros/temporada e patch preserva saves. Teste de integração usa dungeon/jogador reais e servidor HTTP local; Web reexportada.

Conteúdo 2 da versão 2026.10.23.1: lobby social opcional na cidade principal, com até oito participantes, movimento e aparência dos personagens, chat e balões no acabamento dos NPCs. Começa offline; a opção fica na pausa, com preferências separadas para P1/P2. Não compartilha progresso. Patches assinados para Android, Windows e Linux e exportação Web própria, sem novo instalador ou reset de saves.

Conteúdo 3 da versão 2026.10.23.1: ícone de balão para abrir o chat da cidade em todas as plataformas, inclusive celular e tela dividida. A fala dos NPCs permanece presa ao morador no mundo e sai da tela com ele. Patch compatível com os instaladores existentes.

Conteúdo 4 da versão 2026.10.23.1: no computador o chat ganha registro e campo de texto no canto inferior esquerdo da cidade; o ícone de balão fica só no toque. Patch compatível com os instaladores existentes.

Conteúdo 5 da versão 2026.10.23.1: drop de sementes reduzido, chat do canto proporcional à tela, correção da tecla M ao digitar, avatares remotos parados e consulta do online a cada 0,55 s, ícone do chat ao lado do mapa e botões de ação do celular com espaço entre si. Patch compatível com os instaladores existentes.

Conteúdo 6 da versão 2026.10.23.1: receitas bloqueadas aparecem como silhuetas pretas na bigorna; balcão de atendimento da Lia com vela apoiada no tampo e acesso livre. Chat com intervalo mínimo de 0,5 s e sem ciclo adicional após respostas de rede; movimento remoto usa o horário da posição e preserva o ritmo de amostras atrasadas. Migração do servidor aplicada, pacotes assinados para Android/Windows/Linux e Web reexportada; preserva saves e instaladores.

Conteúdo 7 da versão 2026.10.23.1 publicado em 23/10/2026: corrida com capa revisada, bota da perna dobrada visível e ombreira preservada. Android, Windows e Linux recebem três pacotes cumulativos assinados, com 1.236.616 bytes por plataforma, compatíveis com os instaladores existentes. A versão Web usa o pacote 8cf9054ca82e. Inclui também as alterações pendentes da interface da wiki e os dados sincronizados do jogo.

Conteúdo 8 da versão 2026.10.23.1: botão do ranking na lateral do pódio, círculos dos sinais de missão junto aos NPCs e quadro da missão principal alinhado ao HUD. Três pacotes cumulativos assinados, 1.246.744 bytes por plataforma; Web bd9f6e7d6867. Conferido no Godot em PC, celular e tela dividida, com texto longo e balão de fala.

Conteúdo 9 da versão 2026.10.23.1, em 24/10/2026: novas poses de garras da Medusa nas quatro direções, efeitos atrás da silhueta e retorno à guarda mais rápido; chat no rodapé com margens e proteção contra sobreposição em telas pequenas; marcadores de missão centralizados acima da cabeça, com `?` e `!` alinhados no círculo. Android, Windows e Linux recebem três pacotes cumulativos assinados de 2.250.540 bytes por plataforma, preservando os instaladores e saves existentes. A exportação Web `f1dcc714658f` contém o mesmo código de jogo, baseado em `77905eb2f`. Assinaturas, hashes e montagem dos pacotes reais foram conferidos em save isolado.

Conteúdo 10 da versão 2026.10.23.1, em 24/10/2026: combate mais fluido. O toque enfileirado no fim do combo recomeça no primeiro golpe, o jogador anda a 40% da velocidade durante golpes de espada e lança, a esquiva corta o golpe a partir da metade e a recarga do dash cai de 0,6 s para 0,35 s. Espada de duas mãos e maça ativam o bônus no último golpe do combo. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `d042556aa981` contém o mesmo código de jogo, baseado em `c99db38a4`.

Conteúdo 11 da versão 2026.10.23.1, em 24/10/2026: combate com mais peso. O acerto corpo a corpo congela o jogo por 35 a 65 ms e treme a câmera, o inimigo clareia ao receber dano, cada golpe de espada e lança avança um passo curto, e ataque e esquiva pedidos até 150 ms cedo demais ficam guardados. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `b2fad8bf64b7` contém o mesmo código de jogo, baseado em `b306d7429
`.

Conteúdo 12 da versão 2026.10.23.1, em 24/10/2026: chat global disponível em todos os mapas, com sessão e histórico preservados ao viajar, preferências separadas para P1/P2 e presença visual restrita à cidade. Migração do servidor aplicada; testes entre cidade, fenda e floresta, revisão no celular e montagem real do pacote aprovados. Android, Windows e Linux recebem três pacotes cumulativos assinados de 2289928 bytes por plataforma, preservando os instaladores e saves existentes. Exportação Web `89d5d3d0137c`, baseada em `e42cad03c`.

Conteúdo 13 da versão 2026.10.23.1, em 24/10/2026: armas e escudos no nível 5 sobem de raridade na bigorna (ouro, moeda de forja e um bônus aleatório da categoria), o toque no slot vazio da bigorna passa por arma, escudo e armaduras, e o botão do chat mostra o contador de mensagens não lidas. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `9b3b09be2fac` contém o mesmo código de jogo, baseado em `49eeb92c5
`.

Conteúdo 14 da versão 2026.10.23.1, em 24/10/2026: botão APELIDO na tela de pausa, com campo de até 12 letras e teclado virtual no controle; o novo apelido é gravado no personagem e passa a valer no chat, no mapa e no ranking. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `d46f39e323a9` contém o mesmo código de jogo, baseado em `8c9017ce2
`.

Conteúdo 15 da versão 2026.10.23.1, em 24/10/2026: cidade, floresta e praia mostram os outros jogadores online (presença por mapa) e o chat global passa a usar um servidor próprio por WebSocket, com até 24 avatares por mapa, atualização a 4 vezes por segundo e canal reserva pelo banco quando o servidor está fora do ar. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `c87b22018d49` contém o mesmo código de jogo, baseado em `bb3650751
`.

Conteúdo 16 da versão 2026.10.23.1, em 24/10/2026: os outros jogadores online aparecem atacando (espada, espada de duas mãos, machado e lança), disparando o arco, esquivando e pescando, e o painel do chat informa se o canal usado é o servidor próprio ou o canal reserva. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `b2583dc243c7` contém o mesmo código de jogo, baseado em `10285a4d9
`.

Conteúdo 17 da versão 2026.10.23.1, em 24/10/2026: retirada da encomenda direto com o Ivo, com ícone da arma sobre ele quando está pronta e a bigorna abrindo na arma pedida; o personagem não avança mais ao atacar; e camadas de armadura Raven alinhadas nos conjuntos Carrasco, Cavaleiro Rubro e Cavalheiro. Android, Windows e Linux recebem três pacotes cumulativos assinados (4.0 MiB por plataforma), preservando os instaladores e saves existentes. A exportação Web `a59802e8a71e` contém o mesmo código de jogo, baseado em `1709329f2
`.

Conteúdo 18 da versão 2026.10.23.1, em 24/10/2026: o jogo reconhece celulares e tablets no navegador e liga os controles de toque, e a página `/jogar/` passa a ser um app instalável (iPhone, iPad e Android) com ícone, tela cheia, área segura do iPhone, service worker com a casca em cache e botão TOCAR PARA JOGAR. A página Jogar da wiki ganhou o guia de instalação. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `d4bfa6c138e1` contém o mesmo código de jogo, baseado em `d8fd0843a
`.

Conteúdo 19 da versão 2026.10.23.1, em 24/10/2026: ajustes do jogo no iPhone. O X redondo das janelas fica maior e afastado das bordas no toque, o mapa ganhou um botão VOLTAR embaixo, o navegador do celular passa a jogar a 30 quadros por segundo (resolução interna limitada a 2x) e a página aceita `?desempenho`, que mostra FPS, memória de vídeo e as maiores texturas. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `7df52f88533f` contém o mesmo código de jogo, baseado em `ad10b4c7c
`.

Conteúdo 20 da versão 2026.10.23.1, em 24/10/2026: poções por estação. Cada estação tem duas poções e o caldeirão só faz as da época (primavera: cura e fôlego; verão: força e velocidade; outono: pedra e vampírica). O inverno, sem plantio, ganha as poções de regeneração (truta e tainha) e de precisão (linguado e sargo), feitas com peixes. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `3071e981235e` contém o mesmo código de jogo, baseado em `fbfec9725
`.

Conteúdo 21 da versão 2026.10.23.1, em 24/10/2026: canal reserva mais rápido. Se o servidor próprio de presença e chat estiver fora do ar, o jogo passa ao chat do Supabase depois de duas tentativas (cerca de 10 segundos) e volta ao servidor próprio sozinho quando ele reaparece. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `673f8defff47` contém o mesmo código de jogo, baseado em `75aa51c25
`.

Conteúdo 22 da versão 2026.10.23.1, em 24/10/2026: a tela inicial ganha a logo do AlgoLand e o layout ajustado ao novo desenho, com as ferramentas de revisão do alinhamento das armaduras Raven. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `6e96c545faa5` contém o mesmo código de jogo, baseado em `c2bedb3fe

Conteúdo 25 da versão 2026.10.23.1, em 25/10/2026: no celular, tocar num campo de texto (chat, apelido, nome do personagem) abre o teclado do próprio jogo, com a mensagem digitada à vista e pontuação no chat; a letra X do teclado deixa de virar o botão de fechar.

Conteúdo 26 da versão 2026.10.23.1 (27 no Android, com o pacote da interface regerado), em 25/10/2026: no celular, o chat, o apelido e o nome do personagem voltam a usar o teclado do sistema, agora com uma barra no alto da tela que mostra o texto digitado; o teclado do jogo fica só para o controle.

Conteúdo 28 da versão 2026.10.23.1, em 25/10/2026: a animação de colher fica 40% mais rápida e o chat rola até o fim ao enviar uma mensagem.

Conteúdo 29 da versão 2026.10.23.1, em 25/10/2026: dez andares novos (12 a 21) com mapas maiores e barra de progresso crescente; chefes com ataques mais rápidos; aparar cancela o golpe em andamento; buffs comprados aparecem acima da barra de itens, com dica no mouse e no toque; cinto de poções no canto direito no PC; animação de encher o regador; portal dos mímicos mais frequente; moeda de forja de todo guardião; bancos da taverna não prendem mais o jogador.

Conteúdo 30 da versão 2026.10.23.1, em 25/10/2026: a fonte sai da praça da vila e o pódio do ranking passa para o centro dela.
`.

Conteúdo 31 da versão 2026.10.23.1, em 25/10/2026: pesca até o nível99 e 54 espécies, aviso de captura compacto, sete conjuntos novos (dez no total), receitas, bônus e progressão da fabricação. Corrida dos novos conjuntos revisada, incluindo pernas, base dos elmos, alinhamento e cabeça estável de costas; cabo das espadas à frente do capacete. Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 26,7 MiB por plataforma, e Web reexportada a partir de f9d42411e. Preserva saves, base do aplicativo e alterações anteriores.

Conteúdo 32 da versão 2026.10.23.1, em 25/10/2026: mercado entre jogadores pago em Brasas (aba MERCADO no mural da vila, com compra, venda de itens e partes de pilhas, anúncios de 24 ou 48 horas, correio de entregas e aviso no HUD) e cinco montantes de duas mãos com progressão do comum ao lendário. Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 29,8 MiB por plataforma, e Web reexportada a partir de 1d70df425. Preserva saves, base do aplicativo e alterações anteriores.

Conteúdo 34 da versão 2026.10.23.1, em 25/10/2026: arco mais fraco (0,70 s por flecha e mira automática até 200 px) e sem encantamentos; arcos já encantados perdem o efeito e o lendário traz outro afixo no lugar. Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 34,0 MiB por plataforma, e Web reexportada a partir de 21ab12428 (o conteúdo 33 foi gerado e substituído antes de publicar). Preserva saves, base do aplicativo e alterações anteriores.

Conteúdo 35 da versão 2026.10.23.1, em 26/10/2026: no mercado, a aba VENDER agora aceita digitar o preço e a quantidade (campos numéricos entre os botões −10/−1/+1/+10, teclado numérico no celular, valor ajustado aos limites e ao tamanho da pilha). Só essa correção: pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 29,8 MiB por plataforma, e Web reexportada a partir de bc97301f8, gerados de uma cópia limpa do repositório (o conteúdo 34 tinha levado junto um teste não commitado do modo cartoon do F3). Preserva saves, base do aplicativo e alterações anteriores.

Conteúdo 36 da versão 2026.10.23.1, em 26/10/2026: correção urgente. O conteúdo 35 deixava o personagem invisível (o script do jogador fazia preload de um arquivo de teste que não entrou no pacote). O jogador agora só carrega esse visual de teste se ele existir; todos os 500 scripts e cenas do pacote foram carregados sem falha e o prólogo de um jogador novo foi conferido. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada a partir de d5140e2ba.

Conteúdo 37 da versão 2026.10.23.1, em 26/10/2026: checkpoints de 5 em 5 andares escolhidos no mapa do portal (marcos azuis nos andares 5, 10, 15... já alcançados). Começar adiantado dá 40% do ouro que a partida renderia desde o andar 1 (ex.: andar 50 = 27.285 de ouro). A escolha não exige mais a Mística. Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 29.9 MiB por plataforma, e Web reexportada a partir de 2c694ddea; cópia limpa conferida (500 scripts/cenas carregados, prólogo de jogador novo e entrada no andar 50).

Conteúdo 38 da versão 2026.10.23.1, em 26/10/2026: transferir o save entre aparelhos (PC, celular e navegador). Na tela inicial, TRANSFERIR SAVE > ENVIAR gera um código de 6 letras válido por 15 minutos e de uso único; no outro aparelho, digitar o código e RECEBER traz o mundo solo inteiro, com a mesma identidade no ranking e no mercado (o save anterior fica guardado em backups). Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 29,9 MiB por plataforma, e Web reexportada a partir de 086212efd; cópia limpa conferida (501 scripts/cenas, prólogo de jogador novo, envio e recebimento pelo servidor).

Conteúdo 40 da versão 2026.10.23.1, em 27/10/2026: personagem 3D como visual padrão (versão de teste). Saves antigos ganham peças 3D equivalentes à roupa e às cores do Raven e um aviso único com AJUSTAR AGORA/DEPOIS; MENU DE PAUSA > EDITAR VISUAL muda penteado, roupas, pele, cor do cabelo e olhos a qualquer momento. Armaduras continuam valendo, ainda sem desenho no 3D. Inclui a correção de retentativas da transferência de save (conteúdo 39, não publicado separadamente). Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 69,2 MiB por plataforma, e Web reexportada a partir de e31fb52b3; cópia limpa conferida (532 scripts/cenas, prólogo de jogador novo em 3D e conversão de save antigo).

Conteúdo 41 da versão 2026.10.23.1, em 27/10/2026: penteados masculinos no personagem 3D. O padrão do conteúdo 40 era o chanel feminino e todos os saves convertidos ficaram com ele; agora voltam sozinhos ao penteado original (Bagunçado). Novos: Raspado e Espetado; o Chanel continua disponível. Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 69,2 MiB por plataforma, e Web reexportada a partir de d57a2d41d.

Conteúdo 42 da versão 2026.10.23.1, em 26/10/2026: completa a migração do jogador para o modelo 3D na mochila, retrato inicial, carregamento, cama/enfermaria, lobby e pódio; corrige queda da introdução e petrificação. Perfil físico próprio com apoio dos pés, cápsula de dano acompanhando o corpo e contatos da arma projetados nas oito direções, incluindo os três golpes da lança. Flechas saem com desenho/colisão alinhados e verificam o trecho percorrido para não saltar alvos pequenos ou paredes finas. Pacotes cumulativos assinados para Android, Windows e Linux (15 áreas, cerca de 69,2 MiB por plataforma) e Web reexportada. Preserva a base 2026.10.23.1 e os saves. Validação: preservação de inventário/P2/checkpoint, empacotador, 1.608 verificações de colisão e 21 andares; inclui as alterações locais posteriores ao commit 0fe3f66be.

Conteúdo 43 da versão 2026.10.23.1, em 27/10/2026: corrige dano de contato sem encostar no slime (cápsula do jogador limitada à cabeça e aos pés, contato circular do slime) e permite atingir o corpo visível do slime com a espada de uma mão. Na pesca, mochila sem casas vazias não invalida o ponto de água: peixes da mesma espécie/qualidade continuam empilhando; captura sem espaço avisa MOCHILA CHEIA. Pacotes cumulativos assinados para Android, Windows e Linux e versão Web reexportada, preservando a base e os saves. Validação: 1.608 verificações gerais de colisão, 57 de contato/combos contra slime, 14 de pesca repetida, lançamento, cooperativo, preservação de inventário e empacotador; contato e pesca repetida também testados nos pacotes exportados.

Conteúdo 44 da versão 2026.10.23.1, em 27/10/2026: ajustes do personagem 3D feitos depois do conteúdo 41 (colisões do herói 3D; personagem 3D no ranking, pódio, lobby, cama, mochila e tela de carregamento; queda da introdução; petrificação, flecha e inimigos). Pacotes cumulativos assinados para Android/Windows/Linux, 15 áreas e 69,2 MiB por plataforma, e Web reexportada a partir de be6f36e1b; cópia limpa conferida (535 scripts/cenas, prólogo de jogador novo em 3D e conversão de save antigo).

Conteúdo 45 da versão 2026.10.23.1, em 27/10/2026: rosto, cabelo, roupas e calçados com texturas em pixel art, rosto com proporções ajustadas e renderização 3D em 160×160 com sombras em blocos e contorno fino. Novo comando de movimento cancela o golpe corpo a corpo; manter a direção já segurada ao iniciar o ataque preserva o golpe. Android, Windows e Linux recebem 15 pacotes cumulativos assinados por plataforma; Web 0cb25bc3df16. Preserva instaladores e saves. Fontes: 97564e015.

Conteúdo 46 da versão 2026.10.23.1, em 27/10/2026: conjuntos Mordomo, Carrasco e Cavaleiro Rubro no modelo 3D, com quatro peças independentes e combinações entre conjuntos; atributos base do Mordomo ajustados aos demais comuns. Melhoria na bigorna altera a aura da arma, e a raridade define o material. Arco deitado no centro das costas com a aljava, corrida normal e arco na mão apenas durante o disparo. Tintura sincronizada entre criação, edição e jogo; penteado de pontas laterais removido das opções, com compatibilidade dos saves. Android, Windows e Linux recebem 15 pacotes cumulativos assinados por plataforma (74,36 MiB); Web 67bb544f8df6. Fonte: 2fe393315. Preserva instaladores e saves. Validação: saves de menu/inventário, seis testes do empacotador, 48 assinaturas e execução dos pacotes exportados em cópia isolada; revisões dos conjuntos, brilho, arco e tintura no Godot.

Conteúdo 47 da versão 2026.10.23.1, em 27/10/2026: precipitação econômica ativada automaticamente no Android, compondo chuva e neve em uma passagem e evitando luzes dinâmicas nessas camadas. Mantém sprites, animação, fades e tom noturno; ao retomar o aplicativo, avança diretamente ao quadro atual. Preserva raios, saves e instaladores. Android, Windows e Linux recebem 15 pacotes cumulativos assinados por plataforma; Web e5084b55c0a6. Fonte: 1a1132391 (identificadores: 569947f83). Validação: 188 verificações de clima/renderização, saves de menu/inventário, seis testes do empacotador, 60 assinaturas/hashes e 54 verificações sobre os pacotes exportados reais. Desempenho em aparelho Android físico ainda depende de confirmação dos jogadores.

Conteúdo 48 da base 2026.10.23.1 (27/10/2026): criação reorganizada com prévia, abas e cores; tintura com material próprio e branco explícito, mantendo compatibilidade dos saves. Cabeça, rosto, pescoço, proporções e filtro preservados da versão anterior; alterações limitadas aos cabelos. Android usa carga de cenas na thread principal após desenhar o painel para contornar espera indefinida; patrulhas distantes e separação de mobs com menor custo. Pacotes assinados para Android, Windows e Linux, com Web própria. Minijogo de pesca maior no toque; encomendas compatíveis com habilidade e vara de cada jogador, fixas por dia e com entrega na mochila correta. Fonte `ec1b45588`.

Conteúdo 49 da base 2026.10.23.1 (27/10/2026): a fisgada avalia o aperto antes de avançar o ponteiro, usando a posição já exibida e evitando falsos erros em quadros demorados. Preserva a dificuldade, zonas, recompensas e tamanho do puzzle. Regressão com190 verificações (P1/P2, toque curto, bordas, zonas estreitas e deltas de15–120FPS):117 falhas no código anterior e zero após a correção, com revisão gráfica no Godot. Saves/inventários e seis testes do empacotador aprovados. Pacotes assinados para Android, Windows e Linux e Web própria. Fonte `244581267`.

Conteúdo 50 da base 2026.10.23.1 (27/10/2026): meta Pescar 5 linguados substituída por Pescar 3 sardinhas (50 Brasas), contando histórico anterior e preservando resgates. Missão final do Limiar substituída por A Última Vigília: vencer três andares após aceitar, 40 Brasas, mantendo benefício diário de energia e conclusões anteriores. Recuperação de posições externas na cidade, fazenda, praia e floresta, incluindo saves antigos e cooperativo em mapas separados. Verificações:70 de limites,32 de jornada,8 de pesca,32 de save/inventário,20 de continuação e seis testes do empacotador; nenhuma asserção falhou. A suíte de continuação ainda registra um erro de ciclo de vida preexistente na mobília de interiores durante troca de cenas. Revisão gráfica no Godot; sem dispositivo Android físico disponível. Fonte `5d122152e`.

Conteúdo 51 da base 2026.10.23.1 (27/10/2026): pacotes nativos limitados a 8 MiB para reduzir falhas por conexão lenta e o prazo de 120 segundos por arquivo do aplicativo existente. O pacote compartilhado de72,36MiB foi dividido em dez PCKs completos assinados;24 pacotes por plataforma. Compatível com os APKs já instalados, sem alteração no núcleo ou saves; conteúdo do jogo idêntico ao50 e Web preservada. O download original funcionou no motor local; a mensagem genérica relatada no Android não permitiu confirmar a causa no dispositivo. Oito testes de empacotamento e prova no motor de download, retomada dos arquivos íntegros, dependência entre partes antes dos autoloads, adulteração e rejeição de instalação parcial/corrompida. Fonte `b18554e9f`.

Conteúdo 52 da base 2026.10.23.1 (28/10/2026): duelo online jogador contra jogador pelo menu de pausa, com lista de salas, senha opcional, pronto/começar, melhor de 3 numa arena sem ondas limitada à área de terra; quem apanha resolve defesa, aparo e dano no próprio jogo (dano entre jogadores a 60%), sem enfermaria nem perdas. Personagem 3D em modo pixel por padrão (grade 2×, luz dura, contorno e rampas de cor), com pele, 15 roupas e cabelos 3D pintados em pixel art no próprio modelo; escudo legível em todas as direções. Penteados: Bagunçado, Raspado, Cacheado e o novo Longo liso; Chanel, Longo e Espetado retirados (saves migram para o Bagunçado). Testes de ponta a ponta do duelo com servidor local e dois jogos, inclusive com 150 ms de atraso simulado; testes do servidor do lobby aprovados; sem dispositivo Android físico. Exige o servidor do lobby atualizado. Fonte `4dc54f738`.

Conteúdo 53 da base 2026.10.23.1 (28/10/2026): restaura camisa, calça e calçado escolhidos na entrada normal; o conteúdo 52 ativava somente o cabelo e deixava aparecer a roupa base do corpo. Corrige também os padrões de aparência no duelo. Android, Windows e Linux; somente três scripts compilados diferem do conteúdo 52. Migração visual e preservação de inventário com zero falhas de asserção em save isolado, oito testes do empacotador aprovados e renderização conferida no Godot. A suíte visual registra erros de ciclo de vida 3D e recursos no encerramento. Sem dispositivo Android físico. Fonte `5ef17d6a3`.

Conteúdo 54 da base 2026.10.23.1 (28/10/2026): corrige a cabeça presa na vista frontal nos jogadores online, na tela de carregamento e nas prévias. A direção acompanha a rotação efetiva do modelo na atualização final do esqueleto, mesmo com o processamento automático do herói desligado; ignora sinais após sair da árvore. Somente o script da cabeça difere do conteúdo 53, sem mudanças de desempenho ou de saves. Regressão reproduzida antes (21 falhas) e validada depois (52 verificações, zero falhas); revisão visual no Godot, migração de aparência e preservação do inventário com zero falhas de asserção, oito testes do empacotador aprovados. A suíte completa ainda registra recursos pendentes no encerramento; sem dispositivo Android físico. Fonte `b0e0ba6f7`.

Conteúdo 55 da base 2026.10.23.1 (28/10/2026): remove as travadas ao trocar de mapa no Android causadas pelo mapeamento pixel do personagem, agora salvo pronto (criação do personagem 3D de 372 para 77 ms no PC, com assinatura da malha de origem e cálculo de reserva). Duelo online: conexão sem o atraso de Nagle, estado a 20 atualizações por segundo e ping visível na sala e na arena. Mantém as correções dos conteúdos 53 e 54. Duelo testado de ponta a ponta com servidor local e dois jogos; medição de quadros na fazenda e na arena (60 fps, pior quadro 21 ms no PC); sem dispositivo Android físico. O ping exige o servidor do lobby atualizado. Fonte `6916f3762`.

Conteúdo 56 da base 2026.10.23.1 (28/10/2026): o duelo online passa a usar um servidor próprio no Fly.io em São Paulo (`wss://algoland-duelo.fly.dev`), separado do lobby e do chat, que continuam como antes. A ida e volta até o servidor caiu de cerca de 500 ms (Tailscale Funnel) para cerca de 20 ms. O endereço do duelo fica fora da configuração lida por autoload, para poder ser trocado por patch. Duelo testado de ponta a ponta com dois jogos contra o servidor publicado (salas, golpe real, melhor de 3 e volta); sem dispositivo Android físico. Fonte `80b3be0bf`.

Conteúdo 57 da base 2026.10.23.1 (28/10/2026): presença nos mapas e chat global passam para o mesmo servidor do Fly.io em São Paulo do duelo (`wss://algoland-duelo.fly.dev`), com ida e volta de cerca de 20 ms no lugar de cerca de 500 ms; o online deixa de depender do computador do desenvolvedor. O endereço fica fora da configuração lida por autoload, para poder ser trocado por patch; a reserva pelo Supabase continua. Painel administrativo apenas na rede privada da hospedagem, por túnel. Verificado: dois clientes no mesmo mapa se enxergam em 50 ms no servidor publicado, painel inacessível pela internet e testes do servidor aprovados. Fonte `e20a6b4e3`.

Conteúdo 58 da base 2026.10.23.1 (28/10/2026): pesca com captura visível no personagem 3D: briga com o corpo puxando durante o minijogo, puxão que tira o peixe da água, peixe voando preso à linha e mostrado ao lado do rosto em qualquer direção; mecânica, recompensas e minijogo inalterados. Duelo online: o adversário é desenhado 100 ms no passado entre dois pacotes, sem os trancos causados por irregularidade da rede; aparo perfeito atordoa quem atacou por 1 segundo, com estrelas visíveis aos dois jogadores. Testado com dois jogos contra o servidor de São Paulo (aparo, atordoamento e recuperação; passo mínimo do adversário de 0,23 para 1,0 px por quadro) e captura de pesca em oito direções; sem dispositivo Android físico. Fonte `85279480a`.

Conteúdo 59 da base 2026.10.23.1 (28/10/2026): duelo online em ringue próprio de 31×18 tiles, cercado com a cerca da vila e um anel de árvores que acompanha as quatro estações, com colisão rente ao desenho; números de dano decididos por quem apanha, em amarelo para o dano causado e vermelho para o dano recebido, inclusive bloqueio e aparo. Cidade, floresta e praia sem trancos nos outros jogadores: posição enviada dez vezes por segundo e avatar interpolado com atraso no relógio do servidor. O peixe pescado por outro jogador aparece sobre ele, com nome na cor da raridade ou da qualidade (exige o servidor online atualizado). Verificado com dois jogos: ringue nas quatro estações e colisão, vinte números com a cor certa em cada cenário, avatar na velocidade real (passo típico 1,95 contra 2,54 px por quadro antes) e peixe visível ao outro jogador; testes do servidor aprovados. Fonte `6077b0e0b
`.

Conteúdo 60 da base 2026.10.23.1 (28/10/2026): acesso ao duelo por ícone de espadas cruzadas no HUD de PC e toque; lobby com prévias dos personagens e seis slots de equipamentos para inspeção de nome, nível e raridade. Cartões se empilham em telas estreitas e ações permanecem visíveis. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `c070e24f3`. Validação: duelo local com dois jogos, revisão gráfica isolada, preservação de mochila sem falhas, oito testes de pacotes e 99 verificações da wiki sem erros.

Conteúdo 62 da base 2026.10.23.1 (29/10/2026): correções de equilíbrio e salvamento: o roubo de vida passa a curar 1 de vida por mob abatido, a capacidade do regador sobe com o nível (20, 30 e 40 regas), as plantas crescem um dia mais rápido e o fim do dia é gravado antes de dormir, para que um save nesse intervalo não volte às 6h do mesmo dia. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `a6e78e716`. Validação: 560 scripts, cenas e recursos carregados sem falhas em cópia limpa com saves isolados; não houve teste de jogabilidade nem em aparelho.

Conteúdo 63 da base 2026.10.23.1 (29/10/2026): colher uma planta no Android sem travar (salvamento adiado para depois da ação), brotos de árvore mais frequentes no entulho da fazenda (mais fibra) e aviso quando o golpe não encontra árvore ou pedra no alcance. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `a3b10684a`. Validação: 566 scripts, cenas e recursos carregados sem falhas em cópia limpa com saves isolados; não houve teste de jogabilidade nem em aparelho.

Conteúdo 1 da base 2026.10.28.1 (29/10/2026): coop online para até 4 jogadores (saguão com as quatro vagas e personagens, início solo pelo anfitrião, inimigos, vida e dano proporcionais ao grupo), painel do grupo com a vida de cada jogador e barras de vida/dano/chefe também para os convidados. Exige o servidor de salas atualizado. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `0d57ad2ba`. Validação: scripts carregados sem falhas e teste do servidor; não houve teste de jogabilidade nem em aparelho.

Conteúdo 2 da base 2026.10.28.1 (29/10/2026): saguão do coop online redesenhado (quatro vagas com os personagens, lista de salas com vagas coloridas, sem rolagem) e o cliente volta a conectar com o servidor de salas antigo em salas de dois. Servidor de salas de quatro jogadores no ar no Fly. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `a3e5d2c23`. Validação: scripts carregados e capturas da tela em três tamanhos; sem teste de partida em rede nem em aparelho.

Conteúdo 3 da base 2026.10.28.1 (29/10/2026): painel do grupo do coop online menor e sem fundo; o convidado passa a receber o Orion para comprar após o andar e marca PRONTO, e o anfitrião só avança com todos prontos; reanimar aliado segurando interagir (volta com 20% de vida); tela do mapa dos andares sem rolagem, com os botões de sala lado a lado. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `788792514`. Validação: scripts carregados e capturas da tela do mapa; sem teste de partida em rede nem em aparelho.

Conteúdo 4 da base 2026.10.28.1 (29/10/2026): coop online com drops individuais, Brasas ao encerrar, reanimar aliado com animacao, efeitos e dano em area dos chefes para todos, colisao entre jogadores e inimigos que nao empilham no jogador; duelo com relogio pausado, parry sem intangibilidade e icone menor; kit inicial garantido para todos (excedente vai ao bau da fazenda); casa da fazenda 2D de volta; rosto pintado novo para todos os penteados; missoes com lore nova e pombo a cada 4 dias. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `03d55d5eb`.

Conteúdo 5 da base 2026.10.28.1 (29/10/2026): ao encerrar o coop online (inclusive sala iniciada sozinho) quem caiu volta a cidade com a vida cheia, em vez de 1 de vida. Pacotes cumulativos assinados para Android/Windows/Linux e Web reexportada. Fonte `73bfa698d`.
