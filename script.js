// Initialize the map
var map = L.map('map').setView([40.0573, -76.288], 16);

// Initialize an empty GeoJSON layer
var geojsonLayer;

// Function to initialize the map and GeoJSON layer
function initializeMap() {
    // Add OpenStreetMap as the base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create an empty GeoJSON layer
    geojsonLayer = L.geoJSON(null, {
        style: {
            color: 'blue',
            fillColor: 'lightblue',
            weight: 2
        },
        onEachFeature: function (feature, layer) {
            // Bind a popup with information to each polygon
            layer.bindPopup(
                "Parcel: " + feature.properties.account + "<br>" +
                "Address: " + feature.properties.address + "<br>" +
                "Fuel: " + feature.properties.fuel_type + "<br>" +
                "Year Built: " + feature.properties.year_built + "<br>" +
                "Carbon Dioxide per Year: " + feature.properties.CO2perYear
            );

            // Add click event to each polygon
            layer.on('click', function (event) {
                // Open the popup on click
                event.target.openPopup();
            });
        }
    }).addTo(map);

    // Load GeoJSON data and add features to the map
    fetch('data.geojson')
        .then(response => response.json())
        .then(data => {
            // Add GeoJSON features to the layer
            geojsonLayer.addData(data);
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
        });
}

// Call the function to initialize the map and GeoJSON layer
initializeMap();

// Function to filter the map based on the selected fuel types and year range
function filterMap() {
    // Get the checkbox values
    var gasFilter = document.getElementById('gasFilter').checked;
    var oilFilter = document.getElementById('oilFilter').checked;
    var electricFilter = document.getElementById('electricFilter').checked;

    // Get the min and max year values
    var minYearInput = document.getElementById('minYear');
    var maxYearInput = document.getElementById('maxYear');

    // Parse the input values or set defaults
    var minYear = minYearInput.value.trim() === '' ? 1700 : parseInt(minYearInput.value);
    var maxYear = maxYearInput.value.trim() === '' ? new Date().getFullYear() : parseInt(maxYearInput.value);

    // Filter the GeoJSON features based on the selected fuel types and year range
    geojsonLayer.eachLayer(function (layer) {
        var featureFuelType = layer.feature.properties.fuel_type;
        var featureYearBuilt = layer.feature.properties.year_built;

        var shouldShow =
            ((gasFilter && featureFuelType === 'Gas') ||
            (oilFilter && featureFuelType === 'Oil') ||
            (electricFilter && featureFuelType === 'Electric') &&
            (minYear <= featureYearBuilt && featureYearBuilt <= maxYear));

        if (shouldShow) {
            layer.setStyle({
                color: 'blue',
                fillColor: 'lightblue',
                weight: 2
            });
        } else {
            layer.setStyle({
                color: 'lightgrey',
                fillColor: 'lightgrey',
                weight: 1
            });
        }
    });

    // Display the selected filters and year range in the sidebar
    var filteredPropertiesDiv = document.getElementById('filteredProperties');
    filteredPropertiesDiv.innerHTML = 'Selected Filters: ' +
        (gasFilter ? 'Gas, ' : '') +
        (oilFilter ? 'Oil, ' : '') +
        (electricFilter ? 'Electric, ' : '') +
        '<br>Year Range: ' (minYear === 1700? '' : minYear) + ' - ' + maxYear;
}
