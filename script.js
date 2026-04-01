const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

    // Password check
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
                    ? "⚠️ This password has been found in breaches!"
                    : "✅ This password is safe.";
        })
        .catch(err => console.error("Error:", err));
    });

    // Generate password
    document.getElementById('generate-password').addEventListener('click', () => {
        fetch(`${BASE_URL}/generateStrongPassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ length: 12 })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('generated-password').value =
                data.generated_password;
        })
        .catch(err => console.error("Error:", err));
    });

});