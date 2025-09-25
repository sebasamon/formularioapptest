using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MiniGameHarvest : MonoBehaviour
{
    [SerializeField]
    private PlayerController player;
    [SerializeField]
    private GameObject clusterPrefab;
    [SerializeField]
    private Transform clusterContainer;
    [SerializeField]
    private Vector2 areaMin = new Vector2(-4f, -4f);
    [SerializeField]
    private Vector2 areaMax = new Vector2(4f, 4f);
    [SerializeField]
    private float gameDuration = 35f;
    [SerializeField]
    private float spawnInterval = 2f;
    [SerializeField]
    private float harvestRadius = 0.7f;
    [SerializeField]
    private Text timerText;
    [SerializeField]
    private Text scoreText;
    [SerializeField]
    private GameObject resultPanel;
    [SerializeField]
    private Text resultScoreText;
    [SerializeField]
    private Button retryButton;
    [SerializeField]
    private Button backButton;

    private readonly List<HarvestCluster> clusters = new List<HarvestCluster>();
    private float timer;
    private float spawnTimer;
    private int score;
    private bool running;

    private void Start()
    {
        timer = gameDuration;
        spawnTimer = spawnInterval;
        running = true;
        if (resultPanel != null)
        {
            resultPanel.SetActive(false);
        }

        if (retryButton != null)
        {
            retryButton.onClick.AddListener(() => SceneManager.LoadScene("MiniGameHarvest"));
        }
        if (backButton != null)
        {
            backButton.onClick.AddListener(() => SceneManager.LoadScene("Farm"));
        }

        UpdateUI();
    }

    private void Update()
    {
        if (!running)
        {
            return;
        }

        timer -= Time.deltaTime;
        spawnTimer -= Time.deltaTime;

        if (spawnTimer <= 0f)
        {
            SpawnCluster();
            spawnTimer = spawnInterval;
        }

        if (Input.GetKeyDown(KeyCode.Space))
        {
            TryHarvest();
        }

        if (timer <= 0f)
        {
            EndGame();
        }

        UpdateUI();
    }

    private void SpawnCluster()
    {
        if (clusterPrefab == null)
        {
            return;
        }

        Vector2 position = new Vector2(Random.Range(areaMin.x, areaMax.x), Random.Range(areaMin.y, areaMax.y));
        GameObject instance = Instantiate(clusterPrefab, position, Quaternion.identity, clusterContainer);
        instance.SetActive(true);
        HarvestCluster cluster = instance.GetComponent<HarvestCluster>();
        if (cluster != null)
        {
            clusters.Add(cluster);
        }
    }

    private void TryHarvest()
    {
        if (player == null)
        {
            return;
        }

        Vector2 playerPos = player.transform.position;
        HarvestCluster bestCluster = null;
        float bestDistance = float.MaxValue;
        foreach (HarvestCluster cluster in clusters)
        {
            if (cluster == null || !cluster.IsActive)
            {
                continue;
            }

            float distance = Vector2.Distance(playerPos, cluster.transform.position);
            if (distance < harvestRadius && distance < bestDistance)
            {
                bestDistance = distance;
                bestCluster = cluster;
            }
        }

        if (bestCluster != null)
        {
            score += bestCluster.TryHarvest();
            UpdateUI();
        }
    }

    private void EndGame()
    {
        running = false;
        timer = 0f;
        if (resultPanel != null)
        {
            resultPanel.SetActive(true);
        }
        if (resultScoreText != null)
        {
            resultScoreText.text = $"Tu puntaje: {score}";
        }

        if (GameState.Instance != null)
        {
            GameState.Instance.UpdateBestScore(score);
        }
    }

    private void UpdateUI()
    {
        if (timerText != null)
        {
            timerText.text = $"Tiempo: {Mathf.CeilToInt(Mathf.Max(timer, 0f))}";
        }

        if (scoreText != null)
        {
            scoreText.text = $"Puntaje: {score}";
        }
    }
}
