import MenuFrontal from './../Menu/MenuFrontal/MenuFrontal.vue';
import FluxVisualitzar from './../../../../client/src/frontend/components/Visualitzacio/Visualitzacio.vue';

export default {

  components: {
    MenuFrontal,
    FluxVisualitzar
  },

  data(){
    return {
      quantitatProjectes: 250 //Canviar per inlimitats
    }
  }
}
