import Utilitat from "./../../global/Utilitat.js";
export default {

  data(){
    return {
      esActivat : false ,
      imatgePerfil: "",
      url : Utilitat.rutaUrl() + 'frontend/peticio/tancarSessio',
      urlNotificacio : Utilitat.rutaUrl() + 'frontend/peticio/notificacio/llegit',
      redireccionar : Utilitat.rutaUrl() + '#/iniciarSessio',
      nomPeril : "#/perfil/",
      notificacionNoLegit : 0,
      notificacions : [],
      mostrarNotificacio : false

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
    },

    mostarNoti(){
      if(this.mostrarNotificacio)
        this.mostrarNotificacio = false;
      else
        this.mostrarNotificacio = true;
    },

    llegit(event){

      this.notificacionNoLegit--;
      if(this.notificacionNoLegit < 0)
        this.notificacionNoLegit = 0;

      let idNoti = event.target.dataset.idnorificacio;
      let index = 0;
      for (var i = 0; i < this.notificacions.length; i++) {
        if(this.notificacions[i]._id == idNoti)
          {
            index = i;
            break;
          }
      }

      Utilitat.peticioPost(this.urlNotificacio , {idNotificacio : idNoti})
      .then((resultat) => {
        if(resultat.llegit) this.notificacions.splice(index, 1);
      });

    },

    crearProjecte(){
      Utilitat.redirecionar('/api/backend/#/crear/projecte');
    }
  },

  created(){
    Utilitat.esperar(()=> {
      this.imatgePerfil = this.$store.getters.obtenirImatgePerfil;
      if(!this.imatgePerfil) //Si per defecte el imate no esta definit asigo una per defecte
        this.imatgePerfil = 'http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg';
      this.nomPeril += this.$store.getters.getNomUsuari;
      this.notificacions = this.$store.getters.getNotificacionNoLegit;
      this.notificacionNoLegit = this.notificacions.length;
    });
  }
}
