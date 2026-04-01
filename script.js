// const BASE_URL = "https://password-checker-i2dj.onrender.com";
// const POLL_BASE = "https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls";
// const API_KEY = "pollhub-secret-key-2024";

// document.addEventListener("DOMContentLoaded", function () {

//     // PASSWORD CHECK
//     document.getElementById('password-form').addEventListener('submit', function (e) {
//         e.preventDefault();

//         const password = document.getElementById('password').value;

//         fetch(`${BASE_URL}/checkPasswordStrength`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ password })
//         })
//         .then(res => res.json())
//         .then(data => {
//             document.getElementById('strength-score').textContent = "Strength: " + data.strength_score;
//             document.getElementById('recommendations').textContent = data.advice;
//             document.getElementById('breach-status').textContent =
//                 data.breached ? "⚠️ Breached" : "✅ Safe";
//         });
//     });

//     // GENERATE
//     document.getElementById('generate-password').addEventListener('click', () => {
//         fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
//             .then(res => res.json())
//             .then(data => {
//                 document.getElementById('generated-password').value =
//                     data.generated_password;
//             });
//     });

//     // SAVE
//     document.getElementById('save-password').addEventListener('click', () => {
//         const website = document.getElementById('website').value;
//         const password = document.getElementById('generated-password').value;

//         fetch(`${BASE_URL}/savePassword`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ website, password })
//         })
//         .then(() => alert("Saved!"));
//     });

//     // SHOW TABLE
//     document.getElementById('show-table').addEventListener('click', () => {
//         document.getElementById('table-section').style.display = "block";
//         loadPasswords();
//     });

//     // HIDE TABLE
//     document.getElementById('hide-table').addEventListener('click', () => {
//         document.getElementById('table-section').style.display = "none";
//     });

//     function loadPasswords() {
//         fetch(`${BASE_URL}/getPasswords`)
//             .then(res => res.json())
//             .then(data => {
//                 const table = document.getElementById('password-table');
//                 table.innerHTML = "";

//                 data.forEach(item => {
//                     table.innerHTML += `
//                         <tr>
//                             <td>${item.website}</td>
//                             <td>${item.password}</td>
//                             <td>${new Date(item.time).toLocaleString()}</td>
//                         </tr>
//                     `;
//                 });
//             });
//     }

//     // ================= POLL SYSTEM =================

//     document.getElementById('load-polls').addEventListener('click', () => {
//         fetch(POLL_BASE)
//             .then(res => res.json())
//             .then(data => {
//                 const container = document.getElementById('polls-container');
//                 container.innerHTML = "";

//                 data.forEach(poll => {
//                     let optionsHTML = "";

//                     poll.options.forEach(opt => {
//                         optionsHTML += `
//                             <button class="btn btn-outline-primary m-1 vote-btn"
//                                 data-poll="${poll.id}"
//                                 data-option="${opt.id}">
//                                 ${opt.text}
//                             </button>
//                         `;
//                     });

//                     container.innerHTML += `
//                         <div class="card p-3 mb-3">
//                             <h5>${poll.question}</h5>
//                             ${optionsHTML}
//                             <button class="btn btn-success mt-2 view-results"
//                                 data-id="${poll.id}">
//                                 View Results
//                             </button>
//                             <div id="results-${poll.id}"></div>
//                         </div>
//                     `;
//                 });

//                 addVoteListeners();
//                 addResultListeners();
//             });
//     });

//     function addVoteListeners() {
//         document.querySelectorAll('.vote-btn').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 fetch(`${POLL_BASE}/${btn.dataset.poll}/vote`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         option_id: btn.dataset.option,
//                         voter_token: Math.random().toString()
//                     })
//                 })
//                 .then(() => alert("Vote submitted!"));
//             });
//         });
//     }

//     function addResultListeners() {
//         document.querySelectorAll('.view-results').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 fetch(`${POLL_BASE}/${btn.dataset.id}/results`)
//                     .then(res => res.json())
//                     .then(data => {
//                         let html = "<ul>";

//                         data.results.forEach(r => {
//                             html += `<li>${r.option_text}: ${r.votes}</li>`;
//                         });

//                         html += "</ul>";

//                         document.getElementById(`results-${btn.dataset.id}`).innerHTML = html;
//                     });
//             });
//         });
//     }

//     // CREATE POLL
//     document.getElementById('create-poll').addEventListener('click', () => {
//         const question = document.getElementById('poll-question').value;
//         const options = document.getElementById('poll-options').value.split(",");

//         fetch(POLL_BASE, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-api-key': API_KEY
//             },
//             body: JSON.stringify({
//                 question,
//                 options,
//                 category: "general",
//                 created_by: "Rajesh"
//             })
//         })
//         .then(() => alert("Poll created!"));
//     });

//     // IP API
//     document.getElementById('get-ip').addEventListener('click', () => {
//         fetch('https://api.ipify.org?format=json')
//             .then(res => res.json())
//             .then(data => {
//                 document.getElementById('ip-result').textContent =
//                     "Your IP: " + data.ip;
//             });
//     });

// });
const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.addEventListener("DOMContentLoaded", function () {

    // ================= PASSWORD CHECK =================
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

    // ================= GENERATE =================
    document.getElementById('generate-password').addEventListener('click', () => {
        fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                document.getElementById('generated-password').value =
                    data.generated_password;
            });
    });

    // ================= SAVE =================
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

    // ================= TABLE =================
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
                        </tr>
                    `;
                });
            });
    }

    // =================================================
    // 🔥 POLL SYSTEM (CORS FIXED USING PROXY)
    // =================================================

    // LOAD POLLS
    document.getElementById('load-polls').addEventListener('click', () => {
        fetch(`${BASE_URL}/pollsProxy`)
            .then(res => res.json())
            .then(data => {

                const container = document.getElementById('polls-container');
                container.innerHTML = "";

                data.forEach(poll => {

                    let optionsHTML = "";

                    poll.options.forEach(opt => {
                        optionsHTML += `
                            <button class="btn btn-outline-primary m-1 vote-btn"
                                data-poll="${poll.id}"
                                data-option="${opt.id}">
                                ${opt.text}
                            </button>
                        `;
                    });

                    container.innerHTML += `
                        <div class="card p-3 mb-3">
                            <h5>${poll.question}</h5>
                            ${optionsHTML}
                            <button class="btn btn-success mt-2 view-results"
                                data-id="${poll.id}">
                                View Results
                            </button>
                            <div id="results-${poll.id}"></div>
                        </div>
                    `;
                });

                addVoteListeners();
                addResultListeners();
            });
    });

    // VOTE
    function addVoteListeners() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', () => {

                fetch(`${BASE_URL}/voteProxy/${btn.dataset.poll}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        option_id: btn.dataset.option,
                        voter_token: Math.random().toString()
                    })
                })
                .then(() => alert("Vote submitted!"));
            });
        });
    }

    // RESULTS
    function addResultListeners() {
        document.querySelectorAll('.view-results').forEach(btn => {
            btn.addEventListener('click', () => {

                fetch(`${BASE_URL}/resultsProxy/${btn.dataset.id}`)
                    .then(res => res.json())
                    .then(data => {

                        let html = "<ul>";

                        data.results.forEach(r => {
                            html += `<li>${r.option_text}: ${r.votes}</li>`;
                        });

                        html += "</ul>";

                        document.getElementById(`results-${btn.dataset.id}`).innerHTML = html;
                    });
            });
        });
    }

    // CREATE POLL
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
        .then(() => alert("Poll created successfully!"));
    });

    // ================= IP API =================
    document.getElementById('get-ip').addEventListener('click', () => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                document.getElementById('ip-result').textContent =
                    "Your IP: " + data.ip;
            });
    });

});