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
