import Sprite from "../componentes/Sprite.jsx";
import { Titulo, Secao, Caixa, Grade, Ficha, Tabela, Tecla, Link, Passos, Brasas } from "../componentes/ui.jsx";
import { ARMAS, FERRAMENTAS, MORADORES } from "../sprites.js";

// Páginas dos sistemas mais recentes. Fontes no jogo: codigo/cidade/{lobby_cidade,sessao_lobby}.gd, codigo/ui/tela_lobby.gd,
// codigo/globais/ranking.gd, codigo/cidade/podio_ranking.gd, codigo/dados/estilos_arma.gd, codigo/jogador/defesa_jogador.gd,
// codigo/floresta/animal_selvagem.gd e codigo/cidade/jornada_limiar.gd.

export function Online() {
  return (
    <>
      <Titulo sub="Encontre outros jogadores na praça, converse no chat e veja os balões sobre cada personagem. Tudo opcional.">Online e chat</Titulo>

      <Secao titulo="Como ficar online">
        <Passos itens={[
          <>Vá para a <Link para="vila">Vila das Flores</Link>. O online existe só na cidade externa.</>,
          <>No computador, aperte <Tecla>Enter</Tecla> e escolha <b>FICAR ONLINE</b>. Também dá pela pausa, em <b>CIDADE ONLINE / OFFLINE</b>.</>,
          <>No celular, toque no ícone de balão ao lado do botão <b>MAPA</b>.</>,
          <>Quando conectar, o estado mostra quantos jogadores estão na cidade (até 8).</>,
        ]} />
        <Caixa tipo="nota">
          A cidade começa <b>offline</b>. O jogo lembra a sua escolha e, no cooperativo, cada jogador escolhe por conta própria.
        </Caixa>
      </Secao>

      <Secao titulo="Conversar">
        <Tabela cabecalho={["", "Computador", "Celular e tela dividida"]} linhas={[
          ["Onde fica o chat", "Registro translúcido no canto inferior esquerdo, com as últimas 30 mensagens", "Ícone de balão ao lado do MAPA abre o chat"],
          ["Escrever", <><Tecla>Enter</Tecla> foca o campo, <Tecla>Enter</Tecla> envia e <Tecla>Esc</Tecla> cancela</>, "Toque no campo; o teclado ABC funciona com controle"],
          ["Enquanto digita", "O personagem fica parado e as teclas de atalho (M, I…) viram letras", "—"],
        ]} />
        <p>
          Cada mensagem aparece também num <b>balão sobre o personagem</b> de quem escreveu, com a moldura das falas dos
          moradores. As suas mensagens ficam em dourado no registro; as dos outros, em azul. O texto tem até 160 caracteres.
        </p>
      </Secao>

      <Secao titulo="O que é compartilhado">
        <Grade min={240}>
          <Ficha nome="Compartilhado" etiqueta="O que os outros veem">
            <p>Seu personagem (aparência e armadura), o apelido, a posição na praça e as mensagens do chat.</p>
          </Ficha>
          <Ficha nome="Continua só seu" etiqueta="Nada disso muda">
            <p>Moradores, missões, mochila, fazenda, dinheiro e progresso. O online não interfere no seu save.</p>
          </Ficha>
        </Grade>
      </Secao>

      <Secao titulo="Limites">
        <ul className="lista">
          <li><b>8 jogadores</b> por vez na cidade. Com a sala cheia, o jogo espera uma vaga e reconecta sozinho.</li>
          <li>Ao entrar numa casa, na fazenda ou no portal, você sai da sala; voltar à rua reconecta se a escolha for online.</li>
          <li>Se a conexão cair, os outros jogadores somem e o jogo tenta de novo.</li>
          <li>O online usa um servidor gratuito com cota diária. Se a cota acabar, o chat pausa até o dia seguinte e o jogo local continua normal.</li>
          <li>Apelidos ofensivos são trocados por <b>sem apelido</b>.</li>
        </ul>
      </Secao>
    </>
  );
}

export function Ranking() {
  return (
    <>
      <Titulo sub="Um placar global do andar mais alto alcançado na fenda, com o pódio dos três primeiros na praça.">Ranking e pódio</Titulo>

      <Secao titulo="Como entrar no ranking">
        <p>
          Não há cadastro. Ao <b>concluir cada andar</b> ou <b>morrer</b>, o jogo envia sozinho o andar alcançado, o apelido
          do personagem e a sua aparência. Sem apelido, você aparece como <b>sem apelido</b>. Apelidos podem se repetir: quem
          identifica você é um código secreto guardado no aparelho.
        </p>
        <Caixa tipo="aviso" titulo="Seu perfil fica no aparelho">
          O código do ranking não tem conta nem recuperação. Trocar de aparelho ou apagar os dados do jogo começa um perfil novo.
        </Caixa>
      </Secao>

      <Secao titulo="Onde ver">
        <Grade min={240}>
          <Ficha nome="Pódio na praça" etiqueta="Vila das Flores">
            <p>Os três primeiros aparecem em pé no pódio, com a roupa, a armadura e a arma mais usada. O 1º fica no centro.</p>
            <p>Interaja com a frente do pódio para abrir o <b>top 15</b>.</p>
          </Ficha>
          <Ficha nome="Fim da partida" etiqueta="Ao morrer">
            <p>A tela de fim de partida mostra o top 15 logo depois do envio.</p>
          </Ficha>
        </Grade>
      </Secao>

      <Secao titulo="Regras">
        <ul className="lista">
          <li>Vale o andar mais alto. Empates são desempatados por quem chegou primeiro.</li>
          <li>O servidor limita a subida pelo relógio: no máximo um andar a cada 20 segundos desde o início da partida.</li>
          <li>A arma favorita exibida é a que você mais usou (golpes e disparos), não a equipada.</li>
          <li>No cooperativo, cada jogador tem o próprio perfil e apelido.</li>
          <li>O ranking é por temporada. A temporada atual começou em 23/10/2026, junto com a versão 2026.10.23.1.</li>
        </ul>
      </Secao>
    </>
  );
}

export function Combate() {
  return (
    <>
      <Titulo sub="Ataque, esquiva, defesa e a especialidade de cada arma. Os números valem para o jogador sem melhorias.">Combate</Titulo>

      <Secao titulo="Comandos">
        <Tabela cabecalho={["Ação", "Teclado", "Controle"]} linhas={[
          ["Atacar", <><Tecla>Espaço</Tecla> ou clique</>, "X ou RT"],
          ["Esquivar (dash)", <Tecla>Shift</Tecla>, "B"],
          ["Defender (segurar)", <><Tecla>Ctrl</Tecla>, <Tecla>C</Tecla> no navegador, ou botão direito</>, "LT"],
          ["Beber poção do cinto", <Tecla>R</Tecla>, "Y"],
          ["Trocar de arma", <Tecla>Z</Tecla>, "RB"],
        ]} />
        <p>Veja todos os comandos em <Link para="controles">Controles</Link>.</p>
      </Secao>

      <Secao titulo="Estamina">
        <p>
          A barra amarela é a estamina: <b>100</b> pontos, que voltam a <b>30 por segundo</b> depois de 0,6 s sem gastar. A melhoria
          <b> Fôlego</b> da Lia aumenta o máximo (veja <Link para="progresso">Brasas e progresso</Link>).
        </p>
      </Secao>

      <Secao titulo="Esquiva">
        <p>
          O dash custa <b>35 de estamina</b>, dura 0,15 s e deixa você <b>invulnerável</b> durante o movimento. Depois há 0,6 s de
          recarga. Use para atravessar golpes, não só para fugir.
        </p>
      </Secao>

      <Secao titulo="Defesa e aparo">
        <p>Segure o botão de defesa para ficar em guarda. Entrar custa 8 de estamina e manter custa 6 por segundo. Só protege de frente (cerca de 72° para cada lado).</p>
        <Tabela cabecalho={["Momento do golpe", "Resultado"]} linhas={[
          [<b>Até 0,25 s depois de erguer a guarda</b>, <>
            <b>Aparo perfeito</b>: nenhum dano, empurra e atordoa por 1 s quem está na frente, devolve 15 de estamina e dá 0,4 s de invulnerabilidade.
          </>],
          ["Depois disso", <><b>Bloqueio</b>: você leva 35% do dano e pouco empurrão, mas o golpe custa estamina. Sem estamina, a guarda quebra.</>],
          ["Pelas costas ou de lado", "A guarda não vale."],
        ]} />
        <Caixa tipo="dica" titulo="Escudada">
          Com espada e escudo, o aparo perfeito vira um contra-ataque com o escudo: 1,5× o dano da espada, empurrão forte e 1,8 s de atordoamento.
        </Caixa>
      </Secao>

      <Secao titulo="Especialidade de cada arma">
        <p>Cada arma tem um efeito próprio, que faz parte dela (não soma atributos). Saiba onde fabricar em <Link para="armas">Armas e escudo</Link>.</p>
        <Tabela cabecalho={["Arma", "Especialidade", "Efeito"]} linhas={[
          [<span className="peixe-nome"><Sprite s={ARMAS.espada_basica} escala={1.5} parado />Espada básica</span>, "Contragolpe", "Depois de um aparo perfeito, o próximo golpe causa +50% de dano (por 3 s)."],
          [<span className="peixe-nome"><Sprite s={ARMAS.espada_gemea} escala={1.5} parado />Espada gêmea</span>, "Ritmo", "O terceiro golpe do combo causa +25% de dano."],
          [<span className="peixe-nome"><Sprite s={ARMAS.machado} escala={1.5} parado />Machado</span>, "Abertura", "O primeiro golpe do combo causa +25% de dano."],
          [<span className="peixe-nome"><Sprite s={ARMAS.maca} escala={1.5} parado />Maça</span>, "Impacto", "+50% de empurrão; o terceiro golpe atordoa por 0,35 s."],
          [<span className="peixe-nome"><Sprite s={ARMAS.lanca_basica} escala={0.8} parado />Lança</span>, "Ponta", "+25% de dano ao acertar a mais de 32 px."],
          [<span className="peixe-nome"><Sprite s={ARMAS.arco_curto} escala={1.5} parado />Arco curto</span>, "Reflexo", "+20% de dano até 90 px."],
          [<span className="peixe-nome"><Sprite s={ARMAS.arco_curvo} escala={1.5} parado />Arco curvo</span>, "Precisão", "+20% de dano entre 90 e 180 px."],
          [<span className="peixe-nome"><Sprite s={ARMAS.arco_longo} escala={1.5} parado />Arco longo</span>, "Longo alcance", "+15% de dano a partir de 160 px."],
        ]} />
        <Caixa tipo="nota" titulo="Flechas">
          A flecha guarda o dano e o crítico do momento do disparo, mesmo que você troque de arma com ela no ar.
        </Caixa>
      </Secao>

      <Secao titulo="Cor da arma por nível">
        <p>A arma muda de cor conforme o nível que a <Link para="armas">bigorna</Link> deu a ela: nível 1 original, 2 cobre, 3 azul, 4 ouro e 5 ametista. O escudo segue a mesma regra.</p>
      </Secao>

      <Secao titulo="Efeitos perigosos">
        <ul className="lista">
          <li><b>Petrificação (Medusa)</b>: o olhar da <Link para="chefes">Medusa</Link> petrifica por 0,85 s. A Ruína dela causa 2,25× o dano normal, mas pode ser esquivada ou bloqueada.</li>
          <li><b>Chuva de fogo (Dragão)</b>: um círculo de aviso aparece 3 s antes. O alvo fica travado quando o aviso surge: saia dele.</li>
        </ul>
      </Secao>
    </>
  );
}

export function Floresta() {
  return (
    <>
      <Titulo sub="O caminho entre a vila e a fazenda: pedreira, lago de pesca, acampamento de lenhadores e bichos que fogem pelas árvores.">Floresta</Titulo>

      <Secao titulo="Onde fica">
        <p>
          Saindo da <Link para="vila">Vila das Flores</Link> pelo oeste, você entra na floresta pelo lado leste. Siga a estrada
          para o oeste e ela leva até a <Link para="fazenda">fazenda</Link>. Placas indicam as saídas.
        </p>
      </Secao>

      <Secao titulo="O que tem por lá">
        <Grade min={230}>
          <Ficha sprite={FERRAMENTAS.picareta} escala={4} nome="Pedreira" etiqueta="Paredão ao norte">
            <p>Blocos de pedra para quebrar com a picareta. As pedras grandes do paredão são só cenário.</p>
          </Ficha>
          <Ficha sprite={FERRAMENTAS.machadinha} escala={4} nome="Carvalhos e arbustos" etiqueta="Mata em manchas e clareiras">
            <p>Carvalhos e arbustos podem ser cortados com a machadinha para obter madeira. Os abetos formam a mata fechada.</p>
          </Ficha>
          <Ficha nome="Lago e cantinho de pesca" etiqueta="Água de rio">
            <p>Um lago grande com sete pontos de pesca do tipo rio. Veja os peixes em <Link para="pesca">Pesca</Link>.</p>
          </Ficha>
          <Ficha nome="Acampamento dos lenhadores" etiqueta="Clareira com móveis">
            <p>Um canto decorado na mata, bom para se orientar no caminho.</p>
          </Ficha>
        </Grade>
      </Secao>

      <Secao titulo="Fauna">
        <p>
          Cervos, coelhos, capivaras e corvos vivem na floresta. Eles pastam e vagueiam perto do lugar de origem. Se você se
          aproxima, o bicho para e encara; chegando mais perto, ele foge até uma árvore, passa por trás dela e some (o corvo
          levanta voo). Depois volta em outra clareira, longe dos jogadores.
        </p>
        <Tabela cabecalho={["Animal", "Fica alerta a", "Foge a", "Detalhe"]} linhas={[
          ["Cervo", "170 px", "112 px", "O mais arisco; macho e fêmea."],
          ["Coelho", "120 px", "78 px", "Marrom, loiro, preto ou branco; todos ficam brancos no inverno."],
          ["Capivara", "90 px", "58 px", "A mais tranquila; marrom ou clara."],
          ["Corvo", "—", "—", "Levanta voo em vez de correr."],
        ]} />
        <Caixa tipo="nota">Os bichos não bloqueiam a passagem e não podem ser caçados: são parte do cenário.</Caixa>
      </Secao>
    </>
  );
}

export function Limiar() {
  const etapas = [
    { quem: MORADORES.lia, nome: "Limiar I · A primeira vigília", dono: "Lia", meta: "Derrote o guardião do andar 1.", premio: <><Brasas n={10} /> e o projeto da lança</> },
    { quem: MORADORES.bento, nome: "Limiar II · Raízes que sustentam", dono: "Bento", meta: "Entregue 2 colheitas da estação.", premio: <><Brasas n={15} /> e o projeto da aljava</> },
    { quem: MORADORES.ferreiro, nome: "Limiar III · O eco nas ruínas", dono: "Ivo", meta: "Derrote o guardião do andar 6.", premio: <><Brasas n={20} /> e o projeto da armadura</> },
    { quem: MORADORES.mistica, nome: "Limiar IV · A luz da vila", dono: "Estela", meta: "Derrote o guardião do andar 10.", premio: <><Brasas n={40} /> e a fonte restaurada</> },
  ];
  return (
    <>
      <Titulo sub="A história principal: quatro pedidos encadeados para restaurar o selo da praça, além dos avisos e cartas da vila.">Arco do Limiar e eventos</Titulo>

      <Secao titulo="O selo da praça">
        <p>
          O selo que protege a vila está enfraquecendo. Cada etapa só abre depois da anterior. O cartão de <b>Missão principal</b>
          no canto da tela mostra o próximo passo, o morador certo ganha um balão amarelo e o <Link para="mapa">mapa-múndi</Link>
          marca o destino.
        </p>
        <Grade min={250}>
          {etapas.map((e, i) => (
            <Ficha key={e.nome} sprite={e.quem} nome={e.nome} etiqueta={`Etapa ${i + 1} · com ${e.dono}`}>
              <p>{e.meta}</p>
              <p className="libera">Recompensa: {e.premio}</p>
            </Ficha>
          ))}
        </Grade>
        <Caixa tipo="dica" titulo="A fonte restaurada">
          Depois da última etapa, a fonte da praça recupera <b>30 de energia por dia</b> para cada jogador. Interaja com ela; se a
          energia já estiver cheia ou você já tiver usado hoje, ela avisa.
        </Caixa>
      </Secao>

      <Secao titulo="Festa de sábado">
        <p>
          Todo <b>sábado, das 18h às 2h</b>, tem festa na taverna da pousada. Um aviso aparece no topo da tela durante o dia e outro
          quando a festa começa. Os moradores se reúnem e se sentam lá dentro. Veja também <Link para="moradores">Moradores</Link>.
        </p>
      </Secao>

      <Secao titulo="Pombo-correio">
        <p>
          Às vezes, depois de dormir, um morador manda uma carta com um pedido. O <b>pombo-correio</b> entrega a carta quando você sai
          de casa. Abra a carta para ler e escolha aceitar o pedido; ele vai para o diário, junto com os pedidos do
          <Link para="vila"> mural</Link>.
        </p>
      </Secao>
    </>
  );
}
