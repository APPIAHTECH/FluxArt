import PerfilLateral from "./../PerfilLateral/PerfilLateral.vue";
import FluxVisualitzar from "./../../Visualitzacio/Visualitzacio.vue";

export default {

  components: {
    PerfilLateral,
    FluxVisualitzar
  },

  data(){
    return {
      quantitatProjectes: 1,
      quantitatPermes:1000,
      esAltres : true,
      visualitzarNormal : false,
      usuariID : ""
    }
  }
}
