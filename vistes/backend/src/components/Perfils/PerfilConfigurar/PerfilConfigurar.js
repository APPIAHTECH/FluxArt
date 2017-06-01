import Utilitat from './../../global/Utilitat.js';
import PerfilLateral from './../PerfilLateral/PerfilLateral.vue';
export default {

  components: {
    PerfilLateral
  },
  data(){
    return {
      url : Utilitat.rutaUrl() + 'frontend/peticio/actualitzar',
      utlDel : Utilitat.rutaUrl() + 'frontend/peticio/eliminar',
      redireccionar : Utilitat.rutaUrl() + '#/iniciarSessio',
      configurar : true,
      id : "",
      nom:"",
      nomUsuari:"",
      correu: "",
      pais:"",
      provincia : "",
      contrasenyaActual : "",
      contrasenyaNova : "",
      rebreNotificacions: false,
      comptePaypal : "",
      llocWeb : "",
      compteGoogle : "",
      compteFacebook: "",
      imatgePerfilNou : "",
      descripcio :""
    }
  },

  methods: {

    actualitzar(event){

      event.preventDefault();

      Utilitat.esperar(()=> {

        this.descripcio = this.$store.getters.getDescripcioFlux;
        this.imatgePerfilNou = this.$store.getters.getNouImatge;

        //Si es cambiarImatge per una nova
        if(this.cambiarContrasenya()){

          Utilitat.peticioPost(this.url , this.$data).then(resultat => {

            if(resultat.actualizat)
            {
              let url = Utilitat.rutaUrl() + "frontend/peticio/dades";
              Utilitat.peticioGet(url).then(dades => {
                this.$store.dispatch('carregarDades' , dades);
                Utilitat.notificar('Actualizat' , "Les dades s'han actualitzats");
              });

            }
            else
              Utilitat.notificar('Error' , "Les dades no han set actualitzats");
          });

        }

      });

    },

    eliminar(){
      let resultat = confirm("Estas segur que vols eliminar el compte ? , (NO EL PODRAS RECUPERAR)");

        if(resultat){
          let id  = this.id;
          Utilitat.peticioPost(this.utlDel , {IDUsuari : id}).then(resultat => {
            alert("Ens abandones D: , espero veuret per aquí molt aviat :D");
            Utilitat.redirecionar(this.redireccionar);
          });
        }
    },

    cambiarContrasenya(){

      if(this.contrasenyaActual != "" && this.contrasenyaNova != ""){
        if(this.contrasenyaActual === this.contrasenyaNova)
          return false;
        else
          return true;
      }else {
        return true;
      }
    }

  },

  mounted(){

    Utilitat.esperar(()=>{
      this.id = this.$store.getters.obtenirID;
      this.nom = this.$store.getters.getNom;
      this.nomUsuari = this.$store.getters.getNomUsuari;
      this.correu = this.$store.getters.getCorreu;
      this.rebreNotificacions = this.$store.getters.getNotificacions;
      this.comptePaypal = this.$store.getters.getEnllasPaypal;
      this.llocWeb = this.$store.getters.getEnllasLlocPersonal;
      this.compteGoogle = this.$store.getters.getEnllasGoogle;
      this.compteFacebook = this.$store.getters.getEnllasFacebook;
      this.pais = this.$store.getters.getPais;
      this.provincia = this.$store.getters.getProvincia;
    });
  }
}
