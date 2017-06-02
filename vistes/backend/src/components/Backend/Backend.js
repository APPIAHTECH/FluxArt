import FluxVisualitzar from './../Visualitzacio/Visualitzacio.vue';
export default {

  components: {
    FluxVisualitzar
  },

  data(){
    return {
      quantitatProjectes: 1,
      quantitatPermes:1000,//Canviar per inlimitats
      esAltres : false,
      visualitzarNormal : true
    }
  },

  created(){}

}
