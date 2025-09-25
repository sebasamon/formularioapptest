using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

[System.Serializable]
public class QuizQuestion
{
    public string question;
    public string[] options;
    public int correctIndex;
    public string explanation;
}

public class QuizController : MonoBehaviour
{
    [SerializeField]
    private Text questionText;
    [SerializeField]
    private Text progressText;
    [SerializeField]
    private Button[] optionButtons;
    [SerializeField]
    private Text[] optionLabels;
    [SerializeField]
    private Text feedbackText;
    [SerializeField]
    private GameObject resultPanel;
    [SerializeField]
    private Text resultText;
    [SerializeField]
    private Button backButton;

    private List<QuizQuestion> questions;
    private int currentQuestionIndex;
    private int score;
    private bool awaitingNext;

    private void Start()
    {
        BuildQuestions();
        DisplayCurrentQuestion();
        if (resultPanel != null)
        {
            resultPanel.SetActive(false);
        }

        if (backButton != null)
        {
            backButton.onClick.AddListener(() => SceneManager.LoadScene("Farm"));
        }

        for (int i = 0; i < optionButtons.Length; i++)
        {
            int optionIndex = i;
            optionButtons[i].onClick.AddListener(() => OnOptionSelected(optionIndex));
        }
    }

    private void BuildQuestions()
    {
        questions = new List<QuizQuestion>
        {
            new QuizQuestion
            {
                question = "¿Qué estructura recibe el polen en palma?",
                options = new [] { "Inflorescencia masculina", "Inflorescencia femenina", "Pecíolo", "Raquis" },
                correctIndex = 1,
                explanation = "El fruto se forma tras la polinización de inflorescencias femeninas."
            },
            new QuizQuestion
            {
                question = "Un riesgo de aplicar K en suelos muy lluviosos es…",
                options = new [] { "Volatilización", "Lixiviación", "Fijación por caliza", "Fotólisis" },
                correctIndex = 1,
                explanation = "La lluvia puede arrastrar K, reduciendo eficiencia."
            },
            new QuizQuestion
            {
                question = "¿Cada cuánto se cosecha típicamente?",
                options = new [] { "Diario", "Cada 3–4 días", "Cada 10–15 días", "Mensual" },
                correctIndex = 2,
                explanation = "Ventanas de 10–15 días son comunes según maduración."
            },
            new QuizQuestion
            {
                question = "OER significa…",
                options = new [] { "Óptimo de Esparcimiento Radicular", "Oil Extraction Rate", "Orden de Entrega Regional", "Óxido-Etileno Reaccional" },
                correctIndex = 1,
                explanation = "OER = rendimiento de extracción de aceite."
            },
            new QuizQuestion
            {
                question = "En polinización, la sincronía clave es entre…",
                options = new [] { "Hojas y raíces", "Lluvia y viento", "Inflorescencias masculinas y femeninas", "Poda y cosecha" },
                correctIndex = 2,
                explanation = "Sincronía floral asegura mayor fecundación."
            }
        };
    }

    private void DisplayCurrentQuestion()
    {
        if (currentQuestionIndex >= questions.Count)
        {
            ShowResults();
            return;
        }

        QuizQuestion current = questions[currentQuestionIndex];
        if (questionText != null)
        {
            questionText.text = current.question;
        }

        if (progressText != null)
        {
            progressText.text = $"Pregunta {currentQuestionIndex + 1} de {questions.Count}";
        }

        if (feedbackText != null)
        {
            feedbackText.text = string.Empty;
        }

        for (int i = 0; i < optionLabels.Length; i++)
        {
            if (i < current.options.Length)
            {
                optionLabels[i].text = current.options[i];
            }
            optionButtons[i].interactable = true;
        }

        awaitingNext = false;
    }

    private void OnOptionSelected(int index)
    {
        if (awaitingNext)
        {
            return;
        }

        QuizQuestion current = questions[currentQuestionIndex];
        bool isCorrect = index == current.correctIndex;
        if (isCorrect)
        {
            score++;
        }

        if (feedbackText != null)
        {
            string prefix = isCorrect ? "Correcto. " : "Incorrecto. ";
            feedbackText.text = prefix + current.explanation;
        }

        for (int i = 0; i < optionButtons.Length; i++)
        {
            optionButtons[i].interactable = false;
        }

        awaitingNext = true;
        Invoke(nameof(AdvanceQuestion), 2f);
    }

    private void AdvanceQuestion()
    {
        currentQuestionIndex++;
        DisplayCurrentQuestion();
    }

    private void ShowResults()
    {
        if (resultPanel != null)
        {
            resultPanel.SetActive(true);
        }

        bool passed = score >= 4;
        if (resultText != null)
        {
            resultText.text = passed ? $"¡Aprobaste! {score}/5" : $"Intenta de nuevo: {score}/5";
        }

        if (GameState.Instance != null)
        {
            if (passed)
            {
                GameState.Instance.SetQuizPassed(true);
            }
        }
    }
}
