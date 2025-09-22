extends Node2D

@onready var tile_map: TileMap = $TileMap
@onready var player: CharacterBody2D = $Player
@onready var hotspots_parent: Node = $Hotspots

var ground_source_id: int = -1
var placeholder_texture: Texture2D

func _ready() -> void:
    randomize()
    _setup_tilemap()
    _apply_hotspot_markers()

func _setup_tilemap() -> void:
    var image := Image.create(16, 16, false, Image.FORMAT_RGBA8)
    image.fill(Color(0.12, 0.35, 0.16, 1))
    placeholder_texture = ImageTexture.create_from_image(image)
    var atlas := TileSetAtlasSource.new()
    atlas.texture = placeholder_texture
    atlas.texture_region_size = Vector2i(16, 16)
    atlas.create_tile(Vector2i.ZERO)
    var tile_set := TileSet.new()
    ground_source_id = tile_set.add_source(atlas)
    tile_map.tile_set = tile_set
    tile_map.clear()
    for x in range(20):
        for y in range(15):
            tile_map.set_cell(0, Vector2i(x, y), ground_source_id, Vector2i.ZERO)

func _apply_hotspot_markers() -> void:
    for hotspot in get_hotspots():
        if hotspot.has_node("Marker"):
            var marker := hotspot.get_node("Marker")
            if marker is Sprite2D:
                marker.texture = placeholder_texture
                marker.scale = Vector2(1.5, 1.5)

func get_player() -> CharacterBody2D:
    return player

func get_hotspots() -> Array:
    return hotspots_parent.get_children()
