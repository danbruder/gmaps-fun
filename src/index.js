import 'tachyons/css/tachyons.css';
import './main.css';
import {Elm} from './Main.elm';
import registerServiceWorker from './registerServiceWorker';
import './map.js';

var app = Elm.Main.init({
  node: document.getElementById('root'),
});

app.ports.locateUserOnMap.subscribe(function(data) {
  var el = document.getElementById('map');
  if (!el) {
    // THROW AN ERROR HERE
    return;
  }
  el.locateUserOnMap();
});

//registerServiceWorker();
