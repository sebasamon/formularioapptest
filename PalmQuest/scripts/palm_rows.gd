extends MultiMeshInstance3D

@export var rows := 5
@export var columns := 8
@export var spacing := Vector3(6, 0, 6)

func _ready() -> void:
    if multimesh == null:
        multimesh = MultiMesh.new()
    if multimesh.mesh == null:
        var mesh := CylinderMesh.new()
        mesh.radius = 0.35
        mesh.height = 6.0
        var material := StandardMaterial3D.new()
        material.albedo_color = Color(0.4, 0.28, 0.18)
        mesh.material = material
        multimesh.mesh = mesh
    multimesh.instance_count = rows * columns
    var index := 0
    for r in range(rows):
        for c in range(columns):
            var x := (c - columns / 2.0) * spacing.x
            var z := (r - rows / 2.0) * spacing.z
            var transform := Transform3D(Basis(), Vector3(x, 3.0, z))
            multimesh.set_instance_transform(index, transform)
            index += 1
