using UnityEngine;

public enum ClusterState
{
    Green,
    Orange,
    Red
}

public class HarvestCluster : MonoBehaviour
{
    [SerializeField]
    private SpriteRenderer spriteRenderer;
    [SerializeField]
    private Color greenColor = new Color(0.2f, 0.8f, 0.2f);
    [SerializeField]
    private Color orangeColor = new Color(1f, 0.6f, 0.2f);
    [SerializeField]
    private Color redColor = new Color(0.8f, 0.1f, 0.1f);
    [SerializeField]
    private float greenDuration = 3f;
    [SerializeField]
    private float orangeDuration = 4f;
    [SerializeField]
    private float redDuration = 3f;

    private float stateTimer;
    private ClusterState state = ClusterState.Green;

    public bool IsHarvestable => state == ClusterState.Orange;
    public bool IsActive => gameObject.activeInHierarchy;

    private void OnEnable()
    {
        state = ClusterState.Green;
        stateTimer = greenDuration;
        UpdateColor();
    }

    private void Update()
    {
        stateTimer -= Time.deltaTime;
        if (stateTimer <= 0f)
        {
            AdvanceState();
        }
    }

    private void AdvanceState()
    {
        switch (state)
        {
            case ClusterState.Green:
                state = ClusterState.Orange;
                stateTimer = orangeDuration;
                UpdateColor();
                break;
            case ClusterState.Orange:
                state = ClusterState.Red;
                stateTimer = redDuration;
                UpdateColor();
                break;
            case ClusterState.Red:
                gameObject.SetActive(false);
                break;
        }
    }

    private void UpdateColor()
    {
        if (spriteRenderer == null)
        {
            spriteRenderer = GetComponent<SpriteRenderer>();
        }

        if (spriteRenderer == null)
        {
            return;
        }

        switch (state)
        {
            case ClusterState.Green:
                spriteRenderer.color = greenColor;
                break;
            case ClusterState.Orange:
                spriteRenderer.color = orangeColor;
                break;
            case ClusterState.Red:
                spriteRenderer.color = redColor;
                break;
        }
    }

    public int TryHarvest()
    {
        if (!IsActive)
        {
            return 0;
        }

        if (state == ClusterState.Orange)
        {
            gameObject.SetActive(false);
            return 1;
        }

        if (state == ClusterState.Green || state == ClusterState.Red)
        {
            gameObject.SetActive(false);
            return -1;
        }

        return 0;
    }
}
