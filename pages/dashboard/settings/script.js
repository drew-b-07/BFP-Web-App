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
    document.getElementById("btnWifiListModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Close Modal for FIRE EMERGENCY ALERT MESSAGE
function closeModalFireEmergency(){
  document.getElementById("modal").style.display = "none";
  document.getElementById("emergency-alert-overlay").style.display = "none";
}

// --- Wi-Fi Modal Logic ---
const wifi_button = document.getElementById("wifi_button");
const wifi_list_overlay = document.getElementById("wifi_list_overlay");
const wifi_list_modal = document.getElementById("wifi_list_modal");
const wifi_list_close_button = document.getElementById("wifi_list_close_button");

// Open modal
wifi_button.addEventListener("click", () => {
  wifi_list_overlay.style.display = "flex";
  wifi_list_modal.style.display = "flex";
  setTimeout(() => { wifi_list_overlay.style.opacity = "1"; }, 100);
});

// Prevent inner clicks from closing modal
document.querySelector(".wifi-list-container").addEventListener("click", (e) => {
  e.stopPropagation();
});

// Close button
wifi_list_close_button.addEventListener("click", (e) => {
  e.stopPropagation();
  wifi_list_overlay.style.opacity = "0";
  setTimeout(() => { wifi_list_overlay.style.display = "none"; }, 300);
});

// Handle Wi-Fi selection
const wifi_items = document.querySelectorAll(".wifi-item:not(.wifi-connected)");

wifi_items.forEach(item => {
  item.addEventListener("click", () => {
    const wifiName = item.querySelector("h1").innerText;
    const password = prompt(`Enter password for "${wifiName}":`);

    if (password !== null) {
      console.log(`Wi-Fi: ${wifiName}, Password: ${password}`);
      // You can send this info to your backend or ESP32 here
    }
  });
});