const input_username = document.getElementsByClassName("input-username")[0];
const input_password = document.getElementsByClassName("input-password")[0];
const signin_button = document.getElementsByClassName("input-submit")[0];

signin_button.addEventListener("click", (e) => {
  e.preventDefault();

  let username = input_username.value.trim();
  let password = input_password.value.trim();

  if(username.length < 5 || username === undefined || username === null || username === "") {
    alert("Input your username to login");
    return;
  }

  if(password.length < 8 || password === undefined || password === null || password === "") {
    alert("Input your password to login");
    return;
  }

  /**
   * Check and verify username and password
   * compare sa nakasave sa device and sa Firestore.
   */

  window.location.replace("../dashboard/overview/index.html");
});