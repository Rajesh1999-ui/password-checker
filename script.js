document.getElementById('password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    
   fetch('http://localhost:3000/checkPasswordStrength', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('strength-score').textContent = `Password Strength: ${data.strength_score}`;
        document.getElementById('recommendations').textContent = `Recommendations: ${data.advice}`;
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('generate-password').addEventListener('click', function () {
    const length = 12; // Default password length
    const includeSpecialChars = true;

    fetch('http://localhost:3000/generateStrongPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length: length, include_special_chars: includeSpecialChars })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('generated-password').value = data.generated_password;
    })
    .catch(error => console.error('Error:', error));
});