import Utilitat from "./../../global/Utilitat.js";

export default {
  data(){
    return {
      nomUsuari : "",
      nom : "",
      seguidors : "",
      projectes : "",
      compteFace :"",
      compteGoogle : "",
      iniciatSessio : true,
      mostrarEditar : true,
      descripcio : "",
      url : Utilitat.rutaUrl() + 'frontend/peticio/perfil/'
    }
  },
//http://localhost:3000/api/backend/#/perfil/stephen
  created(){
    this.nomUsuari = this.$route.params.nomUsuari;
    this.url += this.nomUsuari;

    Utilitat.peticioGet(this.url).then(resultat =>{
      if(resultat.iniciatSessio)
      {
        this.iniciatSessio = true;
        this.mostrarEditar = true;
        this.nomUsuari = this.$store.getters.getNomUsuari;
        this.seguidors = "Per el moment no esta definit";
        this.projectes = "Per el moment no esta definit";
        this.descripcio = "PER DEFINIR";
        this.nom = "per defirnir";
        this.compteFace = "per definir";
        this.compteGoogle ="per definir";
      }else {
        let perfil = resultat.perfil;

        this.iniciatSessio = false;
        this.mostrarEditar = false;
        this.nomUsuari = perfil.nomUsuari;
        this.seguidors = "Per el moment no esta definit";
        this.projectes = "Per el moment no esta definit";
        this.descripcio = perfil.descripcio;
        this.nom = perfil.nom;
        this.compteFace = perfil.compte_soccials[1];
        this.compteGoogle = perfil.compte_soccials[0];
      }

    });
  }
}
