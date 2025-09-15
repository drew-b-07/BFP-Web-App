function openNav() {
  document.getElementById("side_nav_bg").style.width = "250px";
  document.getElementById("side_nav_bg").style.left = "0";
  document.body.style.overflow = "hidden"; // disable scroll
}

function closeNav() {
  document.getElementById("side_nav_bg").style.width = "0";
  document.getElementById("side_nav_bg").style.left = "-2rem";
  document.body.style.overflow = ""; // enable scroll again
}

window.addEventListener("resize", function() {
  if (window.innerWidth > 768) {
    closeNav();
  }
});