// // // const BASE_URL = "https://password-checker-i2dj.onrender.com";

// // // document.addEventListener("DOMContentLoaded", function () {

// // //     // ================= PASSWORD CHECK =================
// // //     document.getElementById('password-form').addEventListener('submit', function (e) {
// // //         e.preventDefault();

// // //         const password = document.getElementById('password').value;

// // //         fetch(`${BASE_URL}/checkPasswordStrength`, {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ password })
// // //         })
// // //         .then(res => res.json())
// // //         .then(data => {
// // //             document.getElementById('strength-score').textContent =
// // //                 "Strength: " + data.strength_score;

// // //             document.getElementById('recommendations').textContent =
// // //                 data.advice;

// // //             document.getElementById('breach-status').textContent =
// // //                 data.breached ? "⚠️ Breached" : "✅ Safe";
// // //         });
// // //     });

// // //     // ================= GENERATE =================
// // //     document.getElementById('generate-password').addEventListener('click', () => {
// // //         fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
// // //             .then(res => res.json())
// // //             .then(data => {
// // //                 document.getElementById('generated-password').value =
// // //                     data.generated_password;
// // //             });
// // //     });

// // //     // ================= SAVE =================
// // //     document.getElementById('save-password').addEventListener('click', () => {
// // //         const website = document.getElementById('website').value;
// // //         const password = document.getElementById('generated-password').value;

// // //         if (!website || !password) {
// // //             alert("Enter website and generate password!");
// // //             return;
// // //         }

// // //         fetch(`${BASE_URL}/savePassword`, {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ website, password })
// // //         })
// // //         .then(() => alert("Saved!"));
// // //     });

// // //     // ================= TABLE =================
// // //     document.getElementById('show-table').addEventListener('click', () => {
// // //         document.getElementById('table-section').style.display = "block";
// // //         loadPasswords();
// // //     });

// // //     document.getElementById('hide-table').addEventListener('click', () => {
// // //         document.getElementById('table-section').style.display = "none";
// // //     });

// // //     function loadPasswords() {
// // //         fetch(`${BASE_URL}/getPasswords`)
// // //             .then(res => res.json())
// // //             .then(data => {
// // //                 const table = document.getElementById('password-table');
// // //                 table.innerHTML = "";

// // //                 data.forEach(item => {
// // //                     table.innerHTML += `
// // //                         <tr>
// // //                             <td>${item.website}</td>
// // //                             <td>${item.password}</td>
// // //                             <td>${new Date(item.time).toLocaleString()}</td>
// // //                         </tr>
// // //                     `;
// // //                 });
// // //             });
// // //     }

// // //     // =================================================
// // //     // 🔥 POLL SYSTEM (CORS FIXED USING BACKEND PROXY)
// // //     // =================================================

// // //     // LOAD POLLS
// // //     document.getElementById('load-polls').addEventListener('click', () => {
// // //         fetch(`${BASE_URL}/pollsProxy`)
// // //             .then(res => res.json())
// // //             .then(data => {

// // //                 const container = document.getElementById('polls-container');
// // //                 container.innerHTML = "";

// // //                 data.forEach(poll => {

// // //                     let optionsHTML = "";

// // //                     poll.options.forEach(opt => {
// // //                         optionsHTML += `
// // //                             <button class="btn btn-outline-primary m-1 vote-btn"
// // //                                 data-poll="${poll.id}"
// // //                                 data-option="${opt.id}">
// // //                                 ${opt.text}
// // //                             </button>
// // //                         `;
// // //                     });

// // //                     container.innerHTML += `
// // //                         <div class="card p-3 mb-3">
// // //                             <h5>${poll.question}</h5>
// // //                             ${optionsHTML}
// // //                             <button class="btn btn-success mt-2 view-results"
// // //                                 data-id="${poll.id}">
// // //                                 View Results
// // //                             </button>
// // //                             <div id="results-${poll.id}"></div>
// // //                         </div>
// // //                     `;
// // //                 });

// // //                 addVoteListeners();
// // //                 addResultListeners();
// // //             });
// // //     });

// // //     // VOTE
// // //     function addVoteListeners() {
// // //         document.querySelectorAll('.vote-btn').forEach(btn => {
// // //             btn.addEventListener('click', () => {

// // //                 fetch(`${BASE_URL}/voteProxy/${btn.dataset.poll}`, {
// // //                     method: 'POST',
// // //                     headers: { 'Content-Type': 'application/json' },
// // //                     body: JSON.stringify({
// // //                         option_id: btn.dataset.option,
// // //                         voter_token: Math.random().toString()
// // //                     })
// // //                 })
// // //                 .then(() => alert("Vote submitted!"));
// // //             });
// // //         });
// // //     }

// // //     // RESULTS
// // //     function addResultListeners() {
// // //         document.querySelectorAll('.view-results').forEach(btn => {
// // //             btn.addEventListener('click', () => {

// // //                 fetch(`${BASE_URL}/resultsProxy/${btn.dataset.id}`)
// // //                     .then(res => res.json())
// // //                     .then(data => {

// // //                         let html = "<ul>";

// // //                         data.results.forEach(r => {
// // //                             html += `<li>${r.option_text}: ${r.votes}</li>`;
// // //                         });

// // //                         html += "</ul>";

// // //                         document.getElementById(`results-${btn.dataset.id}`).innerHTML = html;
// // //                     });
// // //             });
// // //         });
// // //     }

// // //     // CREATE POLL
// // //     document.getElementById('create-poll').addEventListener('click', () => {

// // //         const question = document.getElementById('poll-question').value;
// // //         const options = document.getElementById('poll-options').value.split(",");

// // //         if (!question || options.length < 2) {
// // //             alert("Enter question and at least 2 options!");
// // //             return;
// // //         }

// // //         fetch(`${BASE_URL}/createPollProxy`, {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({
// // //                 question,
// // //                 options,
// // //                 category: "general",
// // //                 created_by: "Rajesh"
// // //             })
// // //         })
// // //         .then(() => {
// // //             alert("Poll created successfully!");
// // //         });
// // //     });

// // //     // ================= IP API =================
// // //     document.getElementById('get-ip').addEventListener('click', () => {
// // //         fetch('https://api.ipify.org?format=json')
// // //             .then(res => res.json())
// // //             .then(data => {
// // //                 document.getElementById('ip-result').textContent =
// // //                     "Your IP: " + data.ip;
// // //             });
// // //     });

// // // });
// // // =================================================
// // // 🔥 POLL SYSTEM (FINAL FIX WITH ERROR HANDLING)
// // // =================================================

// // // LOAD POLLS
// // document.getElementById('load-polls').addEventListener('click', () => {
// //     fetch(`${BASE_URL}/pollsProxy`)
// //         .then(res => {
// //             if (!res.ok) throw new Error("Failed to load polls");
// //             return res.json();
// //         })
// //         .then(data => {

// //             const container = document.getElementById('polls-container');
// //             container.innerHTML = "";

// //             data.forEach(poll => {

// //                 let optionsHTML = "";

// //                 poll.options.forEach(opt => {
// //                     optionsHTML += `
// //                         <button class="btn btn-outline-primary m-1 vote-btn"
// //                             data-poll="${poll.id}"
// //                             data-option="${opt.id}">
// //                             ${opt.text}
// //                         </button>
// //                     `;
// //                 });

// //                 container.innerHTML += `
// //                     <div class="card p-3 mb-3">
// //                         <h5>${poll.question}</h5>
// //                         ${optionsHTML}
// //                         <button class="btn btn-success mt-2 view-results"
// //                             data-id="${poll.id}">
// //                             View Results
// //                         </button>
// //                         <div id="results-${poll.id}"></div>
// //                     </div>
// //                 `;
// //             });

// //             addVoteListeners();
// //             addResultListeners();
// //         })
// //         .catch(err => {
// //             console.error("Poll Load Error:", err);
// //             alert("Failed to load polls. Check server or API.");
// //         });
// // });


// // // VOTE
// // function addVoteListeners() {
// //     document.querySelectorAll('.vote-btn').forEach(btn => {
// //         btn.addEventListener('click', () => {

// //             fetch(`${BASE_URL}/voteProxy/${btn.dataset.poll}`, {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({
// //                     option_id: btn.dataset.option,
// //                     voter_token: Math.random().toString()
// //                 })
// //             })
// //             .then(res => {
// //                 if (!res.ok) throw new Error("Vote failed");
// //                 return res.json();
// //             })
// //             .then(() => alert("Vote submitted!"))
// //             .catch(err => {
// //                 console.error("Vote Error:", err);
// //                 alert("Vote failed");
// //             });
// //         });
// //     });
// // }


// // // RESULTS
// // function addResultListeners() {
// //     document.querySelectorAll('.view-results').forEach(btn => {
// //         btn.addEventListener('click', () => {

// //             fetch(`${BASE_URL}/resultsProxy/${btn.dataset.id}`)
// //                 .then(res => {
// //                     if (!res.ok) throw new Error("Results failed");
// //                     return res.json();
// //                 })
// //                 .then(data => {

// //                     let html = "<ul>";

// //                     data.results.forEach(r => {
// //                         html += `<li>${r.option_text}: ${r.votes}</li>`;
// //                     });

// //                     html += "</ul>";

// //                     document.getElementById(`results-${btn.dataset.id}`).innerHTML = html;
// //                 })
// //                 .catch(err => {
// //                     console.error("Results Error:", err);
// //                     alert("Failed to load results");
// //                 });
// //         });
// //     });
// // }


// // // CREATE POLL
// // document.getElementById('create-poll').addEventListener('click', () => {

// //     const question = document.getElementById('poll-question').value;
// //     const options = document.getElementById('poll-options').value.split(",");

// //     if (!question || options.length < 2) {
// //         alert("Enter question and at least 2 options!");
// //         return;
// //     }

// //     fetch(`${BASE_URL}/createPollProxy`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //             question,
// //             options,
// //             category: "general",
// //             created_by: "Rajesh"
// //         })
// //     })
// //     .then(res => {
// //         if (!res.ok) throw new Error("Create poll failed");
// //         return res.json();
// //     })
// //     .then(() => {
// //         alert("Poll created successfully!");
// //     })
// //     .catch(err => {
// //         console.error("Create Poll Error:", err);
// //         alert("Failed to create poll");
// //     });
// // });
// const BASE_URL = "https://password-checker-i2dj.onrender.com";

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
//             document.getElementById('breach-status').textContent = data.breached ? "⚠️ Breached" : "✅ Safe";
//         });
//     });

//     // GENERATE
//     document.getElementById('generate-password').addEventListener('click', () => {
//         fetch(`${BASE_URL}/generateStrongPassword`, { method: 'POST' })
//             .then(res => res.json())
//             .then(data => {
//                 document.getElementById('generated-password').value = data.generated_password;
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

//     // LOAD PASSWORDS
//     document.getElementById('show-table').addEventListener('click', loadPasswords);

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

//     // ================= POLL =================

//     document.getElementById('load-polls').addEventListener('click', () => {
//         fetch(`${BASE_URL}/pollsProxy`)
//             .then(res => res.json())
//             .then(data => {

//                 const container = document.getElementById('polls-container');
//                 container.innerHTML = "";

//                 data.forEach(poll => {
//                     let html = `<h4>${poll.question}</h4>`;

//                     poll.options.forEach(opt => {
//                         html += `<button onclick="vote('${poll.id}','${opt.id}')">${opt.text}</button>`;
//                     });

//                     html += `<button onclick="results('${poll.id}')">Results</button>`;
//                     html += `<div id="res-${poll.id}"></div>`;

//                     container.innerHTML += `<div>${html}</div>`;
//                 });
//             });
//     });

//     document.getElementById('create-poll').addEventListener('click', () => {
//         const question = document.getElementById('poll-question').value;
//         const options = document.getElementById('poll-options').value.split(",");

//         fetch(`${BASE_URL}/createPollProxy`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 question,
//                 options,
//                 category: "general",
//                 created_by: "Rajesh"
//             })
//         })
//         .then(() => alert("Poll created!"));
//     });

// });

// // GLOBAL FUNCTIONS
// function vote(pollId, optionId) {
//     fetch(`https://password-checker-i2dj.onrender.com/voteProxy/${pollId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             option_id: optionId,
//             voter_token: Math.random().toString()
//         })
//     })
//     .then(() => alert("Voted!"));
// }

// function results(pollId) {
//     fetch(`https://password-checker-i2dj.onrender.com/resultsProxy/${pollId}`)
//         .then(res => res.json())
//         .then(data => {
//             let html = "";
//             data.results.forEach(r => {
//                 html += `<p>${r.option_text}: ${r.votes}</p>`;
//             });
//             document.getElementById(`res-${pollId}`).innerHTML = html;
//         });
// }
// const BASE_URL = "https://password-checker-i2dj.onrender.com";

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
//                 document.getElementById('generated-password').value = data.generated_password;
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

//     // LOAD PASSWORDS
//     document.getElementById('show-table').addEventListener('click', loadPasswords);

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

//     // ================= POLL =================

//     document.getElementById('load-polls').addEventListener('click', () => {

//         fetch(`${BASE_URL}/pollsProxy`)
//             .then(async res => {
//                 const data = await res.json();

//                 if (!res.ok) {
//                     throw new Error(data.details || "Server error");
//                 }

//                 return data;
//             })
//             .then(data => {

//                 const container = document.getElementById('polls-container');
//                 container.innerHTML = "";

//                 data.forEach(poll => {
//                     let html = `<h4>${poll.question}</h4>`;

//                     poll.options.forEach(opt => {
//                         html += `<button onclick="vote('${poll.id}','${opt.id}')">${opt.text}</button>`;
//                     });

//                     html += `<button onclick="results('${poll.id}')">Results</button>`;
//                     html += `<div id="res-${poll.id}"></div>`;

//                     container.innerHTML += `<div class="mb-3">${html}</div>`;
//                 });
//             })
//             .catch(err => {
//                 console.error("Poll Load Error:", err.message);
//                 alert("Error: " + err.message);
//             });
//     });

//     // CREATE POLL
//     document.getElementById('create-poll').addEventListener('click', () => {

//         const question = document.getElementById('poll-question').value;
//         const options = document.getElementById('poll-options').value.split(",");

//         fetch(`${BASE_URL}/createPollProxy`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 question,
//                 options,
//                 category: "general",
//                 created_by: "Rajesh"
//             })
//         })
//         .then(async res => {
//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.details || "Create failed");
//             }

//             alert("Poll created!");
//         })
//         .catch(err => {
//             console.error("Create Poll Error:", err.message);
//             alert(err.message);
//         });
//     });

// });


// // GLOBAL FUNCTIONS

// function vote(pollId, optionId) {
//     fetch(`https://password-checker-i2dj.onrender.com/voteProxy/${pollId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             option_id: optionId,
//             voter_token: Math.random().toString()
//         })
//     })
//     .then(() => alert("Voted!"))
//     .catch(() => alert("Vote failed"));
// }

// function results(pollId) {
//     fetch(`https://password-checker-i2dj.onrender.com/resultsProxy/${pollId}`)
//         .then(res => res.json())
//         .then(data => {
//             let html = "";

//             data.results.forEach(r => {
//                 html += `<p>${r.option_text}: ${r.votes}</p>`;
//             });

//             document.getElementById(`res-${pollId}`).innerHTML = html;
//         })
//         .catch(() => alert("Failed to load results"));
// }
const BASE_URL = "https://password-checker-i2dj.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

    // PASSWORD CHECK
    document.getElementById("password-form").addEventListener("submit", e => {
        e.preventDefault();

        const password = document.getElementById("password").value;

        fetch(`${BASE_URL}/checkPasswordStrength`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("strength-score").textContent = "Strength: " + data.strength_score;
            document.getElementById("recommendations").textContent = data.advice;
            document.getElementById("breach-status").textContent =
                data.breached ? "⚠️ Breached" : "✅ Safe";
        });
    });

    // GENERATE
    document.getElementById("generate-password").onclick = () => {
        fetch(`${BASE_URL}/generateStrongPassword`, { method: "POST" })
        .then(res => res.json())
        .then(data => {
            document.getElementById("generated-password").value = data.generated_password;
        });
    };

    // SAVE
    document.getElementById("save-password").onclick = () => {
        const website = document.getElementById("website").value;
        const password = document.getElementById("generated-password").value;

        fetch(`${BASE_URL}/savePassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ website, password })
        })
        .then(() => alert("Saved!"));
    };

    // TABLE SHOW/HIDE
    document.getElementById("show-table").onclick = () => {
        document.getElementById("table-section").classList.remove("hidden");
        loadPasswords();
    };

    document.getElementById("hide-table").onclick = () => {
        document.getElementById("table-section").classList.add("hidden");
    };

    function loadPasswords() {
        fetch(`${BASE_URL}/getPasswords`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("password-table");
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

    // LOAD POLLS
    document.getElementById("load-polls").onclick = () => {
        fetch(`${BASE_URL}/pollsProxy`)
        .then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.details || "Poll error");
            return data;
        })
        .then(data => {
            const container = document.getElementById("polls-container");
            container.innerHTML = "";

            data.forEach(poll => {
                let html = `<p><b>${poll.question}</b></p>`;

                poll.options.forEach(opt => {
                    html += `<button onclick="vote('${poll.id}','${opt.id}')">${opt.text}</button>`;
                });

                html += `<button onclick="results('${poll.id}')">Results</button>`;
                html += `<div id="res-${poll.id}"></div>`;

                container.innerHTML += `<div>${html}</div>`;
            });
        })
        .catch(err => {
            alert(err.message);
        });
    };

    // CREATE POLL
    document.getElementById("create-poll").onclick = () => {
        const question = document.getElementById("poll-question").value;
        const options = document.getElementById("poll-options").value.split(",");

        fetch(`${BASE_URL}/createPollProxy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question,
                options,
                category: "general",
                created_by: "Rajesh"
            })
        })
        .then(res => res.json())
        .then(() => alert("Poll created"))
        .catch(() => alert("Error creating poll"));
    };

    // IP
    document.getElementById("get-ip").onclick = () => {
        fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            document.getElementById("ip-result").textContent = data.ip;
        });
    };

});

// GLOBAL FUNCTIONS
function vote(pollId, optionId) {
    fetch(`https://password-checker-i2dj.onrender.com/voteProxy/${pollId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            option_id: optionId,
            voter_token: Math.random().toString()
        })
    })
    .then(() => alert("Voted"))
    .catch(() => alert("Vote failed"));
}

function results(pollId) {
    fetch(`https://password-checker-i2dj.onrender.com/resultsProxy/${pollId}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.results.forEach(r => {
            html += `<p>${r.option_text}: ${r.votes}</p>`;
        });
        document.getElementById(`res-${pollId}`).innerHTML = html;
    });
}