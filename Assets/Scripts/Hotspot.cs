using UnityEngine;
using UnityEngine.Events;
using UnityEngine.SceneManagement;

public enum HotspotType
{
    Pollinization = 0,
    Fertilization = 1,
    Timeline = 2,
    Production = 3
}

public class Hotspot : MonoBehaviour
{
    [SerializeField]
    private HotspotType type;
    [SerializeField]
    private GameObject prompt;
    [SerializeField]
    private HotspotUI hotspotUI;

    [TextArea]
    [SerializeField]
    private string title;
    [TextArea]
    [SerializeField]
    private string body;

    [SerializeField]
    private UnityEvent onOpen;

    private bool playerInRange;

    private void Start()
    {
        if (prompt != null)
        {
            prompt.SetActive(false);
        }
    }

    public void Configure(HotspotUI ui, string titleText, string bodyText, HotspotType hotspotType)
    {
        hotspotUI = ui;
        title = titleText;
        body = bodyText;
        type = hotspotType;
    }

    public void SetPrompt(GameObject promptObject)
    {
        prompt = promptObject;
        if (prompt != null)
        {
            prompt.SetActive(false);
        }
    }

    private void Update()
    {
        if (playerInRange && Input.GetKeyDown(KeyCode.E))
        {
            OpenHotspot();
        }
    }

    private void OpenHotspot()
    {
        hotspotUI.Show(title, body, OnHotspotConfirmed);
        onOpen?.Invoke();
        GameState.Instance?.MarkHotspotVisited((int)type);
    }

    private void OnHotspotConfirmed()
    {
        if (type == HotspotType.Pollinization)
        {
            SceneManager.LoadScene("MiniGameHarvest");
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.GetComponent<PlayerController>() != null)
        {
            playerInRange = true;
            if (prompt != null)
            {
                prompt.SetActive(true);
            }
        }
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.GetComponent<PlayerController>() != null)
        {
            playerInRange = false;
            if (prompt != null)
            {
                prompt.SetActive(false);
            }
        }
    }
}
