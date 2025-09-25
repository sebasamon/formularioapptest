using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MainMenuSceneBuilder : MonoBehaviour
{
    private void Start()
    {
        BuildCamera();
        BuildEventSystem();
        BuildMenu();
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

    private void BuildMenu()
    {
        GameObject canvasObj = new GameObject("Canvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        Text title = CreateText(canvasObj.transform, "PalmQuest Pico", new Vector2(0f, 120f), 32);
        title.fontStyle = FontStyle.Bold;

        Button playButton = CreateButton(canvasObj.transform, "Jugar", new Vector2(0f, 40f));
        playButton.onClick.AddListener(() => SceneManager.LoadScene("Farm"));

        Button quitButton = CreateButton(canvasObj.transform, "Salir", new Vector2(0f, -20f));
        quitButton.onClick.AddListener(() =>
        {
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit();
#endif
        });

        Text hint = CreateText(canvasObj.transform, "Hint", new Vector2(0f, -120f), 16);
        hint.text = "WASD para moverse, E para interactuar.";
    }

    private Text CreateText(Transform parent, string textValue, Vector2 position, int fontSize)
    {
        GameObject obj = new GameObject(textValue);
        obj.transform.SetParent(parent);
        RectTransform rect = obj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(320f, 60f);

        Text text = obj.AddComponent<Text>();
        text.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        text.fontSize = fontSize;
        text.alignment = TextAnchor.MiddleCenter;
        text.color = Color.white;
        text.text = textValue;
        return text;
    }

    private Button CreateButton(Transform parent, string label, Vector2 position)
    {
        GameObject obj = new GameObject(label + "Button");
        obj.transform.SetParent(parent);
        RectTransform rect = obj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(200f, 50f);

        Image image = obj.AddComponent<Image>();
        image.color = new Color(0.2f, 0.5f, 0.2f, 0.8f);
        Button button = obj.AddComponent<Button>();

        Text text = CreateText(obj.transform, label, Vector2.zero, 20);
        text.text = label;

        return button;
    }
}
