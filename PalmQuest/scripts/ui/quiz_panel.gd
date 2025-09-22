extends Control

signal quiz_completed(zone: String, score: int, passed: bool)
signal panel_closed

@onready var title_label: Label = $MarginContainer/VBoxContainer/Header/Title
@onready var question_label: RichTextLabel = $MarginContainer/VBoxContainer/Body/Question
@onready var options_container: VBoxContainer = $MarginContainer/VBoxContainer/Body/Options
@onready var feedback_label: Label = $MarginContainer/VBoxContainer/Body/Feedback
@onready var progress_label: Label = $MarginContainer/VBoxContainer/Header/Progress
@onready var next_button: Button = $MarginContainer/VBoxContainer/Footer/NextButton
@onready var close_button: Button = $MarginContainer/VBoxContainer/Footer/CloseButton

var _zone := ""
var _questions: Array = []
var _current_index := 0
var _score := 0
var _pass_score := 4
var _answered := false

func _ready() -> void:
    hide()
    next_button.connect("pressed", Callable(self, "_on_next_pressed"))
    close_button.connect("pressed", Callable(self, "_on_close_pressed"))

func show_quiz(zone: String) -> void:
    var quiz := DataService.get_quiz(zone)
    if quiz.is_empty():
        push_warning("QuizPanel: quiz not found for zone %s" % zone)
        return
    _zone = zone
    _questions = quiz.get("questions", []).duplicate(true)
    _questions.shuffle()
    _current_index = 0
    _score = 0
    _pass_score = int(quiz.get("pass_score", int(ceil(_questions.size() * 0.8))))
    title_label.text = quiz.get("title", "%s Quiz" % zone.capitalize())
    show()
    _show_question()

func _show_question() -> void:
    if _current_index >= _questions.size():
        _finish_quiz()
        return
    var question := _questions[_current_index]
    question_label.text = question.get("prompt", "")
    feedback_label.text = ""
    _clear_options()
    var options := question.get("options", [])
    for i in range(options.size()):
        var option_button := Button.new()
        option_button.text = options[i]
        option_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        option_button.connect("pressed", Callable(self, "_on_option_selected").bind(i, option_button))
        options_container.add_child(option_button)
    _answered = false
    next_button.disabled = true
    progress_label.text = "Question %d/%d" % [_current_index + 1, _questions.size()]

func _on_option_selected(index: int, button: Button) -> void:
    if _answered:
        return
    _answered = true
    var question := _questions[_current_index]
    var correct := int(question.get("correct_index", 0))
    var explanation := question.get("explanation", "")
    var i := 0
    for child in options_container.get_children():
        if child is Button:
            child.disabled = true
            if i == correct:
                child.add_theme_color_override("font_color", Color(0.1, 0.6, 0.2))
            i += 1
    if index == correct:
        _score += 1
        feedback_label.text = "Correct! %s" % explanation
    else:
        feedback_label.text = "Incorrect. %s" % explanation
        button.add_theme_color_override("font_color", Color(0.7, 0.1, 0.1))
    next_button.disabled = false

func _on_next_pressed() -> void:
    if not _answered:
        return
    _current_index += 1
    _show_question()

func _finish_quiz() -> void:
    var passed := _score >= _pass_score
    question_label.text = "You scored %d/%d." % [_score, _questions.size()]
    feedback_label.text = passed ? "Badge unlocked!" : "Try again for a better score."
    _clear_options()
    next_button.disabled = true
    emit_signal("quiz_completed", _zone, _score, passed)

func _on_close_pressed() -> void:
    hide()
    emit_signal("panel_closed")

func _clear_options() -> void:
    for child in options_container.get_children():
        child.queue_free()
