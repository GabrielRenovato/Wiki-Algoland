# AlgoLand Wiki

Wiki do jogo AlgoLand em React (Vite), separada do projeto do jogo.

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera dist/ (abre em qualquer pasta, base relativa)
```

`npm run dev` e `npm run build` copiam antes as folhas de sprite do jogo para `public/sprites`
(`scripts/copiar-sprites.mjs`). O jogo é procurado em `../AlgoLand`; para outro caminho use `ALGOLAND=/caminho npm run dev`.

## Onde mexer

- `src/dados-jogo.json`: catálogo extraído diretamente do código com `scripts/sincronizar-dados.py` (armas, receitas, mapas/guardiões, 48 peixes e dez pratos), com o commit de origem. O extrator usa saves isolados; com `--check`, compara as tabelas sem regravá-las.
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

Conteúdo 21 da versão 2026.10.23.1, em 24/10/2026: canal reserva mais rápido. Se o servidor próprio de presença e chat estiver fora do ar, o jogo passa ao chat do Supabase depois de duas tentativas (cerca de 10 segundos) e volta ao servidor próprio sozinho quando ele reaparece. Android, Windows e Linux recebem três pacotes cumulativos assinados, preservando os instaladores e saves existentes. A exportação Web `673f8defff47` contém o mesmo código de jogo, baseado em `75aa51c25`.
