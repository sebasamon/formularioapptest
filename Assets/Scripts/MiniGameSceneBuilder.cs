using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class MiniGameSceneBuilder : MonoBehaviour
{
    private void Start()
    {
        BuildCamera();
        BuildEventSystem();
        PlayerController player = CreatePlayer();
        GameObject clusterPrefab = CreateClusterPrefab();
        Transform container = new GameObject("Clusters").transform;
        Canvas canvas = CreateCanvas(out Text timerText, out Text scoreText, out GameObject resultPanel, out Text resultScoreText, out Button retryButton, out Button backButton);

        GameObject controllerObj = new GameObject("MiniGameController");
        MiniGameHarvest controller = controllerObj.AddComponent<MiniGameHarvest>();

        System.Type type = typeof(MiniGameHarvest);
        type.GetField("player", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, player);
        type.GetField("clusterPrefab", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, clusterPrefab);
        type.GetField("clusterContainer", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, container);
        type.GetField("timerText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, timerText);
        type.GetField("scoreText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, scoreText);
        type.GetField("resultPanel", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, resultPanel);
        type.GetField("resultScoreText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, resultScoreText);
        type.GetField("retryButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, retryButton);
        type.GetField("backButton", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, backButton);
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

    private PlayerController CreatePlayer()
    {
        Sprite sprite = SpriteFactory.Get(SpriteFactory.SpriteKind.Player);
        GameObject playerObj = new GameObject("Player");
        playerObj.transform.position = Vector3.zero;
        SpriteRenderer renderer = playerObj.AddComponent<SpriteRenderer>();
        renderer.sprite = sprite;
        renderer.sortingOrder = 1;

        Rigidbody2D rb = playerObj.AddComponent<Rigidbody2D>();
        rb.gravityScale = 0f;
        rb.constraints = RigidbodyConstraints2D.FreezeRotation;

        CircleCollider2D collider = playerObj.AddComponent<CircleCollider2D>();
        collider.radius = 0.4f;

        PlayerController controller = playerObj.AddComponent<PlayerController>();
        return controller;
    }

    private GameObject CreateClusterPrefab()
    {
        Sprite sprite = SpriteFactory.Get(SpriteFactory.SpriteKind.Tree);
        GameObject prefab = new GameObject("ClusterPrefab");
        prefab.SetActive(false);
        SpriteRenderer renderer = prefab.AddComponent<SpriteRenderer>();
        renderer.sprite = sprite;
        renderer.sortingOrder = 0;

        prefab.AddComponent<HarvestCluster>();
        return prefab;
    }

    private Canvas CreateCanvas(out Text timerText, out Text scoreText, out GameObject resultPanel, out Text resultScoreText, out Button retryButton, out Button backButton)
    {
        GameObject canvasObj = new GameObject("Canvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        timerText = CreateText(canvasObj.transform, "Timer", new Vector2(-200f, 160f));
        timerText.text = "Tiempo: 35";
        scoreText = CreateText(canvasObj.transform, "Score", new Vector2(200f, 160f));
        scoreText.text = "Puntaje: 0";

        resultPanel = new GameObject("ResultPanel");
        resultPanel.transform.SetParent(canvasObj.transform);
        RectTransform rect = resultPanel.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.sizeDelta = new Vector2(300f, 200f);
        Image panelImage = resultPanel.AddComponent<Image>();
        panelImage.color = new Color(0f, 0f, 0f, 0.8f);

        resultScoreText = CreateText(resultPanel.transform, "ResultScore", new Vector2(0f, 40f));
        retryButton = CreateButton(resultPanel.transform, "Reintentar", new Vector2(0f, -10f));
        backButton = CreateButton(resultPanel.transform, "Volver", new Vector2(0f, -60f));

        resultPanel.SetActive(false);
        return canvas;
    }

    private Text CreateText(Transform parent, string name, Vector2 position)
    {
        GameObject obj = new GameObject(name);
        obj.transform.SetParent(parent);
        RectTransform rect = obj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(240f, 40f);

        Text text = obj.AddComponent<Text>();
        text.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        text.fontSize = 20;
        text.alignment = TextAnchor.MiddleCenter;
        text.color = Color.white;
        return text;
    }

    private Button CreateButton(Transform parent, string label, Vector2 position)
    {
        GameObject obj = new GameObject(label + "Button");
        obj.transform.SetParent(parent);
        RectTransform rect = obj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(160f, 40f);

        Image image = obj.AddComponent<Image>();
        image.color = new Color(0.2f, 0.2f, 0.5f, 0.9f);
        Button button = obj.AddComponent<Button>();

        Text text = CreateText(obj.transform, "Label", Vector2.zero);
        text.text = label;
        text.fontSize = 18;

        return button;
    }
}
