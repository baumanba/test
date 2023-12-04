//Initialize the map
var map = L.map('map').setView([0, 0], 2);

//Add OpenStreetMap as the base layer
L.tileLayer('https{s}.tile.openstreetmap.org{z}{x}{y}.png', {
    attribution '© OpenStreetMap contributors'
}).addTo(map);

//Load GeoJSON data and add it to the map
fetch('"C:\Users\farglenuts\Desktop\test git\data.json.txt"')
    .then(response = response.json())
    .then(data = {
        L.geoJSON(data).addTo(map);
    });
