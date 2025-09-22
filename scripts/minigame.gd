extends Control

signal finished(score: int)

const DURATION_SECONDS := 35.0
const STATE_UNRIPE := 0
const STATE_RIPE := 1
const STATE_OVER := 2

var time_left := DURATION_SECONDS
var score := 0
var running := false
var bunch_states: Array[int] = []
var end_reported := false

@onready var timer_label: Label = $Panel/VBoxContainer/Header/TimerLabel
@onready var score_label: Label = $Panel/VBoxContainer/Header/ScoreLabel
@onready var status_label: Label = $Panel/VBoxContainer/StatusLabel
@onready var bunch_container: HBoxContainer = $Panel/VBoxContainer/BunchContainer
@onready var finish_panel: VBoxContainer = $Panel/VBoxContainer/FinishPanel
@onready var retry_button: Button = $Panel/VBoxContainer/FinishPanel/RetryButton
@onready var exit_button: Button = $Panel/VBoxContainer/FinishPanel/ExitButton
@onready var start_hint: Label = $Panel/VBoxContainer/StartHint

func _ready() -> void:
    finish_panel.hide()
    retry_button.pressed.connect(_on_retry_pressed)
    exit_button.pressed.connect(_on_exit_pressed)
    _setup_buttons()
    reset_state()

func _setup_buttons() -> void:
    bunch_states.clear()
    for button in bunch_container.get_children():
        if button is Button:
            button.pressed.connect(_on_bunch_pressed.bind(button))
            bunch_states.append(STATE_UNRIPE)

func begin() -> void:
    score = 0
    time_left = DURATION_SECONDS
    running = true
    end_reported = false
    finish_panel.hide()
    start_hint.hide()
    status_label.text = "¡Corta solo los racimos listos!"
    _randomize_bunches()
    set_process(true)

func _process(delta: float) -> void:
    if not running:
        return
    time_left -= delta
    if time_left <= 0.0:
        time_left = 0.0
        _finish_game()
    else:
        if bunch_states.size() > 0 and randi_range(0, 100) < 4:
            _randomize_single(randi_range(0, bunch_states.size() - 1))
    _update_ui()

func _update_ui() -> void:
    timer_label.text = "Tiempo: %.0fs" % time_left
    score_label.text = "Puntaje: %d" % score

func _randomize_bunches() -> void:
    for i in bunch_states.size():
        _randomize_single(i)

func _randomize_single(index: int) -> void:
    if index < 0 or index >= bunch_states.size():
        return
    var child := bunch_container.get_child(index)
    if child is Button:
        var state := randi_range(0, 2)
        bunch_states[index] = state
        match state:
            STATE_UNRIPE:
                child.text = "Inmaduro"
                child.modulate = Color(0.85, 0.85, 0.2, 1)
            STATE_RIPE:
                child.text = "Listo"
                child.modulate = Color(0.2, 0.8, 0.35, 1)
            STATE_OVER:
                child.text = "Tarde"
                child.modulate = Color(0.5, 0.3, 0.15, 1)

func _on_bunch_pressed(button: Button) -> void:
    if not running:
        return
    var index := bunch_container.get_children().find(button)
    if index == -1:
        return
    var state := bunch_states[index]
    if state == STATE_RIPE:
        score += 1
        status_label.text = "¡Buen corte!"
    else:
        score -= 1
        status_label.text = "Ese racimo no estaba listo."
    _randomize_single(index)
    _update_ui()

func _finish_game() -> void:
    if end_reported:
        return
    running = false
    set_process(false)
    finish_panel.show()
    status_label.text = "Fin. Puntaje: %d" % score
    end_reported = true
    emit_signal("finished", score)

func _on_retry_pressed() -> void:
    begin()

func _on_exit_pressed() -> void:
    running = false
    set_process(false)
    finish_panel.hide()
    start_hint.show()
    if not end_reported:
        end_reported = true
        emit_signal("finished", score)
    hide()
    reset_state()

func reset_state() -> void:
    running = false
    set_process(false)
    start_hint.show()
    finish_panel.hide()
    score = 0
    time_left = DURATION_SECONDS
    end_reported = false
    status_label.text = "Listo para cosechar"
    _randomize_bunches()
    _update_ui()
