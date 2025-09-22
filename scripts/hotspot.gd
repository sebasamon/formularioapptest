extends Area2D

@export var hotspot_id: String = ""
@export var title: String = ""
@export_multiline var description: String = ""
@export var icon: String = ""

signal interacted(hotspot_id)

func _ready() -> void:
    body_entered.connect(_on_body_entered)
    body_exited.connect(_on_body_exited)

func _on_body_entered(body: Node) -> void:
    if body is CharacterBody2D and body.has_method("set_current_hotspot"):
        body.set_current_hotspot(self)

func _on_body_exited(body: Node) -> void:
    if body is CharacterBody2D and body.has_method("clear_hotspot"):
        body.clear_hotspot(self)

func trigger_interaction() -> void:
    emit_signal("interacted", hotspot_id)
