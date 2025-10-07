/**
 * Fetch BFP Country, Province, and Municipality to
 * render the boundary of a Municipality.
 * 
 * Fetch EST Users that are in the same Municipality with BFP User.
 */
let bfp_country = "Philippines";
let bfp_province = "Pampanga";
let bfp_municipality = "Bacolor";
let bfp_latitude = 14.997270;
let bfp_longitude = 120.651593;
const users = [
  { establishment_name: "Blessed David Dorm", owner_first_name: "Kobe", owner_last_name: "Tuazon", email: "kobepogi@gmail.com", phone_number: "09123456789", latitude: 14.997106, longitude: 120.651287 },
  { establishment_name: "Kobe's Dorm", owner_first_name: "Kobe", owner_last_name: "Tuazon", email: "kobepogi@gmail.com", phone_number: "09123456789", latitude: 14.996588, longitude: 120.652317 }
];

let routingControl = null;


let map = L.map("map").setView([0, 0], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

async function loadBoundaryAndUsers() {
  const query = `
    [out:json][timeout:25];
    area["boundary"="administrative"]["name"="${bfp_country}"]["admin_level"="2"]->.country;
    relation(area.country)["boundary"="administrative"]["name"="${bfp_province}"]->.state;
    .state map_to_area->.city;
    relation(area.city)["boundary"="administrative"]["name"="${bfp_municipality}"];
    out body;
    >;
    out skel qt;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query
  });
  const data = await res.json();
  const geojson = osmtogeojson(data); // Convert OSM JSON to GeoJSON

  // Add Bacolor polygon only (filter out any Point features)
  const bacolorLayer = L.geoJSON(geojson, {
    filter: function(feature, layer) {
      return feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon";
    },
    style: { color: "blue", weight: 2, fillOpacity: 0.2 },
    interactive: false
  }).addTo(map);

  // Fit map to boundary and restrict panning to bounding box
  map.fitBounds(bacolorLayer.getBounds());
  map.setMaxBounds(bacolorLayer.getBounds());
  map.setMinZoom(map.getZoom());

  // Example: Add user markers inside Bacolor
  users.forEach(u => {
    L.marker([u.latitude, u.longitude]).addTo(map)
      .bindPopup(getPopupHTML(u));
  });
}

loadBoundaryAndUsers();

let bfp_location = L.circle([bfp_latitude, bfp_longitude], {
  color: 'blue',
  fillColor: '#ffffff00',
  fillOpacity: 0.5,
  radius: 10
}).addTo(map);

bfp_location.bindPopup("<h2>You are here!</h2>").openPopup();
bfp_location.addEventListener("click", () => {
  bfp_location.bindPopup("<h2>You are here!</h2>");
});

// Generate popup HTML
function getPopupHTML(user){
  return `<p style="font-size: 1.5rem;">
          <span style="font-size: 2rem; font-weight: 700;">${user.establishment_name}</span><br>
          Owner: ${user.owner_first_name} ${user.owner_last_name}<br>
          Email: ${user.email}<br>
          Phone Number: ${user.phone_number}<br>
          <button onclick="getDirections(${user.latitude}, ${user.longitude})">Get Directions</button>`;
}

function getDirections(lat, lng) {
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }

  createRoutingControl(L.latLng(bfp_latitude, bfp_longitude), L.latLng(lat, lng));
}

function createRoutingControl(startLatLng, endLatLng){
  routingControl = L.Routing.control({
    waypoints: [startLatLng, endLatLng],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    routeWhileDragging: false
  }).addTo(map);

  const controlContainer = routingControl.getContainer();
  const closeBtn = L.DomUtil.create('button', 'close-btn', controlContainer);
  closeBtn.innerText = "Close";
  closeBtn.onclick = closeRouting;
}

function closeRouting(){
  if(routingControl){
    map.removeControl(routingControl);
    routingControl = null;
  }
}

document.addEventListener('keydown', function(e){
  if(e.key === "Escape") {
    closeRouting();
  }
});
