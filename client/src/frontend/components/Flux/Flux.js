import fluxMenu from './../Menu/Menu.vue';
import fluxFooter from './../Footer/Footer.vue';
import fluxVisualitzar from './../Visualitzacio/Visualitzacio.vue';


export default {
  components: {
    fluxMenu,
    fluxVisualitzar,
    fluxFooter,
  },

  data()
  {
    return{
      url: window.location.href + "frontend/peticio/projecte/",
      urlBusqueda: window.location.href + "frontend/peticio/buscar",
      urlUsuari :  window.location.href + "frontend/peticio/usuari/"
    }
  }
}
