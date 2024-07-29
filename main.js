function validateForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');
    let successMessage = document.getElementById('successMessage');

    let valid = true;

    nameError.innerHTML = '';
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    
    console.log(name)
    if (name === '') {
        nameError.innerHTML = 'Name is required';
        valid = false;
    }

    if (email === '') {
        emailError.innerHTML = 'Email is required';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.innerHTML = 'Invalid email address';
        valid = false;
    }

    if (password === '') {
        passwordError.innerHTML = 'Password is required';
        valid = false;
    } else if (password.length < 6) {
        passwordError.innerHTML = 'Password must be at least 6 characters';
        valid = false;
    }

    if (valid) {
        successMessage.style.display = 'block';
        setTimeout(function () {
            successMessage.style.display = 'none';
            document.getElementById('registrationForm').reset();
        }, 2000);
    }

    return false;
}