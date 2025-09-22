extends Control

signal panel_closed

@onready var badge_label: Label = $MarginContainer/VBoxContainer/Header/BadgeSummary
@onready var summary_label: RichTextLabel = $MarginContainer/VBoxContainer/Body/Summary
@onready var chart: Control = $MarginContainer/VBoxContainer/Body/ChartContainer/ProductionChart
@onready var close_button: Button = $MarginContainer/VBoxContainer/Header/CloseButton

var _data := {}

func _ready() -> void:
    hide()
    close_button.connect("pressed", Callable(self, "_on_close_pressed"))

func show_dashboard() -> void:
    _data = DataService.get_production_demo()
    if chart.has_method("set_data"):
        chart.set_data(_data)
    var total_badges := GameState.total_badges()
    badge_label.text = "Badges earned: %d" % total_badges
    var glossary := DataService.get_glossary()
    summary_label.text = "[center][b]Monthly Insights[/b][/center]\n"
    summary_label.text += "Average OER: %.1f%%" % _average(_data.get("monthly", []), "oer_percent") + "\n"
    summary_label.text += "Average FFB: %.0f tonnes" % _average(_data.get("monthly", []), "ffb_tonnes") + "\n"
    summary_label.text += "Terms: [b]FFB[/b] - %s\n" % glossary.get("FFB", "Fresh Fruit Bunch")
    summary_label.text += "[b]OER[/b] - %s" % glossary.get("OER", "Oil Extraction Rate")
    show()

func _average(entries: Array, key: String) -> float:
    if entries.is_empty():
        return 0.0
    var total := 0.0
    for entry in entries:
        total += float(entry.get(key, 0))
    return total / entries.size()

func _on_close_pressed() -> void:
    hide()
    emit_signal("panel_closed")
