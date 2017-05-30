import MenuFrontal from "./../Menu/Menu.vue";
import FluxFooter from "./../Footer/Footer.vue";
const VueGoogleMap = require('vue-google-maps');

VueGoogleMap.load({
    'key': 'AIzaSyCNZXAHTqxz4YaVA2sZKK6yf8jYbga-2FU'
});


export default {
  components: {
    MenuFrontal,
    FluxFooter,
    googleMap : VueGoogleMap.Map
  },

  data () {
    return {
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }, {
        position: {lat: 11.0, lng: 11.0}
      }]
    }
  }
}
