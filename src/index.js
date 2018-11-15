import './main.css';
import {Elm} from './Main.elm';
import registerServiceWorker from './registerServiceWorker';
import loadGoogleMapsApi from 'load-google-maps-api';

//Elm.Main.init({
//node: document.getElementById('root'),
//});

//registerServiceWorker();
loadGoogleMapsApi({
  key: process.env.ELM_APP_GMAPS_KEY,
})
  .then(initMap)
  .catch(function(error) {
    console.error(error);
  });

var map, infoWindow, googleMaps;
function initMap(gm) {
  googleMaps = gm;
  var map = new googleMaps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 40.731, lng: -73.997},
  });
  var geocoder = new googleMaps.Geocoder();
  var infowindow = new googleMaps.InfoWindow();

  var mousedUp = false;
  googleMaps.event.addListener(map, 'mousedown', function(event) {
    mousedUp = false;
    setTimeout(function() {
      if (mousedUp === false) {
        geocodeLatLng(event.latLng, geocoder, map, infowindow);
      }
    }, 300);
  });
  googleMaps.event.addListener(map, 'mouseup', function(event) {
    mousedUp = true;
  });
  googleMaps.event.addListener(map, 'drag', function(event) {
    mousedUp = true;
  });
}

function geocodeLatLng(latlng, geocoder, map, infowindow) {
  geocoder.geocode({location: latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        var marker = new googleMaps.Marker({
          position: latlng,
          map: map,
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
