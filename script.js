const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.addEventListener("DOMContentLoaded", function () {

    // PASSWORD CHECK
    document.getElementById('password-form').addEventListener('submit', function (e) {
        e.preventDefault();

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

    // GENERATE PASSWORD
    document.getElementById('generate-password').addEventListener('click', () => {
        fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                document.getElementById('generated-password').value =
                    data.generated_password;
            });
    });

    // SAVE PASSWORD
    document.getElementById('save-password').addEventListener('click', () => {
        const website = document.getElementById('website').value;
        const password = document.getElementById('generated-password').value;

        if (!website || !password) {
            alert("Enter website and generate password!");
            return;
        }

        fetch(`${BASE_URL}/savePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ website, password })
        })
        .then(() => alert("Saved successfully!"));
    });

    // SHOW TABLE
    document.getElementById('show-table').addEventListener('click', () => {
        document.getElementById('table-section').style.display = "block";
        loadPasswords();
    });

    // HIDE TABLE
    document.getElementById('hide-table').addEventListener('click', () => {
        document.getElementById('table-section').style.display = "none";
    });

    // LOAD PASSWORDS (✅ FIXED)
    function loadPasswords() {
        fetch(`${BASE_URL}/getPasswords`)
            .then(res => res.json())
            .then(data => {
                const table = document.getElementById('password-table');
                table.innerHTML = "";

                data.forEach(item => {
                    const row = `
                        <tr>
                            <td>${item.website}</td>
                            <td>${item.password}</td>
                            <td>${new Date(item.time).toLocaleString()}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                });
            });
    }

    // IP API
    document.getElementById('get-ip').addEventListener('click', () => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                document.getElementById('ip-result').textContent =
                    "Your IP: " + data.ip;
            });
    });

});