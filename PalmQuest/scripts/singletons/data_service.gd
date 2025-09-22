extends Node

## Provides access to static game data stored in JSON files under `res://data`.
class_name DataService

var _cache := {}

func _ready() -> void:
    _cache.clear()

func _load_json(path: String) -> Dictionary:
    if _cache.has(path):
        return _cache[path]
    var full_path := "res://data/%s" % path
    if not FileAccess.file_exists(full_path):
        push_error("DataService: missing file %s" % full_path)
        return {}
    var content := FileAccess.get_file_as_string(full_path)
    var parser := JSON.new()
    var error := parser.parse(content)
    if error != OK:
        push_error("DataService: failed to parse %s: %s" % [full_path, parser.get_error_message()])
        return {}
    var data := parser.get_data()
    if typeof(data) != TYPE_DICTIONARY:
        push_warning("DataService: root of %s is not a dictionary" % full_path)
        data = {}
    _cache[path] = data
    return data

func get_hotspots() -> Array:
    var data := _load_json("hotspots.json")
    return data.get("hotspots", [])

func get_quiz(zone: String) -> Dictionary:
    var quizzes := _load_json("quizzes.json")
    var zones := quizzes.get("zones", {})
    return zones.get(zone, {})

func get_all_quizzes() -> Dictionary:
    var quizzes := _load_json("quizzes.json")
    return quizzes.get("zones", {})

func get_minigame_config(id: String) -> Dictionary:
    var games := _load_json("minigames.json")
    var mini := games.get("mini_games", {})
    return mini.get(id, {})

func get_glossary() -> Dictionary:
    var glossary := _load_json("glossary.json")
    return glossary.get("terms", {})

func get_production_demo() -> Dictionary:
    return _load_json("production_demo.json")

func reload() -> void:
    _cache.clear()
