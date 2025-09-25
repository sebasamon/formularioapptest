using UnityEngine;

public class GameBootstrap : MonoBehaviour
{
    [SerializeField]
    private AudioClip ambientClip;
    [SerializeField]
    private AudioClip uiClickClip;

    private void Awake()
    {
        EnsureGameState();
        EnsureAudioManager();
    }

    private void EnsureGameState()
    {
        if (GameState.Instance == null)
        {
            new GameObject("GameState").AddComponent<GameState>();
        }
    }

    private void EnsureAudioManager()
    {
        if (AudioManager.Instance != null)
        {
            return;
        }

        GameObject audioManagerObject = new GameObject("AudioManager");
        AudioManager manager = audioManagerObject.AddComponent<AudioManager>();

        AudioSource ambient = audioManagerObject.AddComponent<AudioSource>();
        ambient.loop = true;
        ambient.playOnAwake = false;
        ambient.clip = ambientClip != null ? ambientClip : CreateToneClip(220f, 1.5f, 0.05f);

        AudioSource click = audioManagerObject.AddComponent<AudioSource>();
        click.playOnAwake = false;
        click.clip = uiClickClip != null ? uiClickClip : CreateToneClip(880f, 0.1f, 0.2f);

        manager.Initialize(ambient, click);
    }

    private AudioClip CreateToneClip(float frequency, float duration, float volume)
    {
        int sampleRate = 44100;
        int sampleCount = Mathf.CeilToInt(sampleRate * duration);
        float[] samples = new float[sampleCount];
        for (int i = 0; i < sampleCount; i++)
        {
            float t = i / (float)sampleRate;
            samples[i] = Mathf.Sin(2f * Mathf.PI * frequency * t) * volume;
        }

        AudioClip clip = AudioClip.Create("GeneratedTone", sampleCount, 1, sampleRate, false);
        clip.SetData(samples, 0);
        return clip;
    }
}
