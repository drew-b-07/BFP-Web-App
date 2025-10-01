const logout_button = document.getElementById("logout_button");
const logout_button1 = document.getElementsByClassName("logout-button").item(0);

const logout = () => window.location.replace("../../login/index.html");

logout_button.addEventListener("click", logout);
logout_button1.addEventListener("click", logout);