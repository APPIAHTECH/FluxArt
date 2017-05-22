import FluxPujar from "./../Pujar/Pujar.vue";

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
      categoria:"Illustració",
      poderDonar : false,
      mostrarPujar : false
    }
  },

  methods: {

    //Comprovar caracters raros...
    validar(){
    if(this.nomProjecte === "")
      {
        alert("Defineix un nom per el teu projecte :D");
        this.mostrarPujar = false;
      }else if(this.descripcio === "")
      {
        alert("Defineix una descripcio per el teu projecte :D");
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
