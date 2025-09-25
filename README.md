# PalmQuest Pico (Unity)

PalmQuest Pico es un prototipo educativo 2D estilo 8-bit creado en Unity 2021/2022 LTS. El jugador recorre una plantación de palma, visita hotspots informativos, completa un mini-juego de cosecha y aprueba un quiz para obtener su insignia.

## Abrir el proyecto

1. Instala Unity 2021.3 LTS o 2022.3 LTS (Editor estándar 2D, sin URP).
2. Clona este repositorio o descárgalo como ZIP.
3. Abre Unity Hub y agrega la carpeta del proyecto (`PalmQuest Pico (Unity)`).
4. Selecciona la escena **Assets/Scenes/MainMenu.unity** como punto de inicio.

## Controles

- **WASD / Flechas**: mover al personaje.
- **E**: interactuar con los hotspots de la plantación.
- **Espacio**: cortar racimos en el mini-juego "Cosecha a tiempo".
- **Botón Mute** (HUD): silenciar/activar el audio global.

## Flujo del juego

1. Desde el menú principal pulsa **Jugar** para cargar la escena `Farm`.
2. Explora la plantación: los 4 hotspots muestran información breve y registran tu progreso.
3. El hotspot de **Polinización** permite lanzar el mini-juego. Al terminar verás tu puntaje y podrás reintentar o volver.
4. Cuando hayas visitado los 4 hotspots se habilita el botón **Quiz** en el HUD.
5. Responde las 5 preguntas (múltiple opción). Si logras 4/5 o más, desbloqueas la insignia permanente.

El progreso (hotspots visitados, mejor puntaje y aprobación del quiz) se guarda automáticamente con `PlayerPrefs`.

## Exportar builds

### Windows (Standalone)
1. Abre **File > Build Settings…**.
2. Selecciona *PC, Mac & Linux Standalone* → **Target Platform: Windows**.
3. Asegúrate de que las escenas `MainMenu`, `Farm`, `MiniGameHarvest` y `Quiz` estén en la lista (ya se incluyen por defecto).
4. Pulsa **Build** (o **Build and Run**) y elige una carpeta de salida.

### WebGL
1. Instala el módulo WebGL correspondiente en el Unity Hub si aún no lo tienes.
2. En **File > Build Settings…** selecciona *WebGL* y pulsa **Switch Platform**.
3. Con las escenas ya listadas, pulsa **Build** y elige una carpeta de salida. El contenido generado puede subirse a un servidor web estático.

## Notas técnicas

- El mapa, UI y hotspots se generan en tiempo de ejecución para simplificar la configuración.
- Se utilizan sprites placeholder de 16×16 (`Assets/Resources/Sprites`).
- La lógica principal está en `Assets/Scripts`, con un `GameState` persistente que guarda progreso mediante `SaveSystem`.
- `PlayerPrefs` almacena: `hotspot_0..3`, `bestScore` y `quizPassed`.
- El proyecto usa el sistema de entrada legacy (`InputManager`).
