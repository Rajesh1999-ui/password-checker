const BASE_URL = "https://password-checker-i2dj.onrender.com";

window.onload = function () {

    const form = document.getElementById('password-form');

    if (!form) {
        console.error("Form not found");
        return;
    }

    form.addEventListener('submit', function (event) {
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
                "Strength: " + data.strength_score;

            document.getElementById('recommendations').textContent =
                data.advice;

            document.getElementById('breach-status').textContent =
                data.breached ? "⚠️ Breached" : "✅ Safe";
        })
        .catch(err => console.error(err));
    });

    document.getElementById('generate-password').addEventListener('click', () => {
        fetch(`${BASE_URL}/generateStrongPassword`, {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('generated-password').value =
                data.generated_password;
        });
    });

};