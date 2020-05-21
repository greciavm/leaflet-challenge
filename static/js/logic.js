// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  });

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);

function chooseColor(mag) {
    switch (true) {
    case mag < 1:
      return "#98FB98";
    case mag < 2:
      return "#D4FD04";
    case mag < 3:
      return "#FFD700";
    case mag < 4:
      return "#FFA500";
    case mag < 5:
      return "#FF8C00";
    default:
      return "#FF4500";
    }
  }

// function createLegend(){
//     var legendInfo = [
//         {limit: "0-1",
//         color: "#98FB98"},
//         {limit: "1-2",
//         color: "D4FD04"},
//         {limit:"2-3",
//         color:"FFD700"},
//         {limit:"3-4",
//         color:"FFA500"},
//         {limit:"4-5",
//         color:"FF8C00"},
//         {limit:"5+",
//         color:"FF4500"}
//     ];

//     var legendparagraph = "" ;
   
//     for (i = 0; i < legendInfo.length; i++){
//         legendparagraph += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
//     }
    
//     return legendparagraph;
// }

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    console.log(earthquakeData)

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature) {

    L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        fillOpacity: 1,
        color: "black",
        weight: 0.5,
        fillColor: chooseColor(feature.properties.mag),
        radius: feature.properties.mag * 5
    }).bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place).addTo(myMap);
  }

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    //var limits = [1, 2, 3, 4, 5];
    var colors = ["#98FB98", "#D4FD04", "#FFD700", "#FFA500", "#FF8C00", "#FF4500"];
    var labels = [];

    // Add legend text
    var legendInfo =
        "<div class=\"labels\">" +
        "<div class=\"label1\">" + limits[0] + "</div>" +
        "<div class=\"label2\">" + limits[1] + "</div>" +
        "<div class=\"label3\">" + limits[2] + "</div>" +
        "<div class=\"label4\">" + limits[3] + "</div>" +
        "<div class=\"label5\">" + limits[4] + "</div>" +
        "<div class=\"label6\">" + limits[5] + "</div>" +
        "<div class=\"max\">" + limits[6] + "</div>" +
        "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
    };

    //document.querySelector(".legend").innerHTML=createLegend();

    legend.addTo(myMap);

    // limits.forEach((limit, index) => {
    //     legendInfo +=  '<i style="background-color:' + colors[index] + '"></i> '
    //     + limit + (limits[index + 1] ? '&ndash;' + limits[index + 1] + '<br>' : '+');
    //     });
    //     return div;
    // };
    // legend.addTo(myMap);

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

}

function createMap(earthquakes) {

sL.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });addTo(myMap);

}

