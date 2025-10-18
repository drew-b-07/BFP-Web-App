// Script

//HIDE PASSWORD FUNCTION
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

const togglePassword2 = document.getElementById("togglePassword2");
const showtypePassword = document.getElementById("showtypePassword");

// togglePassword.addEventListener("click", () => {
//   const isPassword = password.type === "password";
//   password.type = isPassword ? "text" : "password";
  
//   // Toggle icon
//   togglePassword.classList.toggle("fa-eye");
//   togglePassword.classList.toggle("fa-eye-slash");
// });

function toggleVisibility(toggleIcon, inputField) {
    const isPassword = inputField.type === "password";
    inputField.type = isPassword ? "text" : "password";

    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
}

togglePassword.addEventListener("click", () => toggleVisibility(togglePassword, password));
togglePassword2.addEventListener("click", () => toggleVisibility(togglePassword2, showtypePassword));

//CONDITIONAL BUTTON FUNCTION RESTART AND RESET
function btnRestart(){
    document.getElementById("buttonRestart").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function btnReset(){
    document.getElementById("buttonReset").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function enterPasswordFirst(){
    document.getElementById("typePassword").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("buttonReset").style.display ="none";
}

function closeModal(){
    document.getElementById("buttonRestart").style.display = "none";
    document.getElementById("buttonReset").style.display = "none";
    document.getElementById("typePassword").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}