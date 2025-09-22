extends CharacterBody3D

signal hotspot_focused(hotspot)
signal hotspot_interacted(hotspot)

@export var speed := 4.5
@export var sprint_multiplier := 1.6
@export var gravity := 12.0
@export var mouse_sensitivity := 0.15

var _yaw := 0.0
var _pitch := 0.0
var _camera: Camera3D
var _hotspots: Array = []

func _ready() -> void:
    Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
    _camera = $Camera3D

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseMotion and Input.get_mouse_mode() == Input.MOUSE_MODE_CAPTURED:
        _yaw -= event.relative.x * mouse_sensitivity * 0.01
        _pitch -= event.relative.y * mouse_sensitivity * 0.01
        _pitch = clamp(_pitch, deg_to_rad(-80), deg_to_rad(75))
        rotation.y = _yaw
        _camera.rotation.x = _pitch
    elif event is InputEventKey and event.pressed and event.keycode == Key.ESCAPE:
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)

func _physics_process(delta: float) -> void:
    var input_dir := Vector3.ZERO
    var forward := -transform.basis.z
    var right := transform.basis.x

    if Input.is_action_pressed("move_forward"):
        input_dir += forward
    if Input.is_action_pressed("move_back"):
        input_dir -= forward
    if Input.is_action_pressed("move_left"):
        input_dir -= right
    if Input.is_action_pressed("move_right"):
        input_dir += right

    input_dir = input_dir.normalized()
    var target_speed := speed
    if Input.is_action_pressed("sprint"):
        target_speed *= sprint_multiplier

    var horizontal_velocity := input_dir * target_speed
    velocity.x = horizontal_velocity.x
    velocity.z = horizontal_velocity.z

    if not is_on_floor():
        velocity.y -= gravity * delta
    else:
        velocity.y = 0.0

    move_and_slide()

    if Input.is_action_just_pressed("interact"):
        _attempt_interact()

    _update_hotspot_focus()

func _attempt_interact() -> void:
    var hotspot = _get_primary_hotspot()
    if hotspot:
        emit_signal("hotspot_interacted", hotspot)

func register_hotspot(hotspot: Node) -> void:
    if hotspot not in _hotspots:
        _hotspots.append(hotspot)
        _update_hotspot_focus()

func unregister_hotspot(hotspot: Node) -> void:
    if hotspot in _hotspots:
        _hotspots.erase(hotspot)
        _update_hotspot_focus()

func _update_hotspot_focus() -> void:
    var hotspot = _get_primary_hotspot()
    emit_signal("hotspot_focused", hotspot)

func _get_primary_hotspot():
    var closest
    var closest_dist := INF
    for hotspot in _hotspots:
        if not is_instance_valid(hotspot):
            continue
        var dist := global_transform.origin.distance_to(hotspot.global_transform.origin)
        if dist < closest_dist:
            closest_dist = dist
            closest = hotspot
    return closest
