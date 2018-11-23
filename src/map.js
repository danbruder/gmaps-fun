import loadGoogleMapsApi from 'load-google-maps-api';
import '@webcomponents/custom-elements';

const key = 'AIzaSyDyfTrLPc8DeeRpUY3QGaWTgKhtrJ2_Sxc';

customElements.define(
  'elm-map',
  class RenderedHtml extends HTMLElement {
    constructor() {
      super();
      this._map = null;
      this._loaded = false;
      this._zoom = 3;
    }

    connectedCallback() {
      loadGoogleMapsApi({
        key: key,
      }).then(googleMaps => {
        this._map = new googleMaps.Map(this, {
          zoom: this._zoom,
          center: {lat: 42.870888, lng: -85.865234},
          gestureHandling: 'greedy',
        });

        //googleMaps.event.addListener(this._map, 'mousedown', function(event) {});
        this._loaded = true;
        this._map.addListener('zoom_changed', () => {
          var value = this._map.getZoom();
          if (this._zoom === value) return;
          this._zoom = value;
          this.sendEvent('zoom_changed', value);
        });
      });
    }

    get zoom() {
      return this._zoom;
    }

    set zoom(value) {
      if (this._zoom === value) return;
      this._zoom = value;
      if (!this._map) return;
      this._map.setZoom(this._zoom);
    }

    disconnectedCallback() {
      // Do something?
    }

    /**
     * Dispatch an event.
     */
    sendEvent(name, detail) {
      this.dispatchEvent(new CustomEvent(name, {detail}));
      console.log('[map]', name, detail);
    }
  },
);

//var map, googleMaps;
//export function initMap() {
//return loadGoogleMapsApi({
//key: process.env.ELM_APP_GMAPS_KEY,
//})
//.then(function(gm) {
//googleMaps = gm;
//var map = new googleMaps.Map(document.getElementById('map'), {
//zoom: 18,
//center: {lat: 40.731, lng: -73.997},
//});
//return true;
//})
//.catch(function(error) {
//return false;
//});
//}

//function _initMap(gm) {
////var geocoder = new googleMaps.Geocoder();
////var infowindow = new googleMaps.InfoWindow();
////var mousedUp = false;
////googleMaps.event.addListener(map, 'mousedown', function(event) {
////mousedUp = false;
////setTimeout(function() {
////if (mousedUp === false) {
////geocodeLatLng(event.latLng, geocoder, map, infowindow);
////}
////}, 500);
////});
////googleMaps.event.addListener(map, 'mouseup', function(event) {
////mousedUp = true;
////});
////googleMaps.event.addListener(map, 'drag', function(event) {
////mousedUp = true;
////});
//}

////function geocodeLatLng(latlng, geocoder, map, infowindow) {
////var marker = new googleMaps.Marker({
////position: latlng,
////map: map,
////});

////geocoder.geocode({location: latlng}, function(results, status) {
////if (status === 'OK') {
////if (results[0]) {
////infowindow.setContent(results[0].formatted_address);
////infowindow.open(map, marker);
////} else {
////window.alert('No results found');
////}
////} else {
////window.alert('Geocoder failed due to: ' + status);
////}
////});
////}
