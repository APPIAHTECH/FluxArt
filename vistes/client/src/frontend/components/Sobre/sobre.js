import MenuFrontal from "./../Menu/Menu.vue";
import FluxFooter from "./../Footer/Footer.vue";

export default {
  components: {
    MenuFrontal,
    FluxFooter
  },

  methods:{
    initMap(){

      let uluru = {lat: 41.9240805, lng: 2.2563659};
      let qMap = this.$el.querySelector('.mapa');
      let map = new google.maps.Map(qMap, {
        zoom: 15,
        center: uluru
      });

      let marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
     }
  },

  mounted(){
    this.initMap();
  }
}
