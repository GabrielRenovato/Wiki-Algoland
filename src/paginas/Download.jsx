import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Passos } from "../componentes/ui.jsx";
import { HEROI, PORTAL } from "../sprites.js";

// Os arquivos ficam no Release mais recente do repositório: "latest/download" sempre aponta para a versão nova,
// desde que os nomes dos arquivos se mantenham.
const RELEASES = "https://github.com/GabrielRenovato/Wiki-Algoland/releases";
export const BAIXAR = {
  windows: `${RELEASES}/latest/download/Algoland-windows.zip`,
  linux: `${RELEASES}/latest/download/Algoland-linux.zip`,
  android: `${RELEASES}/latest/download/Algoland-android.apk`,
};

const PLATAFORMAS = [
  { id: "windows", nome: "Windows", arquivo: "Algoland-windows.zip", tamanho: "152 MB",
    passos: ["Baixe e extraia o .zip.", "Abra o Algoland.exe.", "Se o Windows avisar \"aplicativo não reconhecido\", clique em Mais informações → Executar assim mesmo."] },
  { id: "linux", nome: "Linux", arquivo: "Algoland-linux.zip", tamanho: "142 MB",
    passos: ["Baixe e extraia o .zip.", "Dê permissão de execução: chmod +x Algoland.x86_64", "Rode ./Algoland.x86_64"] },
  { id: "android", nome: "Android", arquivo: "Algoland-android.apk", tamanho: "152 MB",
    passos: ["Baixe o .apk no celular.", "Permita instalar de fontes desconhecidas quando o Android pedir.", "Abra o AlgoLand: os controles de toque aparecem sozinhos."] },
];

export function Download() {
  return (
    <>
      <Titulo sub="Versão de teste para Windows, Linux e Android.">Baixar o jogo</Titulo>
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
