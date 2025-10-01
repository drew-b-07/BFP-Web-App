const wifi_button = document.getElementById("wifi_button");
const wifi_list_overlay = document.getElementsByClassName("wifi-list-overlay").item(0);
const wifi_list_close_button = document.getElementById("wifi_list_close_button");

wifi_button.addEventListener("click", () => {
  wifi_list_overlay.style.display = "flex";
  setTimeout(() => { wifi_list_overlay.style.opacity = "1"; }, 100);
});

wifi_list_overlay.addEventListener("click", () => {
  wifi_list_overlay.style.opacity = "0";
  setTimeout(() => { wifi_list_overlay.style.display = "none"; }, 100);
});

document.querySelector(".wifi-list-container").addEventListener("click", (e) => {
  e.stopPropagation();
});

wifi_list_close_button.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent bubbling to overlay
  wifi_list_overlay.style.opacity = "0";
  setTimeout(() => { wifi_list_overlay.style.display = "none"; }, 300);
});

const wifi_containers = document.querySelectorAll(".wifi-container:not(.wifi-connected)");

wifi_containers.forEach(container => {
  container.addEventListener("click", () => {
    const wifiName = container.querySelector("span").innerText;
    const password = prompt(`Enter password for "${wifiName}":`);
    
    if (password !== null) {
      // Do something with the password (send to ESP32, API, etc.)
      console.log(`Wi-Fi: ${wifiName}, Password: ${password}`);
    }
  });
});