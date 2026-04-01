const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const zxcvbn = require('zxcvbn');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ FIXED PORT (IMPORTANT FOR CLOUD)
const port = process.env.PORT || 3000;

// ✅ SERVE STATIC FILES (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ✅ ROOT ROUTE (FIXES "Cannot GET /")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ FILE PATH
const filePath = path.join(__dirname, 'data.json');

// 🔐 PASSWORD CHECK
app.post('/checkPasswordStrength', async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }

    const result = zxcvbn(password);

    let advice = 'Your password is strong.';
    if (result.score <= 2) {
        advice = 'Improve password: use more characters and avoid patterns.';
    }

    // SHA1 hash
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
        console.log("API error:", err.message);
    }

    // Read file
    let data = [];
    try {
        const fileData = fs.readFileSync(filePath);
        data = JSON.parse(fileData);
    } catch (err) {
        data = [];
    }

    // Save data
    data.push({
        password,
        strength: result.score,
        breached,
        time: new Date()
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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

// 📊 HISTORY
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
    console.log(`🚀 Server running on port ${port}`);
});