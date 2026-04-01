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
        })
        .catch(err => console.error(err));
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
        })
        .catch(err => console.error(err));
    });

    // ✅ PUBLIC API (IP ADDRESS)
    document.getElementById('get-ip').addEventListener('click', () => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                document.getElementById('ip-result').textContent =
                    "Your IP: " + data.ip;
            })
            .catch(err => console.error(err));
    });

};