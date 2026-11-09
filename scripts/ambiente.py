"""Comando do Godot e ligações de pasta que funcionam no Linux (flatpak) e no Windows."""
import os
import pathlib
import shutil
import sys

GODOT_WINDOWS = pathlib.Path.home() / 'Downloads/Godot_v4.7.2-stable_win64.exe/Godot_v4.7.2-stable_win64_console.exe'


def godot() -> list[str]:
    if os.environ.get('ALGOLAND_GODOT'):
        return [os.environ['ALGOLAND_GODOT']]
    if sys.platform == 'win32':
        return [str(GODOT_WINDOWS)]
    return ['flatpak', 'run', '--filesystem=/tmp', 'org.godotengine.Godot']


def ligar(destino: pathlib.Path, origem: pathlib.Path) -> None:
    """Link simbólico; no Windows sem permissão, junção para pastas e cópia para arquivos."""
    try:
        destino.symlink_to(origem, target_is_directory=origem.is_dir())
    except OSError:
        if origem.is_dir():
            import _winapi
            _winapi.CreateJunction(str(origem), str(destino))
        else:
            shutil.copy2(origem, destino)
