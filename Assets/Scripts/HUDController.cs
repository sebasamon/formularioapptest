using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class HUDController : MonoBehaviour
{
    [SerializeField]
    private Text hotspotProgressText;
    [SerializeField]
    private Text bestScoreText;
    [SerializeField]
    private GameObject quizBadge;
    [SerializeField]
    private Button quizButton;
    [SerializeField]
    private Button muteButton;
    [SerializeField]
    private Text muteButtonLabel;

    private bool isMuted;

    private void Start()
    {
        if (quizButton != null)
        {
            quizButton.onClick.AddListener(OnQuizButton);
        }
        if (muteButton != null)
        {
            muteButton.onClick.AddListener(ToggleMute);
        }
        Refresh();
    }

    private void Update()
    {
        Refresh();
    }

    private void Refresh()
    {
        if (GameState.Instance == null)
        {
            return;
        }

        if (hotspotProgressText != null)
        {
            hotspotProgressText.text = $"Hotspots vistos: {GameState.Instance.VisitedHotspotCount()}/4";
        }

        if (bestScoreText != null)
        {
            bestScoreText.text = $"Mejor puntaje: {GameState.Instance.BestScore}";
        }

        if (quizBadge != null)
        {
            quizBadge.SetActive(GameState.Instance.QuizPassed);
        }

        if (quizButton != null)
        {
            quizButton.interactable = GameState.Instance.AllHotspotsVisited();
        }

        if (muteButtonLabel != null)
        {
            muteButtonLabel.text = isMuted ? "Unmute" : "Mute";
        }
    }

    private void OnQuizButton()
    {
        if (GameState.Instance != null && GameState.Instance.AllHotspotsVisited())
        {
            SceneManager.LoadScene("Quiz");
        }
    }

    private void ToggleMute()
    {
        isMuted = !isMuted;
        AudioListener.volume = isMuted ? 0f : 1f;
    }
}
