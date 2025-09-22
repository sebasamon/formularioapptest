extends Node3D

signal hotspot_selected(data: Dictionary)

@export var hotspot_scene: PackedScene

var hotspots := {}

func _ready() -> void:
    _spawn_hotspots()

func _spawn_hotspots() -> void:
    var entries := DataService.get_hotspots()
    if entries.is_empty():
        push_warning("HotspotManager: no hotspot data found")
        return
    for entry in entries:
        if hotspot_scene:
            var instance := hotspot_scene.instantiate()
            add_child(instance)
            var pos := entry.get("position", [0, 0, 0])
            if pos is Array and pos.size() >= 3:
                instance.global_transform.origin = Vector3(pos[0], pos[1], pos[2])
            instance.set_data(entry)
            instance.connect("hotspot_selected", Callable(self, "_on_hotspot_selected"))
            hotspots[entry.get("id", "hotspot")] = instance

func _on_hotspot_selected(data: Dictionary) -> void:
    emit_signal("hotspot_selected", data)
