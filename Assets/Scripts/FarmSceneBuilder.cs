using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class FarmSceneBuilder : MonoBehaviour
{
    private HotspotUI hotspotUI;
    private PlayerController player;

    private readonly string[] hotspotTitles =
    {
        "Polinización",
        "Fertilización",
        "Calendario de cultivo",
        "Producción básica"
    };

    private readonly string[] hotspotBodies =
    {
        "En palma de aceite, la polinización es principalmente entomófila (escarabajos). La sincronía entre inflorescencias masculinas y femeninas es clave para el amarre de fruto.",
        "Suelos ácidos y bajos en K requieren monitoreo. Aplicar N y K en época de menor lluvia reduce lixiviación. Ajustar dosis según análisis de suelo y foliar.",
        "Ciclo: vivero → plantación joven (0–3 años) → madura (3–25 años). Labores: control de malezas, poda, cosecha cada 10–15 días.",
        "Indicadores: RFF (racimos de fruta fresca), OER (rendimiento de extracción de aceite), CPO. Las tasas varían por zona, clima y manejo."
    };

    private void Start()
    {
        BuildCamera();
        BuildEventSystem();
        CreateGround();
        CreateBoundaries();
        player = CreatePlayer();
        hotspotUI = CreateHotspotUI();
        CreateHUD();
        CreateHotspots();
    }

    private void BuildCamera()
    {
        if (Camera.main != null)
        {
            Camera.main.orthographic = true;
            Camera.main.orthographicSize = 5f;
            return;
        }

        GameObject cameraObject = new GameObject("Main Camera");
        Camera camera = cameraObject.AddComponent<Camera>();
        camera.orthographic = true;
        camera.orthographicSize = 5f;
        cameraObject.tag = "MainCamera";
        camera.transform.position = new Vector3(0f, 0f, -10f);
    }

    private void BuildEventSystem()
    {
        if (FindObjectOfType<EventSystem>() != null)
        {
            return;
        }

        GameObject eventSystem = new GameObject("EventSystem");
        eventSystem.AddComponent<EventSystem>();
        eventSystem.AddComponent<StandaloneInputModule>();
    }

    private void CreateGround()
    {
        Sprite tile = SpriteFactory.Get(SpriteFactory.SpriteKind.Ground);

        for (int x = -6; x <= 6; x++)
        {
            for (int y = -6; y <= 6; y++)
            {
                GameObject tileObj = new GameObject($"Tile_{x}_{y}");
                tileObj.transform.position = new Vector3(x * 0.9f, y * 0.9f, 0f);
                SpriteRenderer renderer = tileObj.AddComponent<SpriteRenderer>();
                renderer.sprite = tile;
                renderer.sortingOrder = -2;
            }
        }
    }

    private void CreateBoundaries()
    {
        GameObject boundaries = new GameObject("Boundaries");
        CreateBoundary(boundaries.transform, new Vector2(0f, 6f), new Vector2(14f, 1f));
        CreateBoundary(boundaries.transform, new Vector2(0f, -6f), new Vector2(14f, 1f));
        CreateBoundary(boundaries.transform, new Vector2(6.5f, 0f), new Vector2(1f, 12f));
        CreateBoundary(boundaries.transform, new Vector2(-6.5f, 0f), new Vector2(1f, 12f));
    }

    private void CreateBoundary(Transform parent, Vector2 position, Vector2 size)
    {
        GameObject boundary = new GameObject("Boundary");
        boundary.transform.SetParent(parent);
        boundary.transform.position = position;
        BoxCollider2D collider = boundary.AddComponent<BoxCollider2D>();
        collider.size = size;
    }

    private PlayerController CreatePlayer()
    {
        Sprite sprite = SpriteFactory.Get(SpriteFactory.SpriteKind.Player);
        GameObject playerObj = new GameObject("Player");
        playerObj.transform.position = Vector3.zero;
        SpriteRenderer renderer = playerObj.AddComponent<SpriteRenderer>();
        renderer.sprite = sprite;
        renderer.sortingOrder = 0;

        Rigidbody2D rb = playerObj.AddComponent<Rigidbody2D>();
        rb.gravityScale = 0f;
        rb.constraints = RigidbodyConstraints2D.FreezeRotation;

        BoxCollider2D collider = playerObj.AddComponent<BoxCollider2D>();
        collider.size = new Vector2(0.7f, 0.7f);

        PlayerController controller = playerObj.AddComponent<PlayerController>();
        return controller;
    }

    private HotspotUI CreateHotspotUI()
    {
        GameObject canvasObj = new GameObject("HotspotCanvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        GameObject panelObj = new GameObject("Panel");
        panelObj.transform.SetParent(canvasObj.transform);
        RectTransform panelRect = panelObj.AddComponent<RectTransform>();
        panelRect.anchorMin = new Vector2(0.5f, 0.5f);
        panelRect.anchorMax = new Vector2(0.5f, 0.5f);
        panelRect.sizeDelta = new Vector2(380f, 220f);
        panelRect.anchoredPosition = Vector2.zero;
        Image panelImage = panelObj.AddComponent<Image>();
        panelImage.color = new Color(0f, 0f, 0f, 0.7f);

        GameObject titleObj = CreateText(panelObj.transform, "Title", new Vector2(0f, 70f), 20, FontStyle.Bold);
        Text titleText = titleObj.GetComponent<Text>();

        GameObject bodyObj = CreateText(panelObj.transform, "Body", new Vector2(0f, 0f), 16, FontStyle.Normal);
        Text bodyText = bodyObj.GetComponent<Text>();
        bodyText.alignment = TextAnchor.MiddleCenter;
        bodyText.horizontalOverflow = HorizontalWrapMode.Wrap;
        bodyText.verticalOverflow = VerticalWrapMode.Truncate;

        GameObject closeButtonObj = CreateButton(panelObj.transform, "Cerrar", new Vector2(0f, -80f));
        Button closeButton = closeButtonObj.GetComponent<Button>();

        GameObject actionButtonObj = CreateButton(panelObj.transform, "Continuar", new Vector2(0f, -30f));
        Button actionButton = actionButtonObj.GetComponent<Button>();

        HotspotUI ui = canvasObj.AddComponent<HotspotUI>();
        typeof(HotspotUI).GetField("panel", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(ui, panelObj);
        typeof(HotspotUI).GetField("titleText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(ui, titleText);
        typeof(HotspotUI).GetField("bodyText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(ui, bodyText);
        typeof(HotspotUI).GetField("primaryButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(ui, actionButton);
        typeof(HotspotUI).GetField("closeButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(ui, closeButton);

        panelObj.SetActive(false);
        return ui;
    }

    private void CreateHUD()
    {
        GameObject canvasObj = new GameObject("HUDCanvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        GameObject progressTextObj = CreateText(canvasObj.transform, "HotspotProgress", new Vector2(-200f, 160f), 18, FontStyle.Bold);
        Text progressText = progressTextObj.GetComponent<Text>();
        progressText.alignment = TextAnchor.UpperLeft;

        GameObject bestScoreObj = CreateText(canvasObj.transform, "BestScore", new Vector2(-200f, 130f), 16, FontStyle.Normal);
        Text bestScoreText = bestScoreObj.GetComponent<Text>();
        bestScoreText.alignment = TextAnchor.UpperLeft;

        GameObject badgeObj = CreateText(canvasObj.transform, "Badge", new Vector2(200f, 160f), 18, FontStyle.Bold);
        Text badgeText = badgeObj.GetComponent<Text>();
        badgeText.text = "🏅";
        badgeText.gameObject.SetActive(false);

        GameObject quizButtonObj = CreateButton(canvasObj.transform, "Quiz", new Vector2(0f, -160f));
        Button quizButton = quizButtonObj.GetComponent<Button>();

        GameObject muteButtonObj = CreateButton(canvasObj.transform, "Mute", new Vector2(200f, -160f));
        Button muteButton = muteButtonObj.GetComponent<Button>();
        Text muteLabel = muteButtonObj.GetComponentInChildren<Text>();

        HUDController hud = canvasObj.AddComponent<HUDController>();
        typeof(HUDController).GetField("hotspotProgressText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, progressText);
        typeof(HUDController).GetField("bestScoreText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, bestScoreText);
        typeof(HUDController).GetField("quizBadge", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, badgeText.gameObject);
        typeof(HUDController).GetField("quizButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, quizButton);
        typeof(HUDController).GetField("muteButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, muteButton);
        typeof(HUDController).GetField("muteButtonLabel", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(hud, muteLabel);
    }

    private GameObject CreateText(Transform parent, string name, Vector2 position, int fontSize, FontStyle style)
    {
        GameObject textObj = new GameObject(name);
        textObj.transform.SetParent(parent);
        RectTransform rect = textObj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(360f, 80f);
        Text text = textObj.AddComponent<Text>();
        text.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        text.fontSize = fontSize;
        text.fontStyle = style;
        text.color = Color.white;
        text.alignment = TextAnchor.MiddleCenter;
        return textObj;
    }

    private GameObject CreateButton(Transform parent, string label, Vector2 position)
    {
        GameObject buttonObj = new GameObject(label + "Button");
        buttonObj.transform.SetParent(parent);
        RectTransform rect = buttonObj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(160f, 40f);

        Image image = buttonObj.AddComponent<Image>();
        image.color = new Color(0.2f, 0.4f, 0.2f, 0.8f);

        Button button = buttonObj.AddComponent<Button>();

        GameObject textObj = CreateText(buttonObj.transform, "Label", Vector2.zero, 16, FontStyle.Bold);
        RectTransform textRect = textObj.GetComponent<RectTransform>();
        textRect.sizeDelta = new Vector2(160f, 40f);
        Text text = textObj.GetComponent<Text>();
        text.text = label;

        return buttonObj;
    }

    private void CreateHotspots()
    {
        Sprite icon = SpriteFactory.Get(SpriteFactory.SpriteKind.Hotspot);
        Vector2[] positions =
        {
            new Vector2(-3f, 3f),
            new Vector2(3f, 3f),
            new Vector2(-3f, -3f),
            new Vector2(3f, -3f)
        };

        for (int i = 0; i < hotspotTitles.Length; i++)
        {
            GameObject hotspotObj = new GameObject(hotspotTitles[i]);
            hotspotObj.transform.position = positions[i];
            SpriteRenderer renderer = hotspotObj.AddComponent<SpriteRenderer>();
            renderer.sprite = icon;
            renderer.sortingOrder = -1;

            CircleCollider2D trigger = hotspotObj.AddComponent<CircleCollider2D>();
            trigger.isTrigger = true;
            trigger.radius = 0.9f;

            Hotspot hotspot = hotspotObj.AddComponent<Hotspot>();
            hotspot.Configure(hotspotUI, hotspotTitles[i], hotspotBodies[i], (HotspotType)i);

            GameObject promptObj = CreatePrompt(hotspotObj.transform);
            hotspot.SetPrompt(promptObj);
        }
    }

    private GameObject CreatePrompt(Transform parent)
    {
        GameObject prompt = new GameObject("Prompt");
        prompt.transform.SetParent(parent);
        prompt.transform.localPosition = new Vector3(0f, 1.2f, 0f);
        TextMesh textMesh = prompt.AddComponent<TextMesh>();
        textMesh.text = "Presiona E";
        textMesh.color = Color.white;
        textMesh.characterSize = 0.2f;
        textMesh.anchor = TextAnchor.MiddleCenter;
        return prompt;
    }
}
