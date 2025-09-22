# PalmQuest 8bit

PalmQuest 8bit es un prototipo educativo hecho con Godot 4 donde exploras una finca top-down, visitas hotspots sobre prácticas de palma de aceite, juegas un mini-juego de cosecha y respondes un quiz.

## Requisitos

- Godot Engine 4.x (probado con 4.2+)

## Estructura principal

```
project.godot
scenes/
  main.tscn
  level.tscn
  ui_panel.tscn
  minigame.tscn
  quiz.tscn
scripts/
  main.gd
  level.gd
  player.gd
  hotspot.gd
  ui_panel.gd
  minigame.gd
  quiz.gd
  save.gd
export_presets.cfg
```

## Cómo ejecutar

1. Abre Godot 4 y selecciona **Importar proyecto**.
2. Elige el archivo `project.godot` ubicado en este directorio.
3. Ejecuta la escena principal (`scenes/main.tscn`).

## Controles

- **Movimiento:** WASD o flechas.
- **Interactuar:** tecla **E** o **Espacio** cuando aparezca el aviso.
- **Mini-juego:** haz clic en los racimos verdes para sumar puntos.

## Flujo del juego

1. Recorre la finca y visita los 4 hotspots.
2. Lee la información breve y, en Polinización, juega el mini-juego “Cosecha a tiempo”.
3. Al ver los 4 hotspots se habilita el quiz de 5 preguntas. Aprobando (≥4/5) obtienes un badge.
4. El progreso (hotspots visitados, mejor puntaje, estado del quiz) se guarda en `user://save.cfg`.

## Exportar builds

1. Abre el proyecto en Godot 4.
2. Ve a **Project > Export...**.
3. Verifica que existan los presets "HTML5" y "Windows". Ajusta la ruta de salida si es necesario.
4. Presiona **Export Project** para generar el build Web (`PalmQuest8bit.html`) o Windows (`PalmQuest8bit.exe`).

## Notas

- El arte es placeholder en 16×16 píxeles con paleta verde sencilla.
- El botón "Mute" silencia el bus Master.
- No se requieren assets externos ni conexiones a internet.
