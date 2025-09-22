extends Control

signal request_minigame(id: String)
signal request_quiz(zone: String)
signal panel_closed

@onready var title_label: Label = $MarginContainer/VBoxContainer/Header/Title
@onready var icon_texture: TextureRect = $MarginContainer/VBoxContainer/Header/Icon
@onready var body_text: RichTextLabel = $MarginContainer/VBoxContainer/Body/Text
@onready var mini_game_button: Button = $MarginContainer/VBoxContainer/Actions/MiniGameButton
@onready var quiz_button: Button = $MarginContainer/VBoxContainer/Actions/QuizButton

var current_hotspot := {}

func _ready() -> void:
    hide()
    mini_game_button.connect("pressed", Callable(self, "_on_mini_game_pressed"))
    quiz_button.connect("pressed", Callable(self, "_on_quiz_pressed"))
    $MarginContainer/VBoxContainer/Actions/CloseButton.connect("pressed", Callable(self, "_on_close_pressed"))

func show_hotspot(data: Dictionary) -> void:
    current_hotspot = data
    title_label.text = data.get("title", "Hotspot")
    body_text.text = data.get("text", "")
    var icon_path := data.get("icon", "")
    if icon_path != "" and ResourceLoader.exists(icon_path):
        icon_texture.texture = ResourceLoader.load(icon_path)
    else:
        icon_texture.texture = null
    var mini_game := data.get("mini_game_id")
    mini_game_button.visible = mini_game != null and mini_game != ""
    mini_game_button.disabled = not mini_game_button.visible
    var zone := data.get("zone", "")
    quiz_button.visible = zone != ""
    show()

func _on_mini_game_pressed() -> void:
    if current_hotspot.has("mini_game_id") and current_hotspot["mini_game_id"]:
        emit_signal("request_minigame", str(current_hotspot["mini_game_id"]))

func _on_quiz_pressed() -> void:
    var zone := current_hotspot.get("zone", "")
    if zone != "":
        emit_signal("request_quiz", zone)

func _on_close_pressed() -> void:
    hide()
    emit_signal("panel_closed")
