import FluxVisualitzar from './../Visualitzacio/Visualitzacio.vue';
import FluxMenu from './../Menu/Menu.vue';
import FluxFooter from './../Footer/Footer.vue';

export default {
  components: {
    FluxMenu,
    FluxVisualitzar,
    FluxFooter
  },

  data()
  {
    return{
      host : "http://" + window.location.hostname + ":"+window.location.port+"/",
      url:  "frontend/peticio/projecte/",
      urlBusqueda: "frontend/peticio/buscar",
      urlUsuari : "frontend/peticio/usuari/"
    }
  },

  created(){
    this.url = this.host + "frontend/peticio/projecte/";
    this.urlBusqueda = this.host + "frontend/peticio/buscar";
    this.urlUsuari = this.host + "frontend/peticio/usuari/";
  }
}
