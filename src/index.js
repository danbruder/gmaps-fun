import 'tachyons/css/tachyons.css';
import './main.css';
import {Elm} from './Main.elm';
import registerServiceWorker from './registerServiceWorker';
import './map.js';

var app = Elm.Main.init({
  node: document.getElementById('root'),
});

//app.ports.initMap.subscribe(function(data) {
//initMap()
//.then(r => console.log(r))
//.catch(r => console.log(r));
//});

//registerServiceWorker();
