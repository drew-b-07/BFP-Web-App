const signin_container = document.getElementsByClassName("signin-container")[0];
const signin_form_container = document.getElementsByClassName("signin-form-container")[0];
const signup_form_container = document.getElementsByClassName("signup-form-container")[0];
const linear_container = document.getElementsByClassName("linear")[0];
const instruction = document.getElementById("instruction");

const input_username = document.getElementsByClassName("input-username")[0];
const input_password = document.getElementsByClassName("input-password")[0];
const signin_button = document.getElementById("signin_btn");

const fire_station_name = document.getElementById("fsn");
const country_input = document.getElementById("country");
const province_input = document.getElementById("province");
const municipality_input = document.getElementById("municipality");



instruction.addEventListener("click", (e) => {
  alert("Please fill out ALL inputs. Username/password will be used for device login. Email and phone are required for contact. Fire station name, country, province, and municipality will be automatically filled when you pin your location on the map.");
});



signin_button.addEventListener("click", (e) => {
  e.preventDefault();

  let username = input_username.value.trim();
  let password = input_password.value.trim();

  if(username === undefined || username === null || username === "") {
    alert("Input your username to login.");
    return;
  }

  if(password === undefined || password === null || password === "") {
    alert("Input your password to login.");
    return;
  }

  if(username.length < 8 || password.length < 8){
    alert("Username and Password must be at least 8 characters.");
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
  let has_acc = false; // From ESP32 data.json
  const DEFAULT_USERNAME = "kobepogi"; // From ESP32 data.json
  const DEFAULT_PW = "kobepogi"; // From ESP32 data.json
  if((username == DEFAULT_USERNAME && password == DEFAULT_PW) && !has_acc) {
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

    return;
  } 
  
  if((username == DEFAULT_USERNAME && password == DEFAULT_PW) && has_acc) {
    alert("You are already signed up to the system.\nSign in your account.");
    return;
  }

  // Add conditions to check if yung username and pw na ininput nasa db ba or wala.
  window.location.replace("../dashboard/overview/index.html");
});



let map = L.map('map', {
    center: [0, 0],
    zoom: 13,
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
});

let invalidateTimeout;
map.on('zoomend moveend', () => {
  clearTimeout(invalidateTimeout);
  invalidateTimeout = setTimeout(() => {
    map.invalidateSize(); // Re-rendering the map to make performance good even in small screen sizes.
  }, 100);
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

map.fitBounds([[-90, -180], [90, 180]]);

let marker = null;
map.addEventListener("click", (e) => {
  const api_key = "pk.8329f7efe1c3c979a63e9e427efbffcc";

  fetch(`https://us1.locationiq.com/v1/reverse?key=${api_key}&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
  .then(res => res.json())
  .then(data => {
    country_input.value = data.address.country;
    province_input.value = data.address.state;
    municipality_input.value = data.address.city || data.address.town || data.address.village;
    fire_station_name.value = municipality_input.value + " Fire Station";
    // console.log(`Country: ${country}, State: ${state}, City: ${city}`);
  })
  .catch(err => console.error(err));

  if(!marker) {
    marker = L.marker(e.latlng, {draggable: true}).addTo(map);
  } else {
    marker.setLatLng(e.latlng);
  }
});