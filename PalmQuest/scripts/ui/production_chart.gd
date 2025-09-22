extends Control

var _months: Array = []
var _ffb: Array = []
var _oer: Array = []
var _prices: Array = []
var _targets := {}

func set_data(data: Dictionary) -> void:
    var monthly := data.get("monthly", [])
    _months.clear()
    _ffb.clear()
    _oer.clear()
    _prices.clear()
    for entry in monthly:
        _months.append(entry.get("month", ""))
        _ffb.append(float(entry.get("ffb_tonnes", 0)))
        _oer.append(float(entry.get("oer_percent", 0)))
        _prices.append(float(entry.get("cpo_price_usd", 0)))
    _targets = data.get("targets", {})
    update()

func _draw() -> void:
    if _months.is_empty():
        return
    var rect := Rect2(Vector2(30, 20), size - Vector2(60, 60))
    draw_rect(rect, Color(0, 0, 0, 0), false, Color(0.2, 0.4, 0.3))
    var max_ffb := 1.0
    for value in _ffb:
        max_ffb = max(max_ffb, value)
    var max_price := 1.0
    for value in _prices:
        max_price = max(max_price, value)
    var min_oer := _oer[0]
    var max_oer := _oer[0]
    for value in _oer:
        min_oer = min(min_oer, value)
        max_oer = max(max_oer, value)
    if _targets.has("oer_percent"):
        min_oer = min(min_oer, float(_targets["oer_percent"]))
        max_oer = max(max_oer, float(_targets["oer_percent"]))
    if max_oer == min_oer:
        max_oer += 1.0
    var count := _months.size()
    var step := rect.size.x / max(count, 1)
    var font := get_theme_default_font()
    var font_size := 14

    for i in range(count):
        var bar_height := (_ffb[i] / max_ffb) * rect.size.y * 0.6
        var bar_rect := Rect2(rect.position + Vector2(i * step + step * 0.15, rect.position.y + rect.size.y * 0.6 - bar_height), Vector2(step * 0.3, bar_height))
        draw_rect(bar_rect, Color(0.3, 0.7, 0.4, 0.8))

        var price_height := (_prices[i] / max_price) * rect.size.y * 0.3
        var price_rect := Rect2(rect.position + Vector2(i * step + step * 0.55, rect.position.y + rect.size.y * 0.3 - price_height), Vector2(step * 0.25, price_height))
        draw_rect(price_rect, Color(0.9, 0.6, 0.4, 0.7))

        var label_pos := Vector2(rect.position.x + i * step + step * 0.1, rect.end.y + 18)
        draw_string(font, label_pos, _months[i], HORIZONTAL_ALIGNMENT_LEFT, step * 0.8, font_size, Color(0.1, 0.2, 0.1))

    var line_points := PackedVector2Array()
    for i in range(count):
        var ratio := (_oer[i] - min_oer) / (max_oer - min_oer)
        var y := rect.position.y + rect.size.y - ratio * rect.size.y
        line_points.append(Vector2(rect.position.x + i * step + step * 0.5, y))
    if line_points.size() > 1:
        draw_polyline(line_points, Color(0.2, 0.4, 0.8), 2.0)

    if _targets.has("oer_percent"):
        var ratio_target := (float(_targets["oer_percent"]) - min_oer) / (max_oer - min_oer)
        var y_target := rect.position.y + rect.size.y - ratio_target * rect.size.y
        draw_line(Vector2(rect.position.x, y_target), Vector2(rect.end.x, y_target), Color(0.8, 0.2, 0.2), 1.5)
        draw_string(font, Vector2(rect.end.x - 120, y_target - 6), "OER Target", HORIZONTAL_ALIGNMENT_LEFT, 120, font_size, Color(0.8, 0.2, 0.2))

    draw_string(font, rect.position - Vector2(0, 8), "FFB (green) vs Price (amber) — OER line", HORIZONTAL_ALIGNMENT_LEFT, rect.size.x, font_size, Color(0.15, 0.15, 0.15))
