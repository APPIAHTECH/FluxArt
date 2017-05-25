import Utilitat from "./../../global/Utilitat.js";

export default {

  data(){
    return {
      url : Utilitat.rutaUrl() + 'frontend/peticio/tancarSessio',
      redireccionar : Utilitat.rutaUrl() + '#/iniciarSessio',
      nomPeril : "#/perfil/"
    }
  },


methods: {
    tancarSessio(){

      Utilitat.peticioGet(this.url).then((resultat)=>{
        if(resultat.tancatSessio)
          Utilitat.redirecionar(this.redireccionar);

      });
    }
  },

  created(){

    Utilitat.esperar(()=> this.nomPeril += this.$store.getters.getNomUsuari);
  }

}
