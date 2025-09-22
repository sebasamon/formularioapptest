extends CanvasLayer

@onready var prompt_label: Label = $Control/Prompt
@onready var zone_label: Label = $Control/ZoneLabel
@onready var xp_label: Label = $Control/XPLabel
@onready var badge_container: VBoxContainer = $Control/BadgePanel/Badges
@onready var hotspot_panel: Control = $Control/Panels/HotspotPanel
@onready var mini_game_panel: Control = $Control/Panels/MiniGamePanel
@onready var quiz_panel: Control = $Control/Panels/QuizPanel
@onready var dashboard_panel: Control = $Control/Panels/DashboardPanel
@onready var mute_button: Button = $Control/Settings/MuteButton

var _player
var _current_hotspot

func _ready() -> void:
    prompt_label.visible = false
    zone_label.visible = false
    xp_label.text = "XP: %d" % GameState.xp
    _refresh_badges()
    GameState.connect("badge_unlocked", Callable(self, "_on_badge_unlocked"))
    GameState.connect("minigame_score_updated", Callable(self, "_on_minigame_score"))
    if hotspot_panel.has_signal("request_minigame"):
        hotspot_panel.connect("request_minigame", Callable(self, "_on_request_minigame"))
    if hotspot_panel.has_signal("request_quiz"):
        hotspot_panel.connect("request_quiz", Callable(self, "_on_request_quiz"))
    if mini_game_panel.has_signal("minigame_completed"):
        mini_game_panel.connect("minigame_completed", Callable(self, "_on_minigame_completed"))
    if quiz_panel.has_signal("quiz_completed"):
        quiz_panel.connect("quiz_completed", Callable(self, "_on_quiz_completed"))
    mute_button.connect("pressed", Callable(self, "_on_mute_button_pressed"))
    _update_mute_button()

func setup(player: Node, hotspot_manager: Node) -> void:
    _player = player
    if _player:
        _player.connect("hotspot_focused", Callable(self, "_on_hotspot_focused"))
        _player.connect("hotspot_interacted", Callable(self, "_on_hotspot_interacted"))
    if hotspot_manager and hotspot_manager.has_signal("hotspot_selected"):
        hotspot_manager.connect("hotspot_selected", Callable(self, "_on_hotspot_selected"))

func _process(delta: float) -> void:
    if Input.is_action_just_pressed("open_dashboard"):
        _toggle_dashboard()
    if Input.is_action_just_pressed("pause_menu"):
        if Input.get_mouse_mode() == Input.MOUSE_MODE_CAPTURED:
            Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        else:
            Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)

func _on_hotspot_focused(hotspot) -> void:
    if _current_hotspot and _current_hotspot != hotspot and _current_hotspot.has_method("focus_changed"):
        _current_hotspot.focus_changed(false)
    _current_hotspot = hotspot
    if hotspot:
        if hotspot.has_method("focus_changed"):
            hotspot.focus_changed(true)
        var data := hotspot.get("data")
        prompt_label.text = "Press E to inspect %s" % data.get("title", "Hotspot")
        prompt_label.visible = true
        zone_label.text = data.get("zone", "")
        zone_label.visible = zone_label.text != ""
    else:
        prompt_label.visible = false
        zone_label.visible = false

func _on_hotspot_interacted(hotspot) -> void:
    if hotspot and hotspot.has_method("trigger_interaction"):
        hotspot.trigger_interaction()

func _on_hotspot_selected(data: Dictionary) -> void:
    hotspot_panel.show_hotspot(data)

func _on_request_minigame(id: String) -> void:
    mini_game_panel.show_minigame(id)

func _on_request_quiz(zone: String) -> void:
    quiz_panel.show_quiz(zone)

func _on_minigame_completed(game_id: String, score: int, success: bool) -> void:
    GameState.record_minigame_score(game_id, score)
    xp_label.text = "XP: %d" % GameState.xp
    var message := "%s score: %d" % [game_id, score]
    if success:
        message += " — within target!"
    prompt_label.text = message
    prompt_label.visible = true

func _on_quiz_completed(zone: String, score: int, passed: bool) -> void:
    GameState.record_quiz(zone, score, passed)
    xp_label.text = "XP: %d" % GameState.xp
    _refresh_badges()
    prompt_label.text = "%s quiz %s (%d correct)" % [zone.capitalize(), passed ? "passed" : "retry", score]
    prompt_label.visible = true

func _on_badge_unlocked(_zone: String) -> void:
    xp_label.text = "XP: %d" % GameState.xp
    _refresh_badges()

func _on_minigame_score(_game: String, _score: int) -> void:
    xp_label.text = "XP: %d" % GameState.xp

func _refresh_badges() -> void:
    for child in badge_container.get_children():
        child.queue_free()
    for zone in ["pollination", "fertilization", "timeline", "production"]:
        var badge := HBoxContainer.new()
        badge.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        var label := Label.new()
        label.text = "%s: %s" % [zone.capitalize(), GameState.has_badge(zone) ? "Unlocked" : "Pending"]
        badge.add_child(label)
        badge_container.add_child(badge)
    if GameState.all_badges_unlocked(["pollination", "fertilization", "timeline", "production"]):
        prompt_label.text = "Dashboard Hut unlocked! Press P to view production analytics."
        prompt_label.visible = true

func _toggle_dashboard() -> void:
    if dashboard_panel.visible:
        dashboard_panel.hide()
    else:
        dashboard_panel.show_dashboard()

func _on_mute_button_pressed() -> void:
    AudioService.toggle_mute()
    _update_mute_button()

func _update_mute_button() -> void:
    mute_button.text = "Unmute" if GameState.is_muted() else "Mute"
