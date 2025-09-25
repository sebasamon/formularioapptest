using System.Collections.Generic;
using UnityEngine;

public static class SpriteFactory
{
    public enum SpriteKind
    {
        Player,
        Ground,
        Tree,
        Hotspot
    }

    private static readonly Dictionary<SpriteKind, Sprite> Cache = new Dictionary<SpriteKind, Sprite>();

    public static Sprite Get(SpriteKind kind)
    {
        if (Cache.TryGetValue(kind, out Sprite sprite))
        {
            return sprite;
        }

        sprite = CreateSprite(kind);
        Cache[kind] = sprite;
        return sprite;
    }

    private static Sprite CreateSprite(SpriteKind kind)
    {
        Texture2D texture = new Texture2D(16, 16)
        {
            filterMode = FilterMode.Point,
            wrapMode = TextureWrapMode.Clamp
        };

        switch (kind)
        {
            case SpriteKind.Player:
                FillTexture(texture, new Color(0.1f, 0.6f, 0.9f));
                break;
            case SpriteKind.Ground:
                FillTexture(texture, new Color(0.2f, 0.5f, 0.2f));
                break;
            case SpriteKind.Tree:
                FillTree(texture);
                break;
            case SpriteKind.Hotspot:
                FillHotspot(texture);
                break;
        }

        texture.Apply();
        return Sprite.Create(texture, new Rect(0f, 0f, texture.width, texture.height), new Vector2(0.5f, 0.5f), 16f);
    }

    private static void FillTexture(Texture2D texture, Color color)
    {
        Color[] pixels = new Color[texture.width * texture.height];
        for (int i = 0; i < pixels.Length; i++)
        {
            pixels[i] = color;
        }

        texture.SetPixels(pixels);
    }

    private static void FillTree(Texture2D texture)
    {
        for (int y = 0; y < texture.height; y++)
        {
            for (int x = 0; x < texture.width; x++)
            {
                Color color = y > texture.height / 2
                    ? new Color(0.0f, 0.4f, 0.0f)
                    : new Color(0.4f, 0.25f, 0.1f);
                texture.SetPixel(x, y, color);
            }
        }
    }

    private static void FillHotspot(Texture2D texture)
    {
        Vector2 center = new Vector2(texture.width - 1, texture.height - 1) * 0.5f;
        float maxDistance = Mathf.Max(texture.width, texture.height) * 0.5f;
        for (int y = 0; y < texture.height; y++)
        {
            for (int x = 0; x < texture.width; x++)
            {
                float distance = Vector2.Distance(new Vector2(x, y), center);
                float t = Mathf.Clamp01(1f - distance / maxDistance);
                Color color = Color.Lerp(new Color(0.8f, 0.4f, 0.1f), new Color(1f, 0.8f, 0.2f), t);
                texture.SetPixel(x, y, color);
            }
        }
    }
}
