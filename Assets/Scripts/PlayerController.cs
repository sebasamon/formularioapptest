using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [SerializeField]
    private float moveSpeed = 4f;

    private Rigidbody2D rb;
    private Vector2 input;

    public Vector2 InputVector => input;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        float horizontal = Input.GetAxisRaw("Horizontal");
        float vertical = Input.GetAxisRaw("Vertical");
        input = new Vector2(horizontal, vertical).normalized;
    }

    private void FixedUpdate()
    {
        rb.velocity = input * moveSpeed;
    }
}
