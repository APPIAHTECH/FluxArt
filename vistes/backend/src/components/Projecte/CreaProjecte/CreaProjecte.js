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

    validar(){
    if(this.nomProjecte === ""){
        Utilitat.notificar("Camp nom projecte" , "Definexi un nom per el teu projecte");
        this.mostrarPujar = false;
      }else if(this.descripcio === ""){
        Utilitat.notificar("Camp descripció" , "Definexi una descripció per el teu projecte");
        this.mostrarPujar = false;
      }else if(this.poderDonar){

        if(this.$store.getters.getEnllasPaypal)
          this.mostrarPujar = true;
        else {
          this.mostrarPujar = false;
          if(confirm("Configura el teu enllaç paypal.me per tal de donar  , Vols configurar l'enllaç paypal ? "))
            Utilitat.redirecionar(Utilitat.rutaUrl() + 'api/backend/#/compte');
          else
            this.poderDonar = false;
        }
      }else
        this.mostrarPujar = true;

    }
  },

  computed: {
    obtenirDades(){return this.$data;}
  },
  created(){this.categories = this.$store.getters.getCategories;}
}
