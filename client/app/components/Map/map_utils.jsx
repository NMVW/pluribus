// a good place for helpers
import { map } from "./Map.jsx";

// This is our google storage object for our heatmap points
export let googleArray = new google.maps.MVCArray();

// pluribus color scheme
export let gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 188, 212, 1)',
  'rgba(18, 179, 201, 1)',
  'rgba(56, 163, 181, 1)',
  'rgba(75, 155, 171, 1)',
  'rgba(94, 146, 161, 1)',
  'rgba(113, 138, 151, 1)',
  'rgba(132, 130, 141, 1)',
  'rgba(151, 122, 131, 1)',
  'rgba(170, 113, 121, 1)',
  'rgba(189, 105, 111, 1)',
  'rgba(208, 97, 101, 1)',
  'rgba(227, 89, 91, 1)',
  'rgba(246, 81, 81, 1)',
];

// DEFAULT SETTINGS // -------------------
let mapOptions = {
  // Default to whole country
  center: {lat: 35.69, lng: -91.73},
  zoom: 4,
}

let heatMapOptions = {
  data: googleArray,
  dissipating: true,
  radius: 20,
  opacity: 10,
  gradient,
}


export function initMap() {
  // initialize map w/ options
  return new google.maps.Map(document.getElementById('map'), mapOptions);
}

export function initHeatMap() {
  // initialize heatmap w/ options
  return new google.maps.visualization.HeatmapLayer(heatMapOptions);
}

export function getPoints(props) {
  // Updates google storage object every time plurbs store object changes
  props.plurbs.forEach((plurb) => {
    let point = {location: new google.maps.LatLng(plurb.lat, plurb.long), weight: 1};
    googleArray.push(point);
  });
}

export function rePosition(plurb) {
  let pos = {
    lat: plurb.lat,
    lng: plurb.long
  };
  map.setCenter(pos);
}

export function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }, function() {
      handleLocationError(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}

function handleLocationError(browserHasGeolocation) {
  if(browserHasGeolocation) {
    console.log("Looks like the browser blocked geolocation");
    map.setCenter({lat: 38.91, lng: -77.04});
  } else {
    console.log("This browser does NOT support geolocation");
    map.setCenter({lat: 38.91, lng: -77.04});
  }
}

