extends Node

const HOTSPOT_IDS := ["polinizacion", "fertilizacion", "calendario", "produccion"]
const HOTSPOT_CONTENT := {
    "polinizacion": {
        "text": "Los insectos llevan polen entre flores asegurando racimos llenos.",
        "action": "Jugar mini-juego",
        "action_type": "minigame"
    },
    "fertilizacion": {
        "text": "Aplica nutrientes según análisis de suelo y etapa para evitar desperdicios.",
        "action": "Entendido",
        "action_type": "info"
    },
    "calendario": {
        "text": "Planifica siembras, podas y cosecha con un calendario visible para el equipo.",
        "action": "Anotar",
        "action_type": "info"
    },
    "produccion": {
        "text": "Registrar volúmenes y fechas permite ajustar ventas y prever insumos.",
        "action": "Registrar",
        "action_type": "info"
    }
}

@onready var level_scene: Node = $Level
@onready var player: CharacterBody2D = $Level.get_player()
@onready var ui_panel: Control = $CanvasLayer/UIPanel
@onready var minigame: Control = $CanvasLayer/Minigame
@onready var quiz: Control = $CanvasLayer/Quiz
@onready var prompt_label: Label = $CanvasLayer/HUD/Prompt
@onready var progress_label: Label = $CanvasLayer/HUD/TopBar/ProgressLabel
@onready var best_score_label: Label = $CanvasLayer/HUD/TopBar/BestScoreLabel
@onready var quiz_button: Button = $CanvasLayer/HUD/TopBar/QuizButton
@onready var mute_button: Button = $CanvasLayer/HUD/TopBar/MuteButton
@onready var badge_label: Label = $CanvasLayer/HUD/BadgeLabel

var save_state := SaveState.new()
var active_hotspot: Area2D = null
var active_hotspot_id: String = ""
var pending_action_type: String = "info"
var muted := false

func _ready() -> void:
    add_child(save_state)
    save_state.load_state()
    prompt_label.visible = false
    badge_label.visible = save_state.quiz_passed
    _update_best_score_label()
    _update_progress_label()
    player.hotspot_changed.connect(_on_hotspot_changed)
    player.interact_requested.connect(_on_interact_requested)
    for hotspot in $Level.get_hotspots():
        hotspot.interacted.connect(_on_hotspot_interacted.bind(hotspot))
    ui_panel.action_pressed.connect(_on_panel_action)
    ui_panel.closed.connect(_on_panel_closed)
    minigame.finished.connect(_on_minigame_finished)
    quiz.finished.connect(_on_quiz_finished)
    quiz_button.pressed.connect(_on_quiz_button_pressed)
    mute_button.pressed.connect(_on_mute_button_pressed)
    quiz_button.disabled = not save_state.all_hotspots_seen(HOTSPOT_IDS)

func _on_hotspot_changed(hotspot: Area2D) -> void:
    active_hotspot = hotspot
    if hotspot:
        active_hotspot_id = hotspot.hotspot_id
        prompt_label.visible = true
    else:
        active_hotspot_id = ""
        prompt_label.visible = false

func _on_interact_requested(hotspot: Area2D) -> void:
    if hotspot:
        hotspot.trigger_interaction()

func _on_hotspot_interacted(hotspot_id: String, hotspot: Area2D) -> void:
    if not HOTSPOT_CONTENT.has(hotspot_id):
        return
    active_hotspot_id = hotspot_id
    pending_action_type = HOTSPOT_CONTENT[hotspot_id]["action_type"]
    ui_panel.set_content(hotspot.title, HOTSPOT_CONTENT[hotspot_id]["text"], HOTSPOT_CONTENT[hotspot_id]["action"])
    ui_panel.show()
    save_state.mark_hotspot(hotspot_id)
    _update_progress_label()
    quiz_button.disabled = not save_state.all_hotspots_seen(HOTSPOT_IDS)

func _on_panel_action() -> void:
    ui_panel.hide()
    match pending_action_type:
        "minigame":
            minigame.show()
            minigame.begin()
        "info":
            pass

func _on_panel_closed() -> void:
    ui_panel.hide()

func _on_minigame_finished(score: int) -> void:
    save_state.update_best_score(score)
    _update_best_score_label()

func _on_quiz_button_pressed() -> void:
    quiz.show()
    quiz.start_quiz()

func _on_quiz_finished(passed: bool, score: int) -> void:
    save_state.set_quiz_passed(passed or save_state.quiz_passed)
    badge_label.visible = save_state.quiz_passed
    quiz_button.disabled = false
    _update_progress_label()

func _update_progress_label() -> void:
    var seen := 0
    for id in HOTSPOT_IDS:
        if save_state.hotspots_seen.get(id, false):
            seen += 1
    progress_label.text = "Hotspots: %d/4" % seen
    if save_state.all_hotspots_seen(HOTSPOT_IDS):
        progress_label.text += " | ¡Quiz listo!"

func _update_best_score_label() -> void:
    best_score_label.text = "Mejor puntaje: %d" % save_state.best_score

func _on_mute_button_pressed() -> void:
    muted = !muted
    var db := -80.0 if muted else 0.0
    AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), db)
    mute_button.text = "Unmute" if muted else "Mute"
