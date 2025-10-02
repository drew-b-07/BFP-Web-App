const signin_container = document.getElementsByClassName("signin-container")[0];
const signin_form_container = document.getElementsByClassName("signin-form-container")[0];
const signup_form_container = document.getElementsByClassName("signup-form-container")[0];
const linear_container = document.getElementsByClassName("linear")[0];
const instruction = document.getElementById("instruction");

const input_username = document.getElementsByClassName("input-username")[0];
const input_password = document.getElementsByClassName("input-password")[0];
const signin_button = document.getElementById("signin_btn");

instruction.addEventListener("click", (e) => {
  alert("Please fill out ALL inputs. Username/password will be used for device login. Email and phone are required for contact. Fire station name, country, province, and municipality will be automatically filled when you pin your location on the embedded map.");
});



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
   * compare sa nakasave sa device and sa Supabase.
   * 
   * I-check if nakasave na ba credential ng bfp and yung device nila
   * para di na pumunta sa parang signup.
   * 
   * Check if may internet ba bago magproceed.
   * I-cancel ang activities ni user pag walang internet.
   */

  // Change e2 ng default username and password.
  let has_acc = false;
  if((username == "kobepogi" && password == "kobepogi") && !has_acc) {
    linear_container.classList.toggle("linear-cover-left");
    linear_container.style.borderTopRightRadius = "0";
    linear_container.style.borderBottomRightRadius = "0";
    linear_container.style.borderTopLeftRadius = "0";
    linear_container.style.borderBottomLeftRadius = "0";
    setTimeout(() => {
      signin_form_container.classList.toggle("hide-signin");
    }, 50);
    setTimeout(() => {
      signin_container.style.flexDirection = "row-reverse";
    }, 400);
    setTimeout(() => {
      linear_container.classList.toggle("linear-cover-left");
      setTimeout(() => {
        signup_form_container.classList.toggle("show-signup");
        linear_container.style.borderTopRightRadius = "8px";
        linear_container.style.borderBottomRightRadius = "8px";
      }, 100);
    }, 700);
  } else {
    alert("You are already signed up to the system.\nSign in your account.");
  }

  // window.location.replace("../dashboard/overview/index.html");
});



var map = L.map('map', {
    center: [0, 0],
    zoom: 13,
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

map.fitBounds([[-90, -180], [90, 180]]);

document.getElementById("map").addEventListener("click", function () {
    map.invalidateSize();
});