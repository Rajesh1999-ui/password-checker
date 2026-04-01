const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const zxcvbn = require('zxcvbn');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

// ✅ FILE PATH (IMPORTANT FIX)
const filePath = __dirname + '/data.json';

// 🔐 PASSWORD CHECK + PUBLIC API + SAVE DATA
app.post('/checkPasswordStrength', async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }

    const result = zxcvbn(password);

    let advice = 'Your password is strong.';
    if (result.score <= 2) {
        advice = 'Consider improving your password. Use more characters and avoid simple patterns.';
    }

    // 🔐 SHA1 hash
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
    } catch (err) {
        console.error("Public API error:", err.message);
    }

    // ✅ READ EXISTING DATA
    let data = [];

    try {
        const fileData = fs.readFileSync(filePath);
        data = JSON.parse(fileData);
    } catch (err) {
        data = [];
    }

    // ✅ ADD NEW ENTRY
    data.push({
        password,
        strength: result.score,
        breached,
        time: new Date()
    });

    // ✅ SAVE DATA
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log("✅ Data saved successfully");

    // ✅ RESPONSE
    res.json({
        strength_score: result.score,
        advice,
        breached
    });
});

// 🔑 PASSWORD GENERATOR
app.post('/generateStrongPassword', (req, res) => {
    const { length = 12, include_special_chars = true } = req.body;

    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (include_special_chars) {
        charset += '!@#$%^&*()_+[]{}|;:,.<>?';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    res.json({ generated_password: password });
});

// 📊 GET HISTORY
app.get('/history', (req, res) => {
    try {
        const fileData = fs.readFileSync(filePath);
        res.json(JSON.parse(fileData));
    } catch (err) {
        res.json([]);
    }
});

// 🚀 START SERVER
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});