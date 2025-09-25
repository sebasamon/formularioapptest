using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class HotspotUI : MonoBehaviour
{
    [SerializeField]
    private GameObject panel;
    [SerializeField]
    private Text titleText;
    [SerializeField]
    private Text bodyText;
    [SerializeField]
    private Button primaryButton;
    [SerializeField]
    private Button closeButton;

    private UnityAction confirmAction;

    private void Awake()
    {
        Hide();
        if (closeButton != null)
        {
            closeButton.onClick.AddListener(Hide);
        }
    }

    public void Show(string title, string body, UnityAction onConfirm)
    {
        confirmAction = onConfirm;
        if (titleText != null)
        {
            titleText.text = title;
        }
        if (bodyText != null)
        {
            bodyText.text = body;
        }
        if (closeButton != null)
        {
            closeButton.onClick.RemoveAllListeners();
            closeButton.onClick.AddListener(Hide);
        }
        if (panel != null)
        {
            panel.SetActive(true);
        }
        if (primaryButton != null)
        {
            primaryButton.onClick.RemoveAllListeners();
            primaryButton.onClick.AddListener(() =>
            {
                confirmAction?.Invoke();
                Hide();
            });
        }
    }

    public void Hide()
    {
        if (panel != null)
        {
            panel.SetActive(false);
        }
    }
}
