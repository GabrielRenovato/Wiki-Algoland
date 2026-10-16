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

- `src/dados.js`: números do jogo (plantas, poções, armas, chefes...), com o arquivo de origem do código ao lado de cada bloco.
  Se o balanceamento mudar no jogo, atualize aqui.
- `src/sprites.js`: qual folha, tamanho do quadro e quadros animados de cada sprite.
- `src/componentes/Sprite.jsx`: recorta e anima o quadro direto da folha (fundo CSS), sem gerar imagens novas.
- `src/paginas/`: o texto das páginas. A lista do menu e da busca fica em `src/App.jsx`.

## Licença da arte

Os sprites pertencem aos pacotes usados pelo jogo (Mana Seed, Farm RPG, PixelLab e outros). Só as 64 folhas que a wiki
usa ficam versionadas em `public/sprites`, para o build do Netlify funcionar sem o jogo. A licença do Mana Seed proíbe usar a arte junto com código gerado por IA,
e esta wiki foi escrita com IA: não publique a wiki com essas folhas antes de resolver isso.

## Publicar no Netlify

`netlify.toml` já define o build (`npm run build`, pasta `dist`, Node 20). As rotas usam `#`, então não há
redirecionamento a configurar. Sem a pasta do jogo ao lado (caso do Netlify), o build usa o que já estiver em
`public/sprites`.

- **Arrastar e soltar:** rode `npm run build` aqui e solte a pasta `dist/` em app.netlify.com/drop.
- **Pelo Git:** em app.netlify.com, "Add new site" > "Import an existing project" > GitHub > `Wiki-Algoland`.
  O `netlify.toml` já preenche o build; não mude o diretório base (deixe vazio) nem a pasta de publicação (`dist`).
