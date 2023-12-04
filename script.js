<script type="text/javascript">
  // Initialize the map
  var map = L.map('map').setView([40.04, -76.31], 10);

  // Add OpenStreetMap as the base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Load GeoJSON data and add features to the map
  fetch('tester.geojson') // Assuming your file is named tester.geojson
      .then(response = response.json())
      .then(data = {
          // Create a GeoJSON layer with all features
          var geoJsonLayer = L.geoJSON(data).addTo(map);
      })
      .catch(error = {
          console.error('Error loading GeoJSON:', error);
      });
</script>
