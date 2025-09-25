using UnityEngine;

public class GameState : MonoBehaviour
{
    public static GameState Instance { get; private set; }

    [SerializeField]
    private bool[] hotspotVisited = new bool[4];

    public int BestScore { get; private set; }
    public bool QuizPassed { get; private set; }

    private SaveSystem saveSystem;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
        saveSystem = new SaveSystem();
        LoadProgress();
    }

    public void MarkHotspotVisited(int index)
    {
        if (index < 0 || index >= hotspotVisited.Length)
        {
            Debug.LogWarning($"Hotspot index {index} out of range");
            return;
        }

        if (!hotspotVisited[index])
        {
            hotspotVisited[index] = true;
            saveSystem.SaveHotspot(index, true);
        }
    }

    public bool IsHotspotVisited(int index)
    {
        if (index < 0 || index >= hotspotVisited.Length)
        {
            return false;
        }
        return hotspotVisited[index];
    }

    public int VisitedHotspotCount()
    {
        int count = 0;
        for (int i = 0; i < hotspotVisited.Length; i++)
        {
            if (hotspotVisited[i])
            {
                count++;
            }
        }
        return count;
    }

    public bool AllHotspotsVisited()
    {
        return VisitedHotspotCount() == hotspotVisited.Length;
    }

    public void UpdateBestScore(int score)
    {
        if (score > BestScore)
        {
            BestScore = score;
            saveSystem.SaveBestScore(score);
        }
    }

    public void SetQuizPassed(bool passed)
    {
        QuizPassed = passed;
        saveSystem.SaveQuizPassed(passed);
    }

    private void LoadProgress()
    {
        for (int i = 0; i < hotspotVisited.Length; i++)
        {
            hotspotVisited[i] = saveSystem.LoadHotspot(i);
        }

        BestScore = saveSystem.LoadBestScore();
        QuizPassed = saveSystem.LoadQuizPassed();
    }
}
