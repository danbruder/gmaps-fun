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
          }, 800);
        });
        googleMaps.event.addListener(this._map, 'mouseup', function(event) {
          mousedUp = true;
        });
        googleMaps.event.addListener(this._map, 'drag', function(event) {
          mousedUp = true;
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

    geocodeLatLng(latlng) {
      var marker = new googleMaps.Marker({
        position: latlng,
        map: this._map,
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

    // Try HTML5 geolocation.
    locateUserOnMap() {
      console.log('locating...');
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
        console.log('looking for position...');
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('found position!');
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(this._map);

            this._map.setZoom(19);
            this._map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, this._map.getCenter());
          },
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, this._map.getCenter());
      }
    }
  },
);
