extends CharacterBody2D

@export var move_speed: float = 120.0

signal hotspot_changed(hotspot)
signal interact_requested(hotspot)

var current_hotspot: Node = null

func _ready() -> void:
    Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)

func _physics_process(delta: float) -> void:
    var input_vector := Vector2(
        Input.get_action_strength("move_right") - Input.get_action_strength("move_left"),
        Input.get_action_strength("move_down") - Input.get_action_strength("move_up")
    )
    if input_vector.length_squared() > 1.0:
        input_vector = input_vector.normalized()
    velocity = input_vector * move_speed
    move_and_slide()

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("interact") and current_hotspot:
        emit_signal("interact_requested", current_hotspot)

func set_current_hotspot(hotspot: Node) -> void:
    current_hotspot = hotspot
    emit_signal("hotspot_changed", hotspot)

func clear_hotspot(hotspot: Node) -> void:
    if hotspot == current_hotspot:
        current_hotspot = null
        emit_signal("hotspot_changed", null)
