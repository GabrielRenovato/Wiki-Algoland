import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Passos } from "../componentes/ui.jsx";
import { HEROI, PORTAL } from "../sprites.js";

// Os arquivos ficam no Release mais recente do repositório: "latest/download" sempre aponta para a versão nova,
// desde que os nomes dos arquivos se mantenham.
const RELEASES = "https://github.com/GabrielRenovato/Wiki-Algoland/releases";
export const BAIXAR = {
  windows: `${RELEASES}/latest/download/AlgoLand-Windows-x86_64.zip`,
  linux: `${RELEASES}/latest/download/AlgoLand-Linux-x86_64.tar.gz`,
  android: `${RELEASES}/latest/download/AlgoLand-Android-arm64.apk`,
};

const PLATAFORMAS = [
  { id: "windows", nome: "Windows", arquivo: "AlgoLand-Windows-x86_64.zip", tamanho: "272 MB",
    passos: ["Baixe e extraia o .zip.", "Abra o AlgoLand.exe.", "Se o Windows avisar \"aplicativo não reconhecido\", clique em Mais informações → Executar assim mesmo."] },
  { id: "linux", nome: "Linux", arquivo: "AlgoLand-Linux-x86_64.tar.gz", tamanho: "262 MB",
    passos: ["Baixe e extraia o .tar.gz.", "Dê permissão de execução: chmod +x AlgoLand/AlgoLand.x86_64", "Rode ./AlgoLand/AlgoLand.x86_64"] },
  { id: "android", nome: "Android", arquivo: "AlgoLand-Android-arm64.apk", tamanho: "283 MB",
    passos: ["Baixe o APK e abra o arquivo pela pasta Downloads.", "Permita instalar de fontes desconhecidas quando o Android pedir.", "Abra o AlgoLand: os controles de toque aparecem sozinhos."] },
];

export function Download() {
  return (
    <>
      <Titulo sub="Release v2026.10.23.1 · Windows e Linux x86_64; Android arm64.">Baixar o jogo</Titulo>
      <Caixa tipo="nota" titulo="Versões disponíveis">Base v2026.10.23.1 para Windows, Linux e Android, com conteúdo 60 disponível pelo atualizador: acesso ao PvP por espadas cruzadas, lobby com personagem e equipamentos, mercado e as melhorias acumuladas. Esta versão reinicia a progressão de todos os jogadores uma única vez, preservando as opções. Quem usa a versão anterior precisa instalar o aplicativo novo. Se você já usa essa base, não precisa reinstalar nem recomeçar a partida. Instale esta versão uma vez: as próximas atualizações de conteúdo compatíveis baixarão só os pacotes alterados. Durante uma atualização pendente, aguarde o download; se falhar, tente novamente ou saia. Ao concluir, feche e abra o jogo para ativar. No Android, o botão baixa o APK diretamente: abra pela pasta Downloads para instalar por cima da versão anterior. A versão Web também recebeu esta atualização; recarregue a página.</Caixa>
      <p>Quer testar sem instalar? <a href="#/jogar">Jogue no navegador.</a></p>
      <Secao>
        <div className="downloads">
          {PLATAFORMAS.map((p) => (
            <article key={p.id} className="download">
              <h2>{p.nome}</h2>
              <a className="botao-baixar" href={BAIXAR[p.id]}>Baixar {p.arquivo}</a>
              <p className="etiqueta">{p.tamanho}</p>
              <Passos itens={p.passos} />
            </article>
          ))}
        </div>
        <p className="etiqueta">
          Todas as versões ficam em <a href={RELEASES}>{RELEASES.replace("https://", "")}</a>.
        </p>
      </Secao>
      <Secao titulo="Requisitos">
        <ul className="lista">
          <li><b>PC:</b> Windows 10 ou mais novo, ou Linux 64 bits, com placa de vídeo que suporte OpenGL 3.3 (o jogo usa o modo de compatibilidade do Godot).</li>
          <li><b>Android:</b> celular 64 bits (arm64), Android 7 ou mais novo.</li>
          <li><b>Co-op local:</b> dois controles no PC. Segure START por 1 segundo no segundo controle.</li>
        </ul>
        <Caixa tipo="aviso" titulo="Versão de desenvolvimento">
          O jogo ainda está em construção: pode ter bugs e o save de uma versão pode não abrir na seguinte.
        </Caixa>
      </Secao>
      <div className="lado-a-lado">
        <Sprite s={HEROI} escala={3} titulo="Herói" />
        <Sprite s={PORTAL} escala={2} titulo="Portal" />
      </div>
    </>
  );
}
