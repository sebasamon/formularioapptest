extends Area3D

class_name Hotspot

signal hotspot_selected(data: Dictionary)

@export var hotspot_id := ""
@export var zone := ""

var data := {}
var _player_in_range := false
var _glow_material: StandardMaterial3D

func _ready() -> void:
    connect("body_entered", Callable(self, "_on_body_entered"))
    connect("body_exited", Callable(self, "_on_body_exited"))
    _glow_material = StandardMaterial3D.new()
    _glow_material.albedo_color = Color(1.0, 0.9, 0.4, 0.6)
    _glow_material.emission_enabled = true
    _glow_material.emission = Color(1.0, 0.8, 0.2)
    _glow_material.emission_energy = 2.0
    if has_node("GlowMesh"):
        var mesh_instance := get_node("GlowMesh") as MeshInstance3D
        mesh_instance.material_override = _glow_material

func set_data(new_data: Dictionary) -> void:
    data = new_data
    hotspot_id = data.get("id", hotspot_id)
    zone = data.get("zone", zone)
    if has_node("Billboard/Label3D"):
        get_node("Billboard/Label3D").text = data.get("title", "Hotspot")

func _process(delta: float) -> void:
    if has_node("Billboard"):
        get_node("Billboard").rotate_y(delta * 0.2)
    if _glow_material:
        var t := sin(Time.get_ticks_msec() / 250.0)
        _glow_material.emission_energy = 1.4 + t * 0.6

func focus_changed(is_focused: bool) -> void:
    _player_in_range = is_focused
    if has_node("Billboard/Prompt"):
        get_node("Billboard/Prompt").visible = is_focused

func trigger_interaction() -> void:
    emit_signal("hotspot_selected", data)

func _on_body_entered(body: Node) -> void:
    if body.has_method("register_hotspot"):
        body.register_hotspot(self)

func _on_body_exited(body: Node) -> void:
    if body.has_method("unregister_hotspot"):
        body.unregister_hotspot(self)
    focus_changed(false)
