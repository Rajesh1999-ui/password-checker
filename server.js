// // // // // // // const express = require('express');
// // // // // // // const app = express();
// // // // // // // const bodyParser = require('body-parser');
// // // // // // // const zxcvbn = require('zxcvbn');
// // // // // // // const cors = require('cors');
// // // // // // // const axios = require('axios');
// // // // // // // const crypto = require('crypto');
// // // // // // // const fs = require('fs');
// // // // // // // const path = require('path');

// // // // // // // app.use(cors());
// // // // // // // app.use(bodyParser.json());

// // // // // // // const port = process.env.PORT || 3000;

// // // // // // // app.use(express.static(__dirname));

// // // // // // // app.get('/', (req, res) => {
// // // // // // //     res.sendFile(path.join(__dirname, 'index.html'));
// // // // // // // });

// // // // // // // const filePath = path.join(__dirname, 'data.json');

// // // // // // // // PASSWORD CHECK
// // // // // // // app.post('/checkPasswordStrength', async (req, res) => {
// // // // // // //     const { password } = req.body;

// // // // // // //     const result = zxcvbn(password);

// // // // // // //     const sha1 = crypto.createHash('sha1')
// // // // // // //         .update(password)
// // // // // // //         .digest('hex')
// // // // // // //         .toUpperCase();

// // // // // // //     const prefix = sha1.substring(0, 5);
// // // // // // //     const suffix = sha1.substring(5);

// // // // // // //     let breached = false;

// // // // // // //     try {
// // // // // // //         const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
// // // // // // //         const lines = response.data.split('\n');

// // // // // // //         for (let line of lines) {
// // // // // // //             const [hashSuffix] = line.split(':');
// // // // // // //             if (hashSuffix === suffix) {
// // // // // // //                 breached = true;
// // // // // // //                 break;
// // // // // // //             }
// // // // // // //         }
// // // // // // //     } catch {}

// // // // // // //     res.json({
// // // // // // //         strength_score: result.score,
// // // // // // //         advice: result.score <= 2 ? "Weak password" : "Strong password",
// // // // // // //         breached
// // // // // // //     });
// // // // // // // });

// // // // // // // // GENERATE PASSWORD
// // // // // // // app.post('/generateStrongPassword', (req, res) => {
// // // // // // //     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
// // // // // // //     let password = '';

// // // // // // //     for (let i = 0; i < 12; i++) {
// // // // // // //         password += chars[Math.floor(Math.random() * chars.length)];
// // // // // // //     }

// // // // // // //     res.json({ generated_password: password });
// // // // // // // });

// // // // // // // // SAVE PASSWORD (FILE)
// // // // // // // app.post('/savePassword', (req, res) => {
// // // // // // //     const { website, password } = req.body;

// // // // // // //     let data = [];

// // // // // // //     try {
// // // // // // //         data = JSON.parse(fs.readFileSync(filePath));
// // // // // // //     } catch {}

// // // // // // //     data.push({
// // // // // // //         website,
// // // // // // //         password,
// // // // // // //         time: new Date()
// // // // // // //     });

// // // // // // //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// // // // // // //     res.json({ message: "Saved" });
// // // // // // // });

// // // // // // // // GET PASSWORDS
// // // // // // // app.get('/getPasswords', (req, res) => {
// // // // // // //     try {
// // // // // // //         const data = JSON.parse(fs.readFileSync(filePath));
// // // // // // //         res.json(data.filter(item => item.website));
// // // // // // //     } catch {
// // // // // // //         res.json([]);
// // // // // // //     }
// // // // // // // });

// // // // // // // app.listen(port, () => {
// // // // // // //     console.log(`Server running on port ${port}`);
// // // // // // // });
// // // // // // const express = require('express');
// // // // // // const app = express();
// // // // // // const bodyParser = require('body-parser');
// // // // // // const zxcvbn = require('zxcvbn');
// // // // // // const cors = require('cors');
// // // // // // const axios = require('axios');
// // // // // // const crypto = require('crypto');
// // // // // // const fs = require('fs');
// // // // // // const path = require('path');

// // // // // // app.use(cors());
// // // // // // app.use(bodyParser.json());

// // // // // // const port = process.env.PORT || 3000;

// // // // // // // ✅ Serve frontend
// // // // // // app.use(express.static(__dirname));

// // // // // // app.get('/', (req, res) => {
// // // // // //     res.sendFile(path.join(__dirname, 'index.html'));
// // // // // // });

// // // // // // const filePath = path.join(__dirname, 'data.json');


// // // // // // // ================= PASSWORD CHECK =================
// // // // // // app.post('/checkPasswordStrength', async (req, res) => {
// // // // // //     const { password } = req.body;

// // // // // //     const result = zxcvbn(password);

// // // // // //     const sha1 = crypto.createHash('sha1')
// // // // // //         .update(password)
// // // // // //         .digest('hex')
// // // // // //         .toUpperCase();

// // // // // //     const prefix = sha1.substring(0, 5);
// // // // // //     const suffix = sha1.substring(5);

// // // // // //     let breached = false;

// // // // // //     try {
// // // // // //         const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
// // // // // //         const lines = response.data.split('\n');

// // // // // //         for (let line of lines) {
// // // // // //             const [hashSuffix] = line.split(':');
// // // // // //             if (hashSuffix === suffix) {
// // // // // //                 breached = true;
// // // // // //                 break;
// // // // // //             }
// // // // // //         }
// // // // // //     } catch {}

// // // // // //     res.json({
// // // // // //         strength_score: result.score,
// // // // // //         advice: result.score <= 2 ? "Weak password" : "Strong password",
// // // // // //         breached
// // // // // //     });
// // // // // // });


// // // // // // // ================= GENERATE PASSWORD =================
// // // // // // app.post('/generateStrongPassword', (req, res) => {
// // // // // //     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
// // // // // //     let password = '';

// // // // // //     for (let i = 0; i < 12; i++) {
// // // // // //         password += chars[Math.floor(Math.random() * chars.length)];
// // // // // //     }

// // // // // //     res.json({ generated_password: password });
// // // // // // });


// // // // // // // ================= SAVE PASSWORD (FILE) =================
// // // // // // app.post('/savePassword', (req, res) => {
// // // // // //     const { website, password } = req.body;

// // // // // //     let data = [];

// // // // // //     try {
// // // // // //         data = JSON.parse(fs.readFileSync(filePath));
// // // // // //     } catch {}

// // // // // //     data.push({
// // // // // //         website,
// // // // // //         password,
// // // // // //         time: new Date()
// // // // // //     });

// // // // // //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// // // // // //     res.json({ message: "Saved" });
// // // // // // });


// // // // // // // ================= GET PASSWORDS =================
// // // // // // app.get('/getPasswords', (req, res) => {
// // // // // //     try {
// // // // // //         const data = JSON.parse(fs.readFileSync(filePath));
// // // // // //         res.json(data.filter(item => item.website));
// // // // // //     } catch {
// // // // // //         res.json([]);
// // // // // //     }
// // // // // // });


// // // // // // // =====================================================
// // // // // // // 🔥🔥🔥 POLL PROXY (CORS FIX - IMPORTANT)
// // // // // // // =====================================================

// // // // // // // GET ALL POLLS
// // // // // // app.get('/pollsProxy', async (req, res) => {
// // // // // //     try {
// // // // // //         const response = await axios.get(
// // // // // //             'https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls'
// // // // // //         );
// // // // // //         res.json(response.data);
// // // // // //     } catch (err) {
// // // // // //         console.log("Poll fetch error:", err.message);
// // // // // //         res.status(500).send("Error fetching polls");
// // // // // //     }
// // // // // // });

// // // // // // // CREATE POLL
// // // // // // app.post('/createPollProxy', async (req, res) => {
// // // // // //     try {
// // // // // //         const response = await axios.post(
// // // // // //             'https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls',
// // // // // //             req.body,
// // // // // //             {
// // // // // //                 headers: {
// // // // // //                     'x-api-key': 'pollhub-secret-key-2024'
// // // // // //                 }
// // // // // //             }
// // // // // //         );

// // // // // //         res.json(response.data);
// // // // // //     } catch (err) {
// // // // // //         console.log("Create poll error:", err.message);
// // // // // //         res.status(500).send("Error creating poll");
// // // // // //     }
// // // // // // });

// // // // // // // VOTE
// // // // // // app.post('/voteProxy/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         const response = await axios.post(
// // // // // //             `https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls/${req.params.id}/vote`,
// // // // // //             req.body
// // // // // //         );

// // // // // //         res.json(response.data);
// // // // // //     } catch (err) {
// // // // // //         console.log("Vote error:", err.message);
// // // // // //         res.status(500).send("Error voting");
// // // // // //     }
// // // // // // });

// // // // // // // GET RESULTS
// // // // // // app.get('/resultsProxy/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         const response = await axios.get(
// // // // // //             `https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls/${req.params.id}/results`
// // // // // //         );

// // // // // //         res.json(response.data);
// // // // // //     } catch (err) {
// // // // // //         console.log("Results error:", err.message);
// // // // // //         res.status(500).send("Error fetching results");
// // // // // //     }
// // // // // // });


// // // // // // // ================= START SERVER =================
// // // // // // app.listen(port, () => {
// // // // // //     console.log(`🚀 Server running on port ${port}`);
// // // // // // });
// // // // // // ================= POLL PROXY (FIXED) =================

// // // // // const POLL_API = "https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls";

// // // // // // GET POLLS
// // // // // app.get('/pollsProxy', async (req, res) => {
// // // // //     try {
// // // // //         const response = await axios.get(POLL_API);
// // // // //         res.json(response.data);
// // // // //     } catch (err) {
// // // // //         console.error("Poll fetch error:", err.message);

// // // // //         res.status(500).json({
// // // // //             error: "Failed to fetch polls",
// // // // //             details: err.message
// // // // //         });
// // // // //     }
// // // // // });

// // // // // // CREATE POLL
// // // // // app.post('/createPollProxy', async (req, res) => {
// // // // //     try {
// // // // //         const response = await axios.post(POLL_API, req.body, {
// // // // //             headers: {
// // // // //                 'Content-Type': 'application/json',
// // // // //                 'x-api-key': 'pollhub-secret-key-2024'
// // // // //             }
// // // // //         });

// // // // //         res.json(response.data);
// // // // //     } catch (err) {
// // // // //         console.error("Create poll error:", err.message);

// // // // //         res.status(500).json({
// // // // //             error: "Failed to create poll",
// // // // //             details: err.message
// // // // //         });
// // // // //     }
// // // // // });

// // // // // // VOTE
// // // // // app.post('/voteProxy/:id', async (req, res) => {
// // // // //     try {
// // // // //         const response = await axios.post(
// // // // //             `${POLL_API}/${req.params.id}/vote`,
// // // // //             req.body,
// // // // //             { headers: { 'Content-Type': 'application/json' } }
// // // // //         );

// // // // //         res.json(response.data);
// // // // //     } catch (err) {
// // // // //         console.error("Vote error:", err.message);

// // // // //         res.status(500).json({
// // // // //             error: "Failed to vote",
// // // // //             details: err.message
// // // // //         });
// // // // //     }
// // // // // });

// // // // // // RESULTS
// // // // // app.get('/resultsProxy/:id', async (req, res) => {
// // // // //     try {
// // // // //         const response = await axios.get(`${POLL_API}/${req.params.id}/results`);
// // // // //         res.json(response.data);
// // // // //     } catch (err) {
// // // // //         console.error("Results error:", err.message);

// // // // //         res.status(500).json({
// // // // //             error: "Failed to fetch results",
// // // // //             details: err.message
// // // // //         });
// // // // //     }
// // // // // });
// // // // const POLL_API = "https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls";

// // // // // GET POLLS
// // // // app.get('/pollsProxy', async (req, res) => {
// // // //     try {
// // // //         const response = await axios.get(POLL_API);
// // // //         res.json(response.data);
// // // //     } catch (err) {
// // // //         console.log("❌ Poll Fetch Error FULL:", err);

// // // //         res.status(500).json({
// // // //             error: "Poll fetch failed",
// // // //             message: err.message
// // // //         });
// // // //     }
// // // // });

// // // // // CREATE POLL
// // // // app.post('/createPollProxy', async (req, res) => {
// // // //     try {
// // // //         const response = await axios.post(POLL_API, req.body, {
// // // //             headers: {
// // // //                 'Content-Type': 'application/json',
// // // //                 'x-api-key': 'pollhub-secret-key-2024'
// // // //             }
// // // //         });

// // // //         res.json(response.data);
// // // //     } catch (err) {
// // // //         console.log("❌ Create Poll Error FULL:", err);

// // // //         res.status(500).json({
// // // //             error: "Create poll failed",
// // // //             message: err.message
// // // //         });
// // // //     }
// // // // });

// // // // // VOTE
// // // // app.post('/voteProxy/:id', async (req, res) => {
// // // //     try {
// // // //         const response = await axios.post(
// // // //             `${POLL_API}/${req.params.id}/vote`,
// // // //             req.body
// // // //         );

// // // //         res.json(response.data);
// // // //     } catch (err) {
// // // //         console.log("❌ Vote Error FULL:", err);

// // // //         res.status(500).json({
// // // //             error: "Vote failed",
// // // //             message: err.message
// // // //         });
// // // //     }
// // // // });

// // // // // RESULTS
// // // // app.get('/resultsProxy/:id', async (req, res) => {
// // // //     try {
// // // //         const response = await axios.get(`${POLL_API}/${req.params.id}/results`);
// // // //         res.json(response.data);
// // // //     } catch (err) {
// // // //         console.log("❌ Results Error FULL:", err);

// // // //         res.status(500).json({
// // // //             error: "Results failed",
// // // //             message: err.message
// // // //         });
// // // //     }
// // // // });
// // // const express = require('express');
// // // const app = express();
// // // const bodyParser = require('body-parser');
// // // const zxcvbn = require('zxcvbn');
// // // const cors = require('cors');
// // // const axios = require('axios');
// // // const crypto = require('crypto');
// // // const fs = require('fs');
// // // const path = require('path');

// // // app.use(cors());
// // // app.use(bodyParser.json());

// // // const port = process.env.PORT || 3000;

// // // // Serve frontend
// // // app.use(express.static(__dirname));

// // // app.get('/', (req, res) => {
// // //     res.sendFile(path.join(__dirname, 'index.html'));
// // // });

// // // const filePath = path.join(__dirname, 'data.json');

// // // // ================= PASSWORD CHECK =================
// // // app.post('/checkPasswordStrength', async (req, res) => {
// // //     const { password } = req.body;

// // //     const result = zxcvbn(password);

// // //     const sha1 = crypto.createHash('sha1')
// // //         .update(password)
// // //         .digest('hex')
// // //         .toUpperCase();

// // //     const prefix = sha1.substring(0, 5);
// // //     const suffix = sha1.substring(5);

// // //     let breached = false;

// // //     try {
// // //         const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
// // //         const lines = response.data.split('\n');

// // //         for (let line of lines) {
// // //             const [hashSuffix] = line.split(':');
// // //             if (hashSuffix === suffix) {
// // //                 breached = true;
// // //                 break;
// // //             }
// // //         }
// // //     } catch {}

// // //     res.json({
// // //         strength_score: result.score,
// // //         advice: result.score <= 2 ? "Weak password" : "Strong password",
// // //         breached
// // //     });
// // // });

// // // // ================= GENERATE PASSWORD =================
// // // app.post('/generateStrongPassword', (req, res) => {
// // //     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
// // //     let password = '';

// // //     for (let i = 0; i < 12; i++) {
// // //         password += chars[Math.floor(Math.random() * chars.length)];
// // //     }

// // //     res.json({ generated_password: password });
// // // });

// // // // ================= SAVE PASSWORD =================
// // // app.post('/savePassword', (req, res) => {
// // //     const { website, password } = req.body;

// // //     let data = [];
// // //     try {
// // //         data = JSON.parse(fs.readFileSync(filePath));
// // //     } catch {}

// // //     data.push({ website, password, time: new Date() });

// // //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// // //     res.json({ message: "Saved" });
// // // });

// // // // ================= GET PASSWORDS =================
// // // app.get('/getPasswords', (req, res) => {
// // //     try {
// // //         const data = JSON.parse(fs.readFileSync(filePath));
// // //         res.json(data);
// // //     } catch {
// // //         res.json([]);
// // //     }
// // // });

// // // // ================= POLL PROXY =================

// // // const POLL_API = "https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls";

// // // app.get('/pollsProxy', async (req, res) => {
// // //     try {
// // //         const response = await axios.get(POLL_API);
// // //         res.json(response.data);
// // //     } catch (err) {
// // //         console.error(err.message);
// // //         res.status(500).json({ error: "Poll fetch failed" });
// // //     }
// // // });

// // // app.post('/createPollProxy', async (req, res) => {
// // //     try {
// // //         const response = await axios.post(POLL_API, req.body, {
// // //             headers: {
// // //                 'Content-Type': 'application/json',
// // //                 'x-api-key': 'pollhub-secret-key-2024'
// // //             }
// // //         });
// // //         res.json(response.data);
// // //     } catch (err) {
// // //         console.error(err.message);
// // //         res.status(500).json({ error: "Create poll failed" });
// // //     }
// // // });

// // // app.post('/voteProxy/:id', async (req, res) => {
// // //     try {
// // //         const response = await axios.post(
// // //             `${POLL_API}/${req.params.id}/vote`,
// // //             req.body
// // //         );
// // //         res.json(response.data);
// // //     } catch (err) {
// // //         console.error(err.message);
// // //         res.status(500).json({ error: "Vote failed" });
// // //     }
// // // });

// // // app.get('/resultsProxy/:id', async (req, res) => {
// // //     try {
// // //         const response = await axios.get(`${POLL_API}/${req.params.id}/results`);
// // //         res.json(response.data);
// // //     } catch (err) {
// // //         console.error(err.message);
// // //         res.status(500).json({ error: "Results failed" });
// // //     }
// // // });

// // // app.listen(port, () => {
// // //     console.log(`🚀 Server running on port ${port}`);
// // // });
// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');
// // const zxcvbn = require('zxcvbn');
// // const cors = require('cors');
// // const axios = require('axios');
// // const crypto = require('crypto');
// // const fs = require('fs');
// // const path = require('path');

// // app.use(cors());
// // app.use(bodyParser.json());

// // const port = process.env.PORT || 3000;

// // // Serve frontend
// // app.use(express.static(__dirname));

// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // const filePath = path.join(__dirname, 'data.json');


// // // ================= PASSWORD CHECK =================
// // app.post('/checkPasswordStrength', async (req, res) => {
// //     const { password } = req.body;

// //     const result = zxcvbn(password);

// //     const sha1 = crypto.createHash('sha1')
// //         .update(password)
// //         .digest('hex')
// //         .toUpperCase();

// //     const prefix = sha1.substring(0, 5);
// //     const suffix = sha1.substring(5);

// //     let breached = false;

// //     try {
// //         const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
// //         const lines = response.data.split('\n');

// //         for (let line of lines) {
// //             const [hashSuffix] = line.split(':');
// //             if (hashSuffix === suffix) {
// //                 breached = true;
// //                 break;
// //             }
// //         }
// //     } catch (err) {
// //         console.log("Pwned API error:", err.message);
// //     }

// //     res.json({
// //         strength_score: result.score,
// //         advice: result.score <= 2 ? "Weak password" : "Strong password",
// //         breached
// //     });
// // });


// // // ================= GENERATE PASSWORD =================
// // app.post('/generateStrongPassword', (req, res) => {
// //     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
// //     let password = '';

// //     for (let i = 0; i < 12; i++) {
// //         password += chars[Math.floor(Math.random() * chars.length)];
// //     }

// //     res.json({ generated_password: password });
// // });


// // // ================= SAVE PASSWORD =================
// // app.post('/savePassword', (req, res) => {
// //     const { website, password } = req.body;

// //     let data = [];
// //     try {
// //         data = JSON.parse(fs.readFileSync(filePath));
// //     } catch {}

// //     data.push({ website, password, time: new Date() });

// //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// //     res.json({ message: "Saved" });
// // });


// // // ================= GET PASSWORDS =================
// // app.get('/getPasswords', (req, res) => {
// //     try {
// //         const data = JSON.parse(fs.readFileSync(filePath));
// //         res.json(data);
// //     } catch {
// //         res.json([]);
// //     }
// // });


// // // =====================================================
// // // 🔥 POLL PROXY (FINAL FIXED)
// // // =====================================================

// // const POLL_API = "https://c730261bf2bc4236bcd5fd5f1d1c84bc.vfs.cloud9.us-east-1.amazonaws.com/api/polls";

// // // GET POLLS
// // app.get('/pollsProxy', async (req, res) => {
// //     try {
// //         const response = await axios.get(POLL_API, { timeout: 5000 });

// //         if (!response.data) {
// //             return res.status(500).json({ error: "No data from poll API" });
// //         }

// //         res.json(response.data);

// //     } catch (err) {
// //         console.error("❌ FULL POLL ERROR:", err.response?.data || err.message);

// //         res.status(500).json({
// //             error: "Poll fetch failed",
// //             details: err.response?.data || err.message
// //         });
// //     }
// // });


// // // CREATE POLL
// // app.post('/createPollProxy', async (req, res) => {
// //     try {
// //         const response = await axios.post(POLL_API, req.body, {
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'x-api-key': 'pollhub-secret-key-2024'
// //             },
// //             timeout: 5000
// //         });

// //         res.json(response.data);

// //     } catch (err) {
// //         console.error("❌ CREATE ERROR:", err.response?.data || err.message);

// //         res.status(500).json({
// //             error: "Create poll failed",
// //             details: err.response?.data || err.message
// //         });
// //     }
// // });


// // // VOTE
// // app.post('/voteProxy/:id', async (req, res) => {
// //     try {
// //         const response = await axios.post(
// //             `${POLL_API}/${req.params.id}/vote`,
// //             req.body,
// //             { timeout: 5000 }
// //         );

// //         res.json(response.data);

// //     } catch (err) {
// //         console.error("❌ VOTE ERROR:", err.response?.data || err.message);

// //         res.status(500).json({
// //             error: "Vote failed",
// //             details: err.response?.data || err.message
// //         });
// //     }
// // });


// // // RESULTS
// // app.get('/resultsProxy/:id', async (req, res) => {
// //     try {
// //         const response = await axios.get(
// //             `${POLL_API}/${req.params.id}/results`,
// //             { timeout: 5000 }
// //         );

// //         res.json(response.data);

// //     } catch (err) {
// //         console.error("❌ RESULTS ERROR:", err.response?.data || err.message);

// //         res.status(500).json({
// //             error: "Results failed",
// //             details: err.response?.data || err.message
// //         });
// //     }
// // });


// // // ================= START =================
// // app.listen(port, () => {
// //     console.log(`🚀 Server running on port ${port}`);
// // });
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const zxcvbn = require('zxcvbn');
// const cors = require('cors');
// const axios = require('axios');
// const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');

// app.use(cors());
// app.use(bodyParser.json());

// const port = process.env.PORT || 3000;

// // ✅ Serve frontend
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// const filePath = path.join(__dirname, 'data.json');


// // ================= PASSWORD CHECK =================
// app.post('/checkPasswordStrength', async (req, res) => {
//     const { password } = req.body;

//     const result = zxcvbn(password);

//     const sha1 = crypto.createHash('sha1')
//         .update(password)
//         .digest('hex')
//         .toUpperCase();

//     const prefix = sha1.substring(0, 5);
//     const suffix = sha1.substring(5);

//     let breached = false;

//     try {
//         const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
//         const lines = response.data.split('\n');

//         for (let line of lines) {
//             const [hashSuffix] = line.split(':');
//             if (hashSuffix === suffix) {
//                 breached = true;
//                 break;
//             }
//         }
//     } catch (err) {
//         console.log("Pwned API error:", err.message);
//     }

//     res.json({
//         strength_score: result.score,
//         advice: result.score <= 2 ? "Weak password" : "Strong password",
//         breached
//     });
// });


// // ================= GENERATE PASSWORD =================
// app.post('/generateStrongPassword', (req, res) => {
//     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
//     let password = '';

//     for (let i = 0; i < 12; i++) {
//         password += chars[Math.floor(Math.random() * chars.length)];
//     }

//     res.json({ generated_password: password });
// });


// // ================= SAVE PASSWORD =================
// app.post('/savePassword', (req, res) => {
//     const { website, password } = req.body;

//     let data = [];
//     try {
//         data = JSON.parse(fs.readFileSync(filePath));
//     } catch {}

//     data.push({ website, password, time: new Date() });

//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//     res.json({ message: "Saved" });
// });


// // ================= GET PASSWORDS =================
// app.get('/getPasswords', (req, res) => {
//     try {
//         const data = JSON.parse(fs.readFileSync(filePath));
//         res.json(data);
//     } catch {
//         res.json([]);
//     }
// });


// // =====================================================
// // 🔥 POLL PROXY (FINAL FIXED - ELASTIC BEANSTALK)
// // =====================================================

// // 👉 TRY HTTPS FIRST (recommended)
// const POLL_API = "https://pollhub-env.eba-vpmemf8h.us-east-1.elasticbeanstalk.com/api/polls";

// // GET POLLS
// app.get('/pollsProxy', async (req, res) => {
//     try {
//         const response = await axios.get(POLL_API, {
//             headers: { "Accept": "application/json" },
//             timeout: 8000
//         });

//         return res.json(response.data);

//     } catch (err) {
//         console.error("❌ FULL ERROR:", err.response?.data || err.message);

//         return res.status(500).json({
//             error: "Poll fetch failed",
//             details: err.response?.data || err.message
//         });
//     }
// });


// // CREATE POLL
// app.post('/createPollProxy', async (req, res) => {
//     try {
//         const response = await axios.post(POLL_API, req.body, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-api-key": "pollhub-secret-key-2024"
//             },
//             timeout: 8000
//         });

//         return res.json(response.data);

//     } catch (err) {
//         console.error("❌ CREATE ERROR:", err.response?.data || err.message);

//         return res.status(500).json({
//             error: "Create poll failed",
//             details: err.response?.data || err.message
//         });
//     }
// });


// // VOTE
// app.post('/voteProxy/:id', async (req, res) => {
//     try {
//         const response = await axios.post(
//             `${POLL_API}/${req.params.id}/vote`,
//             req.body,
//             { timeout: 5000 }
//         );

//         res.json(response.data);

//     } catch (err) {
//         console.error("❌ VOTE ERROR:", err.response?.data || err.message);

//         res.status(500).json({
//             error: "Vote failed",
//             details: err.response?.data || err.message
//         });
//     }
// });


// // RESULTS
// app.get('/resultsProxy/:id', async (req, res) => {
//     try {
//         const response = await axios.get(
//             `${POLL_API}/${req.params.id}/results`,
//             { timeout: 5000 }
//         );

//         res.json(response.data);

//     } catch (err) {
//         console.error("❌ RESULTS ERROR:", err.response?.data || err.message);

//         res.status(500).json({
//             error: "Results failed",
//             details: err.response?.data || err.message
//         });
//     }
// });


// // ================= START SERVER =================
// app.listen(port, () => {
//     console.log(`🚀 Server running on port ${port}`);
// });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const zxcvbn = require('zxcvbn');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const filePath = path.join(__dirname, 'data.json');


// ================= PASSWORD =================

app.post('/checkPasswordStrength', async (req, res) => {
    const { password } = req.body;

    const result = zxcvbn(password);

    const sha1 = crypto.createHash('sha1')
        .update(password)
        .digest('hex')
        .toUpperCase();

    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5);

    let breached = false;

    try {
        const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
        const lines = response.data.split('\n');

        for (let line of lines) {
            const [hashSuffix] = line.split(':');
            if (hashSuffix === suffix) {
                breached = true;
                break;
            }
        }
    } catch {}

    res.json({
        strength_score: result.score,
        advice: result.score <= 2 ? "Weak password" : "Strong password",
        breached
    });
});

app.post('/generateStrongPassword', (req, res) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    res.json({ generated_password: password });
});

app.post('/savePassword', (req, res) => {
    const { website, password } = req.body;

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch {}

    data.push({ website, password, time: new Date() });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: "Saved" });
});

app.get('/getPasswords', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        res.json(data);
    } catch {
        res.json([]);
    }
});


// ================= POLL PROXY (FINAL FIX) =================

const POLL_API = "http://pollhub-env.eba-vpmemf8h.us-east-1.elasticbeanstalk.com/api/polls";

// GET POLLS
app.get('/pollsProxy', async (req, res) => {
    try {
        const response = await axios.get(POLL_API);
        res.json(response.data);
    } catch (err) {
        console.error("❌ Poll Fetch Error:", err.message);

        res.status(500).json({
            error: "Failed to fetch polls",
            details: err.message
        });
    }
});

// CREATE POLL
app.post('/createPollProxy', async (req, res) => {
    try {
        const response = await axios.post(POLL_API, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'pollhub-secret-key-2024'
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error("❌ Create Poll Error:", err.message);

        res.status(500).json({
            error: "Failed to create poll",
            details: err.message
        });
    }
});

// VOTE
app.post('/voteProxy/:id', async (req, res) => {
    try {
        const response = await axios.post(
            `${POLL_API}/${req.params.id}/vote`,
            req.body
        );

        res.json(response.data);
    } catch (err) {
        console.error("❌ Vote Error:", err.message);

        res.status(500).json({
            error: "Failed to vote",
            details: err.message
        });
    }
});

// RESULTS
app.get('/resultsProxy/:id', async (req, res) => {
    try {
        const response = await axios.get(`${POLL_API}/${req.params.id}/results`);
        res.json(response.data);
    } catch (err) {
        console.error("❌ Results Error:", err.message);

        res.status(500).json({
            error: "Failed to fetch results",
            details: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});