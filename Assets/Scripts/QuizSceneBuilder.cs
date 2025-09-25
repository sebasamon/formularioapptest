using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class QuizSceneBuilder : MonoBehaviour
{
    private void Start()
    {
        BuildCamera();
        BuildEventSystem();
        Canvas canvas = CreateCanvas(out Text questionText, out Text progressText, out Button[] optionButtons, out Text[] optionLabels, out Text feedbackText, out GameObject resultPanel, out Text resultText, out Button backButton);

        GameObject controllerObj = new GameObject("QuizController");
        QuizController controller = controllerObj.AddComponent<QuizController>();

        System.Type type = typeof(QuizController);
        type.GetField("questionText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, questionText);
        type.GetField("progressText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, progressText);
        type.GetField("optionButtons", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, optionButtons);
        type.GetField("optionLabels", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, optionLabels);
        type.GetField("feedbackText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, feedbackText);
        type.GetField("resultPanel", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, resultPanel);
        type.GetField("resultText", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.SetValue(controller, resultText);
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

    private Canvas CreateCanvas(out Text questionText, out Text progressText, out Button[] optionButtons, out Text[] optionLabels, out Text feedbackText, out GameObject resultPanel, out Text resultText, out Button backButton)
    {
        GameObject canvasObj = new GameObject("Canvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        questionText = CreateText(canvasObj.transform, "Question", new Vector2(0f, 100f), 22);
        progressText = CreateText(canvasObj.transform, "Progress", new Vector2(0f, 160f), 16);
        feedbackText = CreateText(canvasObj.transform, "Feedback", new Vector2(0f, -140f), 16);

        optionButtons = new Button[4];
        optionLabels = new Text[4];
        float[] offsets = { 40f, -10f, -60f, -110f };
        for (int i = 0; i < 4; i++)
        {
            optionButtons[i] = CreateButton(canvasObj.transform, "Opción " + (i + 1), new Vector2(0f, offsets[i]));
            optionLabels[i] = optionButtons[i].GetComponentInChildren<Text>();
        }

        resultPanel = new GameObject("ResultPanel");
        resultPanel.transform.SetParent(canvasObj.transform);
        RectTransform rect = resultPanel.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.sizeDelta = new Vector2(300f, 180f);
        Image panelImage = resultPanel.AddComponent<Image>();
        panelImage.color = new Color(0f, 0f, 0f, 0.8f);

        resultText = CreateText(resultPanel.transform, "ResultText", new Vector2(0f, 30f), 20);
        backButton = CreateButton(resultPanel.transform, "Volver", new Vector2(0f, -50f));

        resultPanel.SetActive(false);
        return canvas;
    }

    private Text CreateText(Transform parent, string name, Vector2 position, int fontSize)
    {
        GameObject obj = new GameObject(name);
        obj.transform.SetParent(parent);
        RectTransform rect = obj.AddComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = position;
        rect.sizeDelta = new Vector2(360f, 60f);

        Text text = obj.AddComponent<Text>();
        text.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        text.fontSize = fontSize;
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
        rect.sizeDelta = new Vector2(320f, 40f);

        Image image = obj.AddComponent<Image>();
        image.color = new Color(0.3f, 0.3f, 0.3f, 0.8f);
        Button button = obj.AddComponent<Button>();

        Text text = CreateText(obj.transform, "Label", Vector2.zero, 18);
        text.text = label;

        return button;
    }
}
