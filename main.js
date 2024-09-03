const rmCheck = document.getElementById("rememberMe");
let nameInput = document.getElementById("name");
let passInput = document.getElementById("password");
let emailInput = document.getElementById("email");
if (localStorage.checkbox && localStorage.checkbox !== "") {
  nameInput.value = localStorage.name;
  passInput.value = localStorage.passInput;
  emailInput.value = localStorage.email;
  console.log(localStorage.password);
  // Check data.json if data is correct, if yes submit form
  if ((nameInput.value = localStorage.name)) {
  }
} else {
  rmCheck.removeAttribute("checked");
  passInput.value = "";
  console.log("test");
}

async function validateForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let successMessage = document.getElementById("successMessage");

  var valid = true;

  nameError.innerHTML = "";
  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  if (name === "") {
    nameError.innerHTML = "Name is required";
    valid = false;
  }

  if (email === "") {
    emailError.innerHTML = "Email is required";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    emailError.innerHTML = "Invalid email address";
    valid = false;
  }
  if (password === "") {
    passwordError.innerHTML = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    passwordError.innerHTML = "Password must be at least 6 characters";
    valid = false;
  }

  if (valid) {
    await fetch("./data.json")
      .then((response) => response.json())
      .then((json) => {
        if (name !== json.username) {
          nameError.innerHTML = "Invalid username";
          valid = false;
        }
        if (email !== json.email) {
          emailError.innerHTML = "Invalid email";
          valid = false;
        }
        if (password !== json.password) {
          passwordError.innerHTML = "Invalid password";
          valid = false;
          document.getElementById("password").value = "";
        }
      });
    }
     if (valid) {
         successMessage.style.display = "block";
         setTimeout(function () {
             successMessage.style.display = "none";
             document.getElementById("registrationForm").reset();
           }, 2000);
         }
        if (valid) {
    RememberMe(name, email, password);
    window.location.href = "/";
  }
  return valid;
}
function RememberMe(name, email, password) {
  if (rmCheck.checked) {
    localStorage.name = name;
    localStorage.email = email;
    localStorage.passInput = password;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.name = "";
    localStorage.email = "";
    localStorage.passInput = "";
    localStorage.checkbox = "";
  }
  
}
function TogglePassword() {
  var x = document.getElementById("password");
  var icon = document.getElementsByClassName("eye");
  console.log(icon[0]);
  if (x.type === "password") {
    x.type = "text";
    icon[0].src = "eye.png";
  } else {
    x.type = "password";
    icon[0].src = "CLOSEDEYE.png";
  }
}

import { create } from 'simple-oauth2';

const oauth2 = create({
  client: {
    id: 'Ov23liDLvTfRwl271jGn',
    secret: '7ed7b0ec340a912f139e4338064c9e296e8c987a',
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
});
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'read:user', // The requested scope
});

// Redirect the user to the authorization URI
console.log('Authorize URL: ', authorizationUri);

const tokenParams = {
  code: 'test',
  redirect_uri: 'https://github.com/login/oauth/authorize',
};

(async () => {
  try {
    const result = await oauth2.authorizationCode.getToken(tokenParams);
    const accessToken = oauth2.accessToken.create(result);
    console.log('Access Token:', accessToken.token.access_token);
  } catch (error) {
    console.error('Access Token Error:', error.message);
  }
})();

(async () => {
  try {
    const userInfo = await oauth2.accessToken.create({
      access_token: '',
    }).get('https://api.provider.com/userinfo');

    console.log('User Info:', userInfo);
  } catch (error) {
    console.error('User Info Error:', error.message);
  }
})();