import Utilitat from "./../../global/Utilitat.js";
export default {

  data(){
    return {
      esActivat : false ,
      imatgePerfil: "",
      url : Utilitat.rutaUrl() + 'frontend/peticio/tancarSessio',
      redireccionar : Utilitat.rutaUrl() + '#/iniciarSessio',
      nomPeril : "#/perfil/"
    }
  },

  methods: {

    activar(){

      let menuLateral = document.getElementById('idMenuLateral');
      if(this.esActivat)
      {
        menuLateral.className = "amagar";
        this.esActivat = false;
      }else{
        menuLateral.className = "menuLateral";
        this.esActivat = true;
      }
    },

    tancarSessio(){

      Utilitat.peticioGet(this.url).then((resultat)=>{
        if(resultat.tancatSessio)
          Utilitat.redirecionar(this.redireccionar);

      });
    }
  },

  created(){
    Utilitat.esperar(()=> {
      this.imatgePerfil = this.$store.getters.obtenirImatgePerfil;
      this.nomPeril += this.$store.getters.getNomUsuari;
    });
  }
}
