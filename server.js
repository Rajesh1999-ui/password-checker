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

// PASSWORD CHECK
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

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch {}

    data.push({ password, strength: result.score, breached });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({
        strength_score: result.score,
        advice: result.score <= 2 ? "Weak password" : "Strong password",
        breached
    });
});

// PASSWORD GENERATOR
app.post('/generateStrongPassword', (req, res) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    res.json({ generated_password: password });
});


// ✅ EMAIL VALIDATION (PUBLIC API ADDED)
app.post('/checkEmail', async (req, res) => {
    const { email } = req.body;

    // 🔥 👉 PASTE YOUR API KEY HERE
    const API_KEY = "1234567890abcdef1234567890abcdef";

    try {
        const response = await axios.get(
            `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`
        );

        res.json(response.data);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Email API failed" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});