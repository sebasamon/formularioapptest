extends Node

## Central audio controller that plays ambience and UI sounds and respects mute settings.
class_name AudioService

@export var ambient_stream: AudioStream
@export var ui_click_stream: AudioStream

var _ambient_player: AudioStreamPlayer
var _ui_player: AudioStreamPlayer

func _ready() -> void:
    _ambient_player = AudioStreamPlayer.new()
    _ambient_player.bus = "Master"
    _ambient_player.autoplay = false
    add_child(_ambient_player)

    _ui_player = AudioStreamPlayer.new()
    _ui_player.bus = "Master"
    add_child(_ui_player)

    if ambient_stream:
        _ambient_player.stream = ambient_stream
        _ambient_player.loop = true
        if not GameState.is_muted():
            _ambient_player.play()

    GameState.connect("badge_unlocked", Callable(self, "_on_badge_unlocked"))

func set_muted(muted: bool) -> void:
    GameState.set_muted(muted)
    _update_mute_state()

func toggle_mute() -> bool:
    var new_state := not GameState.is_muted()
    set_muted(new_state)
    return new_state

func _update_mute_state() -> void:
    var muted := GameState.is_muted()
    if muted:
        if _ambient_player.playing:
            _ambient_player.stop()
    else:
        if ambient_stream and not _ambient_player.playing:
            _ambient_player.play()
    _ambient_player.volume_db = -80 if muted else 0
    _ui_player.volume_db = -80 if muted else -3

func play_ui_click() -> void:
    if not ui_click_stream or GameState.is_muted():
        return
    _ui_player.stream = ui_click_stream
    _ui_player.play()

func _on_badge_unlocked(_zone: String) -> void:
    if not GameState.is_muted():
        _ui_player.pitch_scale = 1.2
        _ui_player.stream = ui_click_stream
        _ui_player.play()
        _ui_player.pitch_scale = 1.0
