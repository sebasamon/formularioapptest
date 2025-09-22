extends Control

signal score_updated(score: int)
signal game_finished(result: Dictionary)

@onready var net: ColorRect = $Panel/Net
@onready var beetle_container: Node = $Panel/Beetles
@onready var info_label: Label = $Panel/Info

var _config := {}
var _score := 0
var _spawn_timer := 0.0
var _spawn_interval := 1.0
var _time_total := 45.0
var _time_left := 45.0

func _ready() -> void:
    set_process(false)

func setup(config: Dictionary) -> void:
    _config = config
    _score = 0
    _spawn_interval = float(config.get("spawn_interval", 1.0))
    _time_total = float(config.get("time_limit", 45.0))
    _time_left = _time_total
    info_label.text = "Capture beetles carrying pollen. Use WASD to move the net."
    net.position = Vector2(50, rect_size().y / 2)
    _clear_beetles()
    emit_signal("score_updated", _score)
    set_process(true)

func rect_size() -> Vector2:
    return $Panel.size

func _process(delta: float) -> void:
    _spawn_timer += delta
    if _spawn_timer >= _spawn_interval:
        _spawn_timer = 0.0
        _spawn_beetle()
    _handle_input(delta)
    _update_beetles(delta)

func update_time(time_left: float) -> void:
    _time_left = max(time_left, 0.0)
    var optimal_start := float(_config.get("optimal_window_start", 0))
    var optimal_end := float(_config.get("optimal_window_end", 999))
    var elapsed := _time_total - _time_left
    if elapsed >= optimal_start and elapsed <= optimal_end:
        info_label.text = "Perfect timing! Beetles swarm receptive blooms."
        $Panel.color = Color(0.2, 0.5, 0.3, 0.15)
    else:
        info_label.text = "Wait for optimal dawn humidity to peak."
        $Panel.color = Color(0.4, 0.3, 0.1, 0.15)

func get_score() -> int:
    return _score

func _handle_input(delta: float) -> void:
    var move := Vector2.ZERO
    if Input.is_action_pressed("move_left"):
        move.x -= 1
    if Input.is_action_pressed("move_right"):
        move.x += 1
    if Input.is_action_pressed("move_forward"):
        move.y -= 1
    if Input.is_action_pressed("move_back"):
        move.y += 1
    if move != Vector2.ZERO:
        move = move.normalized() * 220 * delta
        net.position += move
        var panel_rect := Rect2(Vector2.ZERO, rect_size())
        net.position = net.position.clamp(panel_rect.position, panel_rect.end - net.size)

func _spawn_beetle() -> void:
    var beetle := ColorRect.new()
    beetle.color = Color(1.0, 0.8, 0.2, 0.9)
    beetle.size = Vector2(24, 24)
    var x := randf_range(0, rect_size().x - beetle.size.x)
    beetle.position = Vector2(x, -beetle.size.y)
    beetle.set_meta("velocity", Vector2(randf_range(-20, 20), randf_range(110, 170)))
    beetle_container.add_child(beetle)

func _update_beetles(delta: float) -> void:
    var net_rect := Rect2(net.position, net.size)
    for beetle in beetle_container.get_children():
        var vel: Vector2 = beetle.get_meta("velocity")
        beetle.position += vel * delta
        if beetle.position.y > rect_size().y:
            beetle.queue_free()
            continue
        if net_rect.has_point(beetle.position + beetle.size * 0.5):
            _score += 1
            emit_signal("score_updated", _score)
            beetle.queue_free()

func _clear_beetles() -> void:
    for beetle in beetle_container.get_children():
        beetle.queue_free()
