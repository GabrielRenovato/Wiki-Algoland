#!/usr/bin/env python3
"""Atualiza as tabelas da Wiki lendo o jogo sem acessar a partida do usuário."""
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

wiki = pathlib.Path(__file__).resolve().parents[1]
jogo = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else wiki.parent / 'AlgoLand'
with tempfile.TemporaryDirectory(prefix='algoland-wiki-dados-') as pasta:
    projeto = pathlib.Path(pasta)
    for item in jogo.iterdir():
        if item.name in {'project.godot', 'export_presets.cfg', '.git', 'builds', 'arquivo', 'arte', 'docs', 'testes', 'ferramentas'}:
            continue
        (projeto / item.name).symlink_to(item, target_is_directory=item.is_dir())
    config = (jogo / 'project.godot').read_text()
    config = re.sub(r'^config/(?:use_custom_user_dir|custom_user_dir_name)=.*\n', '', config, flags=re.MULTILINE)
    config = config.replace('[application]', '[application]\nconfig/use_custom_user_dir=true\nconfig/custom_user_dir_name="AlgoLand testes wiki dados"')
    (projeto / 'project.godot').write_text(config)
    shutil.copy2(wiki / 'scripts/extrair-dados.gd', projeto / 'extrair_dados_wiki.gd')
    destino = projeto / 'dados.json'
    subprocess.run(['flatpak', 'run', '--filesystem=/tmp', 'org.godotengine.Godot', '--headless', '--path', str(projeto), '--script', 'res://extrair_dados_wiki.gd', '--', str(destino)], check=True, timeout=120)
    dados = json.loads(destino.read_text())
p = wiki / 'src/dados-jogo.json'
dados['commit'] = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=jogo, text=True).strip()
texto = json.dumps(dados, ensure_ascii=False, indent=2) + '\n'
if '--check' in sys.argv:
    if p.read_text() != texto:
        raise SystemExit('As tabelas da Wiki divergem do jogo; execute novamente sem --check.')
    print('Dados da Wiki conferem com o jogo e seu commit.')
else:
    p.write_text(texto)
