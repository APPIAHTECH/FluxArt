import FluxPujar from "./../Pujar/Pujar.vue";
import Utilitat from "./../../global/Utilitat.js";

export default {

  components: {
    FluxPujar
  },

  data(){
    return {
      categories : [],
      nomProjecte : "",
      descripcio :"",
      tags : "",
      categoria:"Illustracio",
      poderDonar : false,
      mostrarPujar : false
    }
  },

  methods: {

    //Comprovar caracters raros...
    validar(){
    if(this.nomProjecte === "")
      {
        Utilitat.notificar("Camp nom projecte" , "Definexi un nom per el teu projecte");
        this.mostrarPujar = false;
      }else if(this.descripcio === ""){
        Utilitat.notificar("Camp descripció" , "Definexi una descripció per el teu projecte");
        this.mostrarPujar = false;
      }else {
        this.mostrarPujar = true;
      }
    }
  },

  computed: {
    obtenirDades(){return this.$data;}
  },
  created(){this.categories = this.$store.getters.getCategories;}
}
