#!/usr/bin/env python3
"""Reproduz as imagens da wiki no Godot sem abrir o save da partida real."""
import json
import pathlib
import re
import struct
import subprocess
import sys
import tempfile

wiki = pathlib.Path(__file__).resolve().parents[1]
jogo = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else wiki.parent / 'AlgoLand'
destino = wiki / 'public/sprites'
with tempfile.TemporaryDirectory(prefix='algoland-wiki-visuais-') as pasta:
    projeto = pathlib.Path(pasta)
    subprocess.run([sys.executable, str(jogo / 'ferramentas/projeto/preparar_testes.py'), pasta], check=True)
    config = (projeto / 'project.godot').read_text()
    config = re.sub(r'config/custom_user_dir_name=.*', 'config/custom_user_dir_name="AlgoLand testes wiki visuais"', config)
    (projeto / 'project.godot').write_text(config)
    (projeto / 'capturar_visuais_wiki.gd').write_text((wiki / 'scripts/capturar-visuais.gd').read_text())
    subprocess.run(['flatpak', 'run', '--filesystem=/tmp', '--filesystem=' + str(wiki),
                    'org.godotengine.Godot', '--path', pasta, '--rendering-method', 'gl_compatibility',
                    '--script', 'res://capturar_visuais_wiki.gd', '--', str(destino)], check=True, timeout=240)

def sprite(p):
    largura, altura = struct.unpack('>II', p.read_bytes()[16:24])
    return {'src': str(p.relative_to(destino)), 'folha': [largura, altura],
            'tam': [largura, altura], 'quadros': [[0, 0]]}

dados = json.loads((wiki / 'src/dados-jogo.json').read_text())
itens = {tipo: sprite(destino / 'conjuntos' / (tipo + '.png'))
         for conjunto in dados['conjuntos'] for tipo in conjunto['pecas']}
montantes = {arma['id']: sprite(destino / 'armas' / (arma['id'] + '.png'))
             for arma in dados['armas'] if arma['id'].startswith('montante_')}
visuais = {modelo['id']: {'src': 'visuais/' + modelo['id'] + '.png', 'folha': [160, 160],
                        'tam': [40, 48], 'quadros': [[40, 32]], 'resolucao': 2}
           for modelos in dados['roupas'].values() for modelo in modelos}
for conjunto in dados['conjuntos']:
    nome = 'conjunto_' + conjunto['id']
    if (destino / 'visuais' / (nome + '.png')).exists():
        visuais[nome] = {'src': 'visuais/' + nome + '.png', 'folha': [160,160], 'tam': [40,48], 'quadros': [[40,32]], 'resolucao': 2}
texto = '// Gerado por scripts/capturar-visuais.py a partir da renderização real do jogo.\n'
for nome, valor in [('ITENS_CONJUNTOS', itens), ('MONTANTES', montantes), ('VISUAIS', visuais)]:
    texto += 'export const ' + nome + ' = ' + json.dumps(valor, ensure_ascii=False, separators=(',', ':')) + ';\n'
texto += "export const ICONES_CONJUNTOS = Object.fromEntries(Object.entries(ITENS_CONJUNTOS).filter(([id]) => id.startsWith('elmo_')).map(([id,s]) => [id.replace('elmo_', ''),s]));\n"
(wiki / 'src/sprites-atuais.js').write_text(texto)
print(f'Visuais: {len(itens)} peças, {len(montantes)} montantes e {len(visuais)} opções de aparência.')
