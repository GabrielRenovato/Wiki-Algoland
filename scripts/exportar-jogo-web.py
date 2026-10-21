#!/usr/bin/env python3
"""Exporta o jogo vizinho sem alterar seus presets ou sua partida."""
import pathlib
import shutil
import subprocess
import sys
import tempfile

wiki = pathlib.Path(__file__).resolve().parents[1]
jogo = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else wiki.parent / 'AlgoLand'
saida = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else pathlib.Path('/tmp/algoland-web-export')
if not (jogo / 'project.godot').is_file():
    raise SystemExit(f'Projeto Godot não encontrado: {jogo}')
saida.mkdir(parents=True, exist_ok=True)
complementos = jogo / 'ferramentas/cidade/preparar_complementos.py'
if complementos.is_file():
    subprocess.run([sys.executable, str(complementos)], check=True)
subprocess.run([sys.executable, str(jogo / 'ferramentas/personagem/preparar_web_raven.py')], check=True)
# O compilador compartilhado recorta as peças existentes, sem redesenhar os conjuntos.
for manifesto in ['modelos/carrasco.json', 'em_preparacao/cavaleiro_rubro/manifesto.json', 'em_preparacao/cavalheiro/manifesto.json']:
    subprocess.run(['flatpak', 'run', 'org.godotengine.Godot', '--headless', '--path', str(jogo), '--script', 'res://ferramentas/armaduras/gerar_conjunto.gd', '--', 'res://ferramentas/armaduras/' + manifesto, '--somente-web'], check=True)
fachadas = jogo / 'ferramentas/cidade/preparar_exteriores_nitidos.gd'
if fachadas.is_file():
    subprocess.run(['flatpak', 'run', 'org.godotengine.Godot', '--headless', '--path', str(jogo), '--script', 'res://ferramentas/cidade/preparar_exteriores_nitidos.gd'], check=True)
enfeites = jogo / 'ferramentas/cidade/preparar_enfeites_detalhados.gd'
if enfeites.is_file():
    subprocess.run(['flatpak', 'run', 'org.godotengine.Godot', '--headless', '--path', str(jogo), '--script', 'res://ferramentas/cidade/preparar_enfeites_detalhados.gd'], check=True)
chao = jogo / 'ferramentas/cidade/preparar_chao_detalhado.py'
if chao.is_file():
    subprocess.run([sys.executable, str(chao)], check=True)
natureza_fazenda = jogo / 'ferramentas/fazenda/preparar_natureza_detalhada.py'
if natureza_fazenda.is_file():
    subprocess.run([sys.executable, str(natureza_fazenda)], check=True)
with tempfile.TemporaryDirectory(prefix='algoland-export-web-') as temporario:
    projeto = pathlib.Path(temporario)
    for item in jogo.iterdir():
        if item.name in {'project.godot', 'export_presets.cfg', '.git', 'builds', 'arquivo', 'arte', 'docs', 'testes', 'ferramentas'}:
            continue
        (projeto / item.name).symlink_to(item, target_is_directory=item.is_dir())
    configuracao = (jogo / 'project.godot').read_text().replace('window/size/mode=3', 'window/size/mode=0')
    (projeto / 'project.godot').write_text(configuracao)
    shutil.copy2(wiki / 'scripts/web/export_presets.cfg', projeto / 'export_presets.cfg')
    subprocess.run(['flatpak', 'run', '--filesystem=/tmp', 'org.godotengine.Godot', '--headless', '--path', str(projeto), '--export-release', 'Web', str(saida / 'index.html')], check=True)
subprocess.run(['node', str(wiki / 'scripts/preparar-jogo-web.mjs'), str(saida)], check=True)
