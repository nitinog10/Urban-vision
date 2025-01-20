// Initialize Google Maps for the Traffic Dashboard
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 28.6139, lng: 77.2090 }, // New Delhi
    });

    // Mock traffic data
    const trafficPoints = [
        { lat: 28.6139, lng: 77.2090, level: 3 }, // Moderate
        { lat: 28.7041, lng: 77.1025, level: 5 }, // Heavy
    ];

    // Add markers with traffic conditions
    trafficPoints.forEach((point) => {
        const color = point.level > 3 ? "red" : "green"; // Red for heavy, green for moderate
        new google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: color,
                fillOpacity: 0.6,
                strokeWeight: 0,
            },
        });
    });

    // Urban Planner Toolkit Feature: Highlight potential development areas
    const developmentAreas = [
        { lat: 28.6200, lng: 77.2100, name: "Area 1" },
        { lat: 28.7000, lng: 77.1500, name: "Area 2" },
    ];

    developmentAreas.forEach((area) => {
        new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            map,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 8,
                fillColor: "blue",
                fillOpacity: 0.8,
                strokeWeight: 0,
            },
            title: `Potential Development: ${area.name}`,
        });
    });
}

// Pollution Heatmap using Leaflet.js
function loadPollutionHeatmap() {
    const map = L.map("pollutionMap").setView([28.6139, 77.2090], 12);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    // Mock pollution data
    const pollutionData = [
        [28.6139, 77.2090, 80], // [lat, lng, pollution index]
        [28.7041, 77.1025, 60],
        [28.6500, 77.1800, 90],
    ];

    // Heatmap visualization
    pollutionData.forEach(([lat, lng, value]) => {
        const color = value > 70 ? "red" : "orange"; // Red for high, orange for moderate
        L.circle([lat, lng], {
            color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: value * 10, // Radius proportional to pollution index
        }).addTo(map);
    });

    // Add pollution details in a popup
    pollutionData.forEach(([lat, lng, value]) => {
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`Pollution Index: ${value}`);
    });
}

// Load both maps and Urban Toolkit on window load
window.onload = () => {
    initMap();
    loadPollutionHeatmap();
};

  