extends Control

signal closed
signal action_pressed

@onready var title_label: Label = $Panel/VBoxContainer/Title
@onready var description_label: Label = $Panel/VBoxContainer/Description
@onready var action_button: Button = $Panel/VBoxContainer/ActionButton
@onready var close_button: Button = $Panel/VBoxContainer/CloseButton

func _ready() -> void:
    action_button.pressed.connect(_on_action_button_pressed)
    close_button.pressed.connect(_on_close_button_pressed)

func set_content(title: String, description: String, action_text: String) -> void:
    title_label.text = title
    description_label.text = description
    action_button.text = action_text

func _on_action_button_pressed() -> void:
    emit_signal("action_pressed")

func _on_close_button_pressed() -> void:
    hide()
    emit_signal("closed")
