
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


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const filePath = path.join(__dirname, 'data.json');




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