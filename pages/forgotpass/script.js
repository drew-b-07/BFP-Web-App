const email = document.getElementById("email");
const forgotpass_btn = document.getElementById("forgotpass_btn");

forgotpass_btn.addEventListener("click", (e) => {
  e.preventDefault();

  let _email = email.value.trim();

  if(_email === "" || _email === null || _email === undefined) {
    alert("Do not leave the email blank.");
    return;
  }

  // Process of sending reset password.

  alert("E-mail has sent to " + _email + ".");
});