using UnityEngine;

public class SaveSystem
{
    private const string HotspotKey = "hotspot_";
    private const string BestScoreKey = "bestScore";
    private const string QuizPassedKey = "quizPassed";

    public void SaveHotspot(int index, bool visited)
    {
        PlayerPrefs.SetInt(HotspotKey + index, visited ? 1 : 0);
        PlayerPrefs.Save();
    }

    public bool LoadHotspot(int index)
    {
        return PlayerPrefs.GetInt(HotspotKey + index, 0) == 1;
    }

    public void SaveBestScore(int score)
    {
        PlayerPrefs.SetInt(BestScoreKey, score);
        PlayerPrefs.Save();
    }

    public int LoadBestScore()
    {
        return PlayerPrefs.GetInt(BestScoreKey, 0);
    }

    public void SaveQuizPassed(bool passed)
    {
        PlayerPrefs.SetInt(QuizPassedKey, passed ? 1 : 0);
        PlayerPrefs.Save();
    }

    public bool LoadQuizPassed()
    {
        return PlayerPrefs.GetInt(QuizPassedKey, 0) == 1;
    }
}
