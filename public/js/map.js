
// var map = L.map('map').setView([51.505, -0.09], 13);
// console.log("Inside map.js");


// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);


document.addEventListener("DOMContentLoaded", () => {
    // Set map center coordinates and zoom
    var map = L.map("map").setView([21.8089029, 69.4176413], 14); // Example: Delhi
  
    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    // Optional: Add a marker
    L.marker([21.8089029, 69.4176413])
      .addTo(map)
      .bindPopup("Hi How are you? it's my home :)")
      .openPopup();
  });
  