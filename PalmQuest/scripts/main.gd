extends Node

@onready var training_plot := $TrainingPlot
@onready var hud := $MainHUD

func _ready() -> void:
    var player := training_plot.get_node("Player")
    var hotspot_manager := training_plot.get_node("HotspotManager")
    hud.setup(player, hotspot_manager)
