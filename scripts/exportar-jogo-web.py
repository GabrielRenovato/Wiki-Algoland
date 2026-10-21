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
# Exporta os recursos integrados exatamente como estão no jogo. Regeneradores antigos
# podiam sobrescrever correções de arte ao atualizar apenas a Wiki.
for recurso in ['assets/personagens/raven_fantasy/web', 'assets/cenario/cidade/fachadas_detalhadas/manifesto.json']:
    if not (jogo / recurso).exists():
        raise SystemExit(f'Recurso preparado ausente no jogo: {recurso}')
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
