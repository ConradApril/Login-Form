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
    //  if (valid) {
      //    successMessage.style.display = "block";
      //    setTimeout(function () {
        //      successMessage.style.display = "none";
        //      document.getElementById("registrationForm").reset();
        //    }, 2000);
        //  }
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
