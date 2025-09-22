extends Control

signal score_updated(score: int)
signal game_finished(result: Dictionary)

@onready var grid: GridContainer = $Panel/BunchContainer
@onready var info_label: Label = $Panel/Info

var _config := {}
var _bunch_data := []
var _selections := {}
var _target_loose := 2
var _score := 0

func _ready() -> void:
    set_process(false)

func setup(config: Dictionary) -> void:
    _config = config
    _target_loose = int(config.get("loose_fruit_threshold", 2))
    _bunch_data.clear()
    _selections.clear()
    _score = 0
    for child in grid.get_children():
        child.queue_free()
    var count := int(config.get("max_bunches", 12))
    for i in range(count):
        var data := _generate_bunch_data()
        _bunch_data.append(data)
        var button := Button.new()
        button.toggle_mode = true
        button.text = _format_bunch_text(data)
        button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        button.size_flags_vertical = Control.SIZE_EXPAND_FILL
        button.modulate = data.get("color", Color.WHITE)
        button.connect("toggled", Callable(self, "_on_bunch_toggled").bind(i))
        grid.add_child(button)
    info_label.text = "Select bunches with warm orange fruit and %d loose fruitlets." % _target_loose
    emit_signal("score_updated", _score)

func _generate_bunch_data() -> Dictionary:
    var loose := randi_range(0, 4)
    var stage := "ripe"
    if loose < _target_loose:
        stage = "unripe"
    elif loose > _target_loose:
        stage = "overripe"
    var color := stage == "ripe" ? Color(0.85, 0.4, 0.1) : stage == "overripe" ? Color(0.5, 0.2, 0.05) : Color(0.3, 0.6, 0.2)
    return {
        "loose": loose,
        "stage": stage,
        "color": color
    }

func _format_bunch_text(data: Dictionary) -> String:
    return "%s\nLoose: %d" % [data.get("stage", "ripe").capitalize(), data.get("loose", 0)]

func _on_bunch_toggled(pressed: bool, index: int) -> void:
    _selections[index] = pressed
    _update_score()

func _update_score() -> void:
    var correct := 0
    var total_targets := 0
    for i in range(_bunch_data.size()):
        var data := _bunch_data[i]
        var is_target := data.get("stage", "") == "ripe"
        if is_target:
            total_targets += 1
        var selected := _selections.get(i, false)
        if selected and is_target:
            correct += 1
        elif selected and not is_target:
            correct -= 1
    var accuracy := 0.0
    if total_targets > 0:
        accuracy = max(0.0, float(correct) / float(total_targets))
    _score = int(clamp(accuracy * 100.0, 0.0, 100.0))
    emit_signal("score_updated", _score)

func get_accuracy() -> float:
    if _bunch_data.is_empty():
        return 0.0
    return clamp(float(_score) / 100.0, 0.0, 1.0)

func get_score() -> int:
    return _score

func update_time(time_left: float) -> void:
    if time_left <= 10:
        info_label.text = "Final checks! Confirm only bunches with %d loose fruits." % _target_loose
