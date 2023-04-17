d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

function markerSize(mag) {
  return mag * 15000;
}

function createMap(earthquakes) {
    
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var baseMaps = {
    "Street map": streetmap
  }

  var overlayMaps = {
    "Earthquakes": earthquakes
  }

  var map = L.map("map", {
    center: [40.52, -120.67],
    zoom: 5,
    layers: [streetmap, earthquakes]
  })

  var legend = L.control({position: 'bottomright'});
    
  legend.onAdd = function () {
  let div = L.DomUtil.create('div', 'info legend');
  let ranges = [-20, 0, 20, 40, 60, 80, 100];


  for (var i = 0; i < ranges.length; i++) {
    div.innerHTML =
    '<b>Legend</b><br>Earthquake depth (in km)<br>' + 
    '<i style="background-color: #ccff33"></i>-20 - 0<br>' +
    '<i style="background-color: #ffff33"></i>0 - 20<br>' +
    '<i style="background-color: #ffcc33"></i>20 - 40<br>' +
    '<i style="background-color: #ff9933"></i>40 - 60<br>' +
    '<i style="background-color: #ff6633"></i>60 - 80<br>' +
    '<i style="background-color: #ff3333"></i>80 - 100<br>' +
    '<i style="background-color: #b80000"></i>100+<br>';
  }
    return div;
  };
  legend.addTo(map);
}

  
function createMarkers(response) {
    let earthquake = response.features;
    let earthquakeMarkers = [];
    let depth = [];

     for (let i = 0; i < earthquake.length; i++) {
         var eq = earthquake[i];
         depth.push(eq.geometry.coordinates[2])
         if (eq.geometry.coordinates[2] < 0) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ccff33",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         } else if (eq.geometry.coordinates[2] < 20) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ffff33",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         } else if (eq.geometry.coordinates[2] < 40) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ffcc33",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
         }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
         earthquakeMarkers.push(earthquakeMarker)
         } else if (eq.geometry.coordinates[2] < 60) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ff9933",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         } else if (eq.geometry.coordinates[2] < 80) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ff6633",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         } else if (eq.geometry.coordinates[2] < 100) {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#ff3333",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         } else {
          var earthquakeMarker = L.circle([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            color: "black",
            weight: 1,
            fillColor: "#b80000",
            fillOpacity: 0.75,
            radius: markerSize(eq.properties.mag)
          }).bindPopup(`<h3> Location: ${eq.properties.place}</h3> <hr> <h3> Depth: ${eq.geometry.coordinates[2]} </h3> <hr> <h3> Magnitude: ${eq.properties.mag} </h3>`)
          earthquakeMarkers.push(earthquakeMarker)
         }
         
     }

  
    const mapLayer = L.layerGroup(earthquakeMarkers);
    createMap(mapLayer)
}
