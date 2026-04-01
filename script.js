const BASE_URL = "https://password-checker-i2dj.onrender.com";

window.onload = function () {

    // PASSWORD CHECK
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
                "Strength: " + data.strength_score;

            document.getElementById('recommendations').textContent =
                data.advice;

            document.getElementById('breach-status').textContent =
                data.breached ? "⚠️ Breached" : "✅ Safe";
        });
    });

    // PASSWORD GENERATOR
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

    // ✅ EMAIL CHECK
    document.getElementById('check-email').addEventListener('click', () => {
        const email = document.getElementById('email').value;

        fetch(`${BASE_URL}/checkEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.deliverability === "DELIVERABLE") {
                document.getElementById('email-result').textContent =
                    "✅ Valid Email";
            } else {
                document.getElementById('email-result').textContent =
                    "❌ Invalid Email";
            }
        });
    });

};