import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Passos } from "../componentes/ui.jsx";
import { HEROI, PORTAL } from "../sprites.js";

// Os arquivos ficam no Release mais recente do repositório: "latest/download" sempre aponta para a versão nova,
// desde que os nomes dos arquivos se mantenham.
const RELEASES = "https://github.com/GabrielRenovato/Wiki-Algoland/releases";
export const BAIXAR = {
  windows: `${RELEASES}/latest/download/AlgoLand-Windows-x86_64.zip`,
  linux: `${RELEASES}/latest/download/AlgoLand-Linux-x86_64.tar.gz`,
  android: `${RELEASES}/latest/download/AlgoLand-Android-arm64.zip`,
};

const PLATAFORMAS = [
  { id: "windows", nome: "Windows", arquivo: "AlgoLand-Windows-x86_64.zip", tamanho: "270 MB",
    passos: ["Baixe e extraia o .zip.", "Abra o AlgoLand.exe.", "Se o Windows avisar \"aplicativo não reconhecido\", clique em Mais informações → Executar assim mesmo."] },
  { id: "linux", nome: "Linux", arquivo: "AlgoLand-Linux-x86_64.tar.gz", tamanho: "260 MB",
    passos: ["Baixe e extraia o .tar.gz.", "Dê permissão de execução: chmod +x AlgoLand/AlgoLand.x86_64", "Rode ./AlgoLand/AlgoLand.x86_64"] },
  { id: "android", nome: "Android", arquivo: "AlgoLand-Android-arm64.zip", tamanho: "262 MB",
    passos: ["Baixe e extraia o ZIP no celular, depois abra o APK.", "Permita instalar de fontes desconhecidas quando o Android pedir.", "Abra o AlgoLand: os controles de toque aparecem sozinhos."] },
];

export function Download() {
  return (
    <>
      <Titulo sub="Release v2026.10.22.5 · Windows e Linux x86_64; Android arm64.">Baixar o jogo</Titulo>
      <Caixa tipo="nota" titulo="Versões disponíveis">Os arquivos abaixo são do Release v2026.10.22.5, com a floresta entre a vila e a fazenda, animais selvagens, minimapa e estações próprias nos andares, e a corrida do Raven com mais peso. O APK vem em ZIP para facilitar o download no celular; extraia antes de instalar. A versão Web também foi atualizada em 22/10/2026. Se você já instalou o Android 2026.10.22.3 ou .4, instale este APK por cima uma vez: ele tem a permissão de internet que faltava para o aviso de atualização. O Android com atualização automática vem a partir desta versão: quem tem o app antigo precisa instalar este APK uma vez.</Caixa>
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
