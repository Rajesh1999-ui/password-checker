
const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

    // PASSWORD CHECK
    document.getElementById('password-form').addEventListener('submit', e => {
        e.preventDefault();

        const password = document.getElementById('password').value;

        fetch(`${BASE_URL}/checkPasswordStrength`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('strength-score').textContent = "Strength: " + data.strength_score;
            document.getElementById('recommendations').textContent = data.advice;
            document.getElementById('breach-status').textContent =
                data.breached ? "⚠️ Breached" : "✅ Safe";
        });
    });

    // GENERATE
    document.getElementById('generate-password').addEventListener('click', () => {
        fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            document.getElementById('generated-password').value = data.generated_password;
        });
    });

    // SAVE
    document.getElementById('save-password').addEventListener('click', () => {
        const website = document.getElementById('website').value;
        const password = document.getElementById('generated-password').value;

        fetch(`${BASE_URL}/savePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ website, password })
        })
        .then(() => alert("Saved!"));
    });

    
    document.getElementById('show-table').addEventListener('click', () => {
        document.getElementById('table-section').style.display = "block";
        loadPasswords();
    });

    document.getElementById('hide-table').addEventListener('click', () => {
        document.getElementById('table-section').style.display = "none";
    });

    function loadPasswords() {
        fetch(`${BASE_URL}/getPasswords`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('password-table');
            table.innerHTML = "";

            data.forEach(item => {
                table.innerHTML += `
                <tr>
                    <td>${item.website}</td>
                    <td>${item.password}</td>
                    <td>${new Date(item.time).toLocaleString()}</td>
                </tr>`;
            });
        });
    }

    document.getElementById('load-polls').addEventListener('click', () => {
        fetch(`${BASE_URL}/pollsProxy`)
        .then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.details || "Poll error");
            return data;
        })
        .then(data => {
            const container = document.getElementById('polls-container');
            container.innerHTML = "";

            data.forEach(poll => {
                let html = `<strong>${poll.question}</strong><br>`;

                poll.options.forEach(opt => {
                    html += `<button onclick="vote('${poll.id}','${opt.id}')">${opt.text}</button>`;
                });

                html += `<br><button onclick="results('${poll.id}')">Results</button>`;
                html += `<div id="res-${poll.id}"></div>`;

                container.innerHTML += `<div>${html}</div>`;
            });
        })
        .catch(err => alert("Poll Error: " + err.message));
    });
    document.getElementById('create-poll').addEventListener('click', () => {
        const question = document.getElementById('poll-question').value;
        const options = document.getElementById('poll-options').value.split(",");

        fetch(`${BASE_URL}/createPollProxy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question,
                options,
                category: "general",
                created_by: "Rajesh"
            })
        })
        .then(res => res.json())
        .then(() => alert("Poll created"))
        .catch(() => alert("Create failed"));
    });

    // IP
    document.getElementById('get-ip').addEventListener('click', () => {
        fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('ip-result').textContent = "IP: " + data.ip;
        });
    });

});
function vote(pollId, optionId) {
    fetch(`${BASE_URL}/voteProxy/${pollId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            option_id: optionId,
            voter_token: Math.random().toString()
        })
    })
    .then(() => alert("Voted"))
    .catch(() => alert("Vote failed"));
}

function results(pollId) {
    fetch(`${BASE_URL}/resultsProxy/${pollId}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.results.forEach(r => {
            html += `<p>${r.option_text}: ${r.votes}</p>`;
        });
        document.getElementById(`res-${pollId}`).innerHTML = html;
    });
}