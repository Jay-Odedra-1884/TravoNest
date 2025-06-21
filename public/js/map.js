// var map = L.map('map').setView([51.505, -0.09], 13);
// console.log("Inside map.js");


// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);


document.addEventListener("DOMContentLoaded", () => {
  // Get the map container
  const mapContainer = document.getElementById("map");
  
  if (mapContainer) {
    // Check if we have valid coordinates
    const lat = parseFloat(document.querySelector('script').textContent.match(/lat = "([^"]*)"/)?.[1] || '');
    const lon = parseFloat(document.querySelector('script').textContent.match(/lon = "([^"]*)"/)?.[1] || '');
    
    // Check if coordinates are valid numbers
    if (lat && lon && !isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
      try {
        // Try to initialize the map
        const map = L.map("map").setView([lat, lon], 14);
        
        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // Add a marker
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("📍 Location of this listing")
          .openPopup();
          
      } catch (error) {
        // If map initialization fails, show fallback
        showFallbackMessage(mapContainer);
      }
    } else {
      // If no valid coordinates, show fallback
      showFallbackMessage(mapContainer);
    }
  }
});

function showFallbackMessage(mapContainer) {
  // Get location information if available
  const locationElement = document.querySelector('.listing-location');
  const locationText = locationElement ? locationElement.textContent : 'Location information';
  
  // Replace the map with a beautiful fallback message
  mapContainer.innerHTML = `
    <div class="map-fallback">
      <div class="fallback-content">
        <div class="fallback-icon">
          <i class="fa-solid fa-map-location-dot"></i>
        </div>
        <h3 class="fallback-title">Location Services Temporarily Unavailable</h3>
        <p class="fallback-message">
          We're currently experiencing issues with our geocoding service in deployment. 
          We're working to restore location mapping functionality as soon as possible.
        </p>
        <div class="fallback-location-info">
          <div class="location-detail">
            <i class="fa-solid fa-location-dot"></i>
            <span>Location: <strong>${locationText}</strong></span>
          </div>
          <div class="location-detail">
            <i class="fa-solid fa-info-circle"></i>
            <span>Please contact the host for specific directions</span>
          </div>
        </div>
        <div class="fallback-status">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span>Service Status: Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
  