extends Control

signal finished(passed: bool, score: int)

const PASS_SCORE := 4

var questions := [
    {
        "question": "¿Cuál agente ayuda a polinizar las flores de palma?",
        "choices": ["Solo el viento", "Insectos específicos", "Riego por aspersión", "Fertilizante granular"],
        "answer": 1,
        "why": "Los insectos polinizadores transportan el polen entre inflorescencias."
    },
    {
        "question": "¿Cuándo aplicar fertilizante principal?",
        "choices": ["Solo en temporada seca", "Cuando el suelo está saturado", "Según análisis y etapa del cultivo", "Al azar cada semana"],
        "answer": 2,
        "why": "La nutrición responde a análisis de suelo y fase de crecimiento."
    },
    {
        "question": "¿Qué controla el calendario de cultivo?",
        "choices": ["Solo cosecha", "Actividades anuales planificadas", "Precio de venta", "El clima diario"],
        "answer": 1,
        "why": "El calendario organiza las labores a lo largo del año."
    },
    {
        "question": "¿Qué indica un racimo listo?",
        "choices": ["Frutos muy verdes", "Color rojizo uniforme", "Frutos secos", "Tronco brillante"],
        "answer": 1,
        "why": "El color rojizo y frutos sueltos señalan madurez adecuada."
    },
    {
        "question": "¿Por qué registrar producción?",
        "choices": ["Para decorar", "Para ajustar manejo y ventas", "Para competir", "Para descartar lotes"],
        "answer": 1,
        "why": "Los registros ayudan a tomar decisiones y mejorar rendimientos."
    }
]

var current_index := 0
var correct_count := 0
var question_resolved := false
var result_reported := false

@onready var question_label: Label = $Panel/VBoxContainer/Question
@onready var options_container: VBoxContainer = $Panel/VBoxContainer/Options
@onready var feedback_label: Label = $Panel/VBoxContainer/Feedback
@onready var next_button: Button = $Panel/VBoxContainer/NextButton
@onready var finish_panel: VBoxContainer = $Panel/VBoxContainer/FinishPanel
@onready var summary_label: Label = $Panel/VBoxContainer/FinishPanel/Summary
@onready var exit_button: Button = $Panel/VBoxContainer/FinishPanel/ExitButton

func _ready() -> void:
    next_button.pressed.connect(_on_next_pressed)
    exit_button.pressed.connect(_on_exit_pressed)
    for button in options_container.get_children():
        if button is Button:
            button.pressed.connect(_on_option_pressed.bind(button))
    reset()

func reset() -> void:
    current_index = 0
    correct_count = 0
    question_resolved = false
    result_reported = false
    finish_panel.hide()
    next_button.disabled = false
    next_button.text = "Siguiente"
    feedback_label.text = ""
    _show_question()

func start_quiz() -> void:
    reset()
    show()

func _show_question() -> void:
    question_resolved = false
    feedback_label.text = ""
    finish_panel.hide()
    if current_index >= questions.size():
        _finish_quiz()
        return
    var data = questions[current_index]
    question_label.text = "Pregunta %d/5: %s" % [current_index + 1, data["question"]]
    var idx := 0
    for button in options_container.get_children():
        if button is Button:
            button.disabled = false
            button.text = chr(65 + idx) + ") " + data["choices"][idx]
            idx += 1

func _on_option_pressed(button: Button) -> void:
    if question_resolved:
        return
    var index := options_container.get_children().find(button)
    if index == -1:
        return
    var data = questions[current_index]
    question_resolved = true
    for child in options_container.get_children():
        if child is Button:
            child.disabled = true
    if index == data["answer"]:
        correct_count += 1
        feedback_label.text = "✔ Correcto. " + data["why"]
    else:
        feedback_label.text = "✖ Incorrecto. " + data["why"]
    if current_index == questions.size() - 1:
        next_button.text = "Resultados"

func _on_next_pressed() -> void:
    if not question_resolved:
        feedback_label.text = "Selecciona una opción."
        return
    current_index += 1
    if current_index >= questions.size():
        _finish_quiz()
    else:
        _show_question()

func _finish_quiz() -> void:
    finish_panel.show()
    var passed := correct_count >= PASS_SCORE
    summary_label.text = "Aciertos: %d/5\nResultado: %s" % [correct_count, passed ? "¡Aprobado!" : "Repite el repaso."]
    if not result_reported:
        result_reported = true
        emit_signal("finished", passed, correct_count)

func _on_exit_pressed() -> void:
    hide()
    if not result_reported:
        result_reported = true
        emit_signal("finished", correct_count >= PASS_SCORE, correct_count)
