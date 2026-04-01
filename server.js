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

// Fix homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const filePath = path.join(__dirname, 'data.json');

// Password check
app.post('/checkPasswordStrength', async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }

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

// Password generator
app.post('/generateStrongPassword', (req, res) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    res.json({ generated_password: password });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});