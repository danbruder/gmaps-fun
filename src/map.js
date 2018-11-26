import loadGoogleMapsApi from 'load-google-maps-api';
import '@webcomponents/custom-elements';

const key = 'AIzaSyDyfTrLPc8DeeRpUY3QGaWTgKhtrJ2_Sxc';
var googleMaps = null;

customElements.define(
  'elm-map',
  class RenderedHtml extends HTMLElement {
    constructor() {
      super();
      this._map = null;
      this._loaded = false;
      this._zoom = 17;
      this._geocoder = null;
    }

    connectedCallback() {
      loadGoogleMapsApi({
        key: key,
      }).then(gm => {
        googleMaps = gm;
        // New Map
        this._map = new googleMaps.Map(this, {
          zoom: this._zoom,
          center: {lat: 42.870888, lng: -85.865234},
          gestureHandling: 'greedy',
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        });

        this._loaded = true;

        this._map.addListener('zoom_changed', () => {
          var value = this._map.getZoom();
          if (this._zoom === value) return;
          this._zoom = value;
          this.sendEvent('zoom_changed', value);
        });

        this._geocoder = new googleMaps.Geocoder();
        var mousedUp = false;
        googleMaps.event.addListener(this._map, 'mousedown', event => {
          mousedUp = false;
          setTimeout(() => {
            if (mousedUp === false) {
              this.geocodeLatLng(event.latLng);
            }
          }, 700);
        });
        googleMaps.event.addListener(this._map, 'mouseup', function(event) {
          mousedUp = true;
        });
        googleMaps.event.addListener(this._map, 'bounds_changed', function(
          event,
        ) {
          mousedUp = true;
        });
        googleMaps.event.addListener(this._map, 'drag', function(event) {
          mousedUp = true;
        });
        googleMaps.event.addListener(this._map, 'dragstart', function(event) {
          mousedUp = true;
        });
        googleMaps.event.addListener(this._map, 'dragend', function(event) {
          mousedUp = true;
        });
      });
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
    }

    geocodeLatLng(latlng) {
      var marker = new googleMaps.Marker({
        position: latlng,
        map: this._map,
        //icon:
        //'https://cdn4.iconfinder.com/data/icons/feather/24/circle-512.png',
      });

      var infowindow = new googleMaps.InfoWindow();
      this._geocoder.geocode({location: latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(this._map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    locateUserOnMap() {
      var infoWindow = new googleMaps.InfoWindow();

      const handleLocationError = (browserHasGeolocation, iw, pos) => {
        iw.setPosition(pos);
        iw.setContent(
          browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation.",
        );
        iw.open(this._map);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this._map.setZoom(16);
            this._map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, this._map.getCenter());
          },
        );
      } else {
        handleLocationError(false, infoWindow, this._map.getCenter());
      }
    }
  },
);
