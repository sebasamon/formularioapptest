extends Control

signal minigame_completed(game_id: String, score: int, success: bool)
signal panel_closed

@onready var title_label: Label = $MarginContainer/VBoxContainer/Header/Title
@onready var timer_label: Label = $MarginContainer/VBoxContainer/Header/Timer
@onready var container: Control = $MarginContainer/VBoxContainer/GameContainer

var _game_scenes := {
    "pollination_catcher": preload("res://scenes/mini_games/PollinationGame.tscn"),
    "fertilizer_mixer": preload("res://scenes/mini_games/FertilizerGame.tscn"),
    "harvest_timing": preload("res://scenes/mini_games/HarvestGame.tscn")
}

var _game_instance: Control
var _current_game_id := ""
var _config := {}
var _time_left := 0.0
var _ended := false

func _ready() -> void:
    hide()
    $MarginContainer/VBoxContainer/Header/CloseButton.connect("pressed", Callable(self, "_on_close_pressed"))
    set_process(false)

func show_minigame(game_id: String) -> void:
    if not _game_scenes.has(game_id):
        push_error("MiniGamePanel: unknown game %s" % game_id)
        return
    _clear_game()
    _current_game_id = game_id
    _config = DataService.get_minigame_config(game_id)
    _time_left = float(_config.get("time_limit", 45))
    _ended = false
    title_label.text = _config.get("name", "Mini-Game")
    var packed: PackedScene = _game_scenes[game_id]
    _game_instance = packed.instantiate()
    container.add_child(_game_instance)
    if _game_instance.has_signal("game_finished"):
        _game_instance.connect("game_finished", Callable(self, "_on_game_finished"))
    if _game_instance.has_signal("score_updated"):
        _game_instance.connect("score_updated", Callable(self, "_on_score_updated"))
    if _game_instance.has_method("setup"):
        _game_instance.setup(_config)
    show()
    set_process(true)
    _update_timer_label()

func _process(delta: float) -> void:
    if _ended:
        return
    _time_left -= delta
    if _game_instance and _game_instance.has_method("update_time"):
        _game_instance.update_time(_time_left)
    if _time_left <= 0.0:
        _time_left = 0.0
        _finalize_game()
    _update_timer_label()

func _update_timer_label() -> void:
    timer_label.text = "Time: %02d" % int(clamp(round(_time_left), 0, 999))

func _on_game_finished(result: Dictionary) -> void:
    if _ended:
        return
    var score := int(result.get("score", 0))
    var success := result.get("success", false)
    _ended = true
    _emit_result(score, success)

func _finalize_game() -> void:
    if _ended:
        return
    var score := 0
    var success := false
    if _game_instance:
        if _game_instance.has_method("get_score"):
            score = int(_game_instance.get_score())
        if _config.has("target_score"):
            success = score >= int(_config.get("target_score", 0))
        elif _config.has("target_accuracy") and _game_instance.has_method("get_accuracy"):
            success = float(_game_instance.get_accuracy()) >= float(_config.get("target_accuracy", 0.0))
            score = int(float(_game_instance.get_accuracy()) * 100.0)
        elif _config.has("target_kg_per_ha") and _game_instance.has_method("get_total"):
            var total := float(_game_instance.get_total())
            var diff := abs(total - float(_config.get("target_kg_per_ha", 0)))
            var tolerance := float(_config.get("tolerance", 0))
            success = diff <= tolerance
            score = int(max(0.0, 100.0 - diff))
    _ended = true
    _emit_result(score, success)

func _emit_result(score: int, success: bool) -> void:
    hide()
    set_process(false)
    emit_signal("minigame_completed", _current_game_id, score, success)
    emit_signal("panel_closed")
    _clear_game()

func _on_score_updated(_score: int) -> void:
    pass

func _on_close_pressed() -> void:
    _finalize_game()

func _clear_game() -> void:
    if _game_instance and is_instance_valid(_game_instance):
        _game_instance.queue_free()
    _game_instance = null
    _current_game_id = ""
    _config = {}
    _time_left = 0.0
    _ended = false
