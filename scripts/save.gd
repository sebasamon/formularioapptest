extends Node

class_name SaveState

const SAVE_PATH := "user://save.cfg"

var hotspots_seen: Dictionary = {}
var best_score: int = 0
var quiz_passed: bool = false

func load_state() -> void:
    var config := ConfigFile.new()
    var err := config.load(SAVE_PATH)
    if err == OK:
        hotspots_seen = config.get_value("progress", "hotspots", {})
        best_score = config.get_value("progress", "best_score", 0)
        quiz_passed = config.get_value("progress", "quiz_passed", false)
    else:
        hotspots_seen = {}
        best_score = 0
        quiz_passed = false

func save_state() -> void:
    var config := ConfigFile.new()
    config.set_value("progress", "hotspots", hotspots_seen)
    config.set_value("progress", "best_score", best_score)
    config.set_value("progress", "quiz_passed", quiz_passed)
    config.save(SAVE_PATH)

func mark_hotspot(hotspot_id: String) -> void:
    hotspots_seen[hotspot_id] = true
    save_state()

func update_best_score(score: int) -> void:
    if score > best_score:
        best_score = score
        save_state()

func set_quiz_passed(passed: bool) -> void:
    quiz_passed = passed
    save_state()

func all_hotspots_seen(required_ids: Array[String]) -> bool:
    for id in required_ids:
        if not hotspots_seen.get(id, false):
            return false
    return true
