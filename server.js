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

    res.json({
        strength_score: result.score,
        advice: result.score <= 2 ? "Weak password" : "Strong password",
        breached
    });
});

// GENERATE PASSWORD
app.post('/generateStrongPassword', (req, res) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    res.json({ generated_password: password });
});

// SAVE PASSWORD (FILE)
app.post('/savePassword', (req, res) => {
    const { website, password } = req.body;

    let data = [];

    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch {}

    data.push({
        website,
        password,
        time: new Date()
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: "Saved" });
});

// GET PASSWORDS
app.get('/getPasswords', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        res.json(data.filter(item => item.website));
    } catch {
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});