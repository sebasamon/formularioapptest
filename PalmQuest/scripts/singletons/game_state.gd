extends Node

## Tracks persistent player progress such as badges, quiz results, and settings.

signal badge_unlocked(zone: String)
signal quiz_completed(zone: String, score: int, passed: bool)
signal minigame_score_updated(game_id: String, score: int)

const SAVE_PATH := "user://palmquest.cfg"

var badges := {}
var quiz_results := {}
var minigame_scores := {}
var xp := 0
var muted := false

func _ready() -> void:
    load_state()

func reset() -> void:
    badges.clear()
    quiz_results.clear()
    minigame_scores.clear()
    xp = 0
    muted = false
    save_state()

func load_state() -> void:
    var cfg := ConfigFile.new()
    var err := cfg.load(SAVE_PATH)
    if err != OK:
        return
    badges = cfg.get_value("progress", "badges", {})
    quiz_results = cfg.get_value("progress", "quiz_results", {})
    minigame_scores = cfg.get_value("progress", "minigame_scores", {})
    xp = cfg.get_value("progress", "xp", 0)
    muted = cfg.get_value("settings", "muted", false)

func save_state() -> void:
    var cfg := ConfigFile.new()
    cfg.set_value("progress", "badges", badges)
    cfg.set_value("progress", "quiz_results", quiz_results)
    cfg.set_value("progress", "minigame_scores", minigame_scores)
    cfg.set_value("progress", "xp", xp)
    cfg.set_value("settings", "muted", muted)
    var err := cfg.save(SAVE_PATH)
    if err != OK:
        push_error("GameState: failed to save %s" % SAVE_PATH)

func unlock_badge(zone: String, amount_xp: int = 50) -> void:
    if badges.get(zone, false):
        return
    badges[zone] = true
    xp += amount_xp
    save_state()
    emit_signal("badge_unlocked", zone)

func has_badge(zone: String) -> bool:
    return badges.get(zone, false)

func record_quiz(zone: String, score: int, passed: bool) -> void:
    quiz_results[zone] = {
        "score": score,
        "passed": passed,
        "timestamp": Time.get_unix_time_from_system()
    }
    if passed:
        unlock_badge(zone, 75)
    else:
        save_state()
    emit_signal("quiz_completed", zone, score, passed)

func get_quiz_result(zone: String) -> Dictionary:
    return quiz_results.get(zone, {})

func record_minigame_score(game_id: String, score: int) -> void:
    var best := minigame_scores.get(game_id, 0)
    if score > best:
        minigame_scores[game_id] = score
        xp += int(score / 5)
        save_state()
    else:
        save_state()
    emit_signal("minigame_score_updated", game_id, score)

func get_minigame_score(game_id: String) -> int:
    return minigame_scores.get(game_id, 0)

func total_badges() -> int:
    return badges.size()

func all_badges_unlocked(required_zones: Array) -> bool:
    for zone in required_zones:
        if not badges.get(zone, false):
            return false
    return true

func set_muted(value: bool) -> void:
    muted = value
    save_state()

func is_muted() -> bool:
    return muted
