const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.getElementById('password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;

    fetch(`${BASE_URL}/checkPasswordStrength`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('strength-score').textContent =
            `Password Strength: ${data.strength_score}`;

        document.getElementById('recommendations').textContent =
            `Recommendations: ${data.advice}`;

        document.getElementById('breach-status').textContent =
            data.breached
                ? "⚠️ Breached!"
                : "✅ Safe";
    })
    .catch(err => console.error("Error:", err));
});