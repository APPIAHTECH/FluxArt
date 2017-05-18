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
      quantitatProjectes: 100,
      quantitatPermes : 6000
    }
  },
}
