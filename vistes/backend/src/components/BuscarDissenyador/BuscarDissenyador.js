import Utilitat from "./../global/Utilitat.js";

export default {
  data(){
    return {
      quantitatAMostrar : 1,
      filtrar : "data_validacio",
      ordenat : 1,
      IDUsuari : "",
      urlPeticio : "",
      urlSessio : Utilitat.rutaUrl() + 'frontend/peticio/teSessio',
      urlSeguir : Utilitat.rutaUrl() + "frontend/peticio/seguir",
      redirecionar : "#/iniciarSessio",
      llistatUsuaris : []
    }
  },

  methods: {

    seguirUsuari(event){

      let idUsuariASeguir = event.target.dataset.usuari;
      let nomUsuari = this.$store.getters.getNomUsuari;
      event.target.disabled = true;
      event.target.className = 'btn jaSeguint';

      Utilitat.peticioGet(this.urlSessio).then((resultat)=>{

        if(resultat.sessio){

          let dades = {
            idUsuari : this.IDUsuari,
            idUsuariASeguir : idUsuariASeguir,
            nomUsuari : nomUsuari
          }


          Utilitat.peticioPost(this.urlSeguir , dades).then((resultat)=>{

            if(resultat.seguint)
              alert('Ehnorabona estas seguin al usuari ');
            else if(resultat.jaEstaSeguint){
              alert("ja l'estats segunt");
            }


          }).catch(err => console.error(err));

        }else
          Utilitat.redirecionar(this.redirecionar);

      });
    }
  },

  created(){
    Utilitat.esperar(()=>{
      this.IDUsuari = this.$store.getters.obtenirID;
      this.urlPeticio = Utilitat.rutaUrl() + `frontend/peticio/dissenyadors/${this.quantitat}/${this.filtrar}/${this.ordenat}/${this.IDUsuari}`;
      console.log(this.urlPeticio);
      Utilitat.peticioGet(this.urlPeticio)
      .then(usuaris => this.llistatUsuaris = usuaris)
      .catch(err => console.log(err));
    });
  }
}
