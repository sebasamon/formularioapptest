using UnityEngine;

public class AudioManager : MonoBehaviour
{
    public static AudioManager Instance { get; private set; }

    [SerializeField]
    private AudioSource ambientLoop;
    [SerializeField]
    private AudioSource uiClick;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    private void Start()
    {
        if (ambientLoop != null && !ambientLoop.isPlaying)
        {
            ambientLoop.loop = true;
            ambientLoop.Play();
        }
    }

    public void Initialize(AudioSource ambient, AudioSource click)
    {
        ambientLoop = ambient;
        uiClick = click;
    }

    public void PlayClick()
    {
        if (uiClick != null)
        {
            uiClick.Play();
        }
    }
}
