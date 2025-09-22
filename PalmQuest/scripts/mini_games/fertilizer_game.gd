extends Control

signal score_updated(score: int)
signal game_finished(result: Dictionary)

@onready var total_label: Label = $Panel/Info/TotalLabel
@onready var feedback_label: Label = $Panel/Info/Feedback
@onready var bag_container: HBoxContainer = $Panel/Bags
@onready var selection_list: VBoxContainer = $Panel/Selections/List
@onready var reset_button: Button = $Panel/Selections/Buttons/ResetButton
@onready var undo_button: Button = $Panel/Selections/Buttons/UndoButton

var _config := {}
var _target := 0.0
var _tolerance := 0.0
var _total := 0.0
var _score := 0
var _bags := []

func _ready() -> void:
    reset_button.connect("pressed", Callable(self, "_on_reset"))
    undo_button.connect("pressed", Callable(self, "_on_undo"))

func setup(config: Dictionary) -> void:
    _config = config
    _target = float(config.get("target_kg_per_ha", 160))
    _tolerance = float(config.get("tolerance", 8))
    _total = 0.0
    _score = 0
    _bags.clear()
    for child in bag_container.get_children():
        child.queue_free()
    var bag_sizes := config.get("bag_sizes", [10, 15, 20, 25])
    for size in bag_sizes:
        var button := Button.new()
        button.text = "%sg" % str(size)
        button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        button.connect("pressed", Callable(self, "_on_bag_selected").bind(float(size)))
        bag_container.add_child(button)
    _clear_selection()
    _update_labels()

func _on_bag_selected(weight: float) -> void:
    _bags.append(weight)
    _total += weight
    var entry := Label.new()
    entry.text = "+ %.1f kg" % weight
    selection_list.add_child(entry)
    _update_labels()

func _on_reset() -> void:
    _bags.clear()
    _total = 0.0
    _clear_selection()
    _update_labels()

func _on_undo() -> void:
    if _bags.is_empty():
        return
    var removed := _bags.pop_back()
    _total -= removed
    if selection_list.get_child_count() > 0:
        selection_list.get_child(selection_list.get_child_count() - 1).queue_free()
    _update_labels()

func _clear_selection() -> void:
    for child in selection_list.get_children():
        child.queue_free()

func _update_labels() -> void:
    total_label.text = "Total: %.1f kg/ha (target %.1f ± %.1f)" % [_total, _target, _tolerance]
    var diff := abs(_total - _target)
    if diff <= _tolerance:
        feedback_label.text = "Within target zone!"
        _score = int(max(0.0, 100.0 - diff))
    else:
        feedback_label.text = "Adjust mix to reach target."
        _score = int(max(0.0, 100.0 - diff * 0.8))
    emit_signal("score_updated", _score)

func get_total() -> float:
    return _total

func get_score() -> int:
    return _score
