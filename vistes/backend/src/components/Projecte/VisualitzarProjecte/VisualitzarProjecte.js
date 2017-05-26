import Utilitat from './../../global/Utilitat.js'

export default {
  data(){
    return {
      urlPeticio : Utilitat.rutaUrl() + 'frontend/peticio/projecte/amb/',
      urlUsuari :  Utilitat.rutaUrl() + 'frontend/peticio/usuari/',
      urlComentaris : Utilitat.rutaUrl() + 'frontend/peticio/projecte/inserir/comentaris',
      urlLike : Utilitat.rutaUrl() + 'frontend/peticio/projecte/actualitzar/likes',
      nomUsuari : "",
      imgPerfil : "",
      teDonacio : false,
      imatgeGran : "",
      llistatImatges : [],
      titul : "",
      descripcio :"",
      categoria : "",
      tags : "",
      visitas : "",
      like : "",
      comentarisTotal : "",
      comentaris : [] ,
      missatgeComentar : "",
      liAgrada : false
    }
  },

  created(){

    let IDProjecte = this.$route.params.IDProjecte;
    this.urlPeticio += IDProjecte;

    Utilitat.peticioGet(this.urlPeticio).then((resultatProjecte) => {

      if(resultatProjecte.exsisteix){

        let idUsuari = resultatProjecte.projecte.projecte.usuari_id;
        this.urlUsuari += idUsuari;

        Utilitat.peticioGet(this.urlUsuari).then((resultat) => {

          this.$store.dispatch('setProjecteTemporal' , {
            projecteObtingut : resultatProjecte,
            propietari : resultat[0]
          });

        }).catch(err => console.error(err));

      }

    }).catch(err => console.error(err));

  },

  methods: {
    inserirComentari(event){

      let idProjecte = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte._id;
      let url_img = this.$store.getters.obtenirImatgePerfil;
      let IDUsuari = this.$store.getters.obtenirID;
      let missatge = this.missatgeComentar;
      let nomUsuari = this.$store.getters.getNomUsuari;

      let comentar = {
        idProjecte,
        url_img,
        IDUsuari,
        missatge,
        nomUsuari,
        data : new Date(),
        comentari : this.comentaris.length
      }

      Utilitat.peticioPost(this.urlComentaris , comentar)
      .then((resultat)=>{

        if(resultat.inserit)
          this.comentaris.push(comentar);
      })
      .catch(err => console.error(err));
    },

    actualitzarLikes(event){
      let idProjecte = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte._id;
      let IDUsuari = this.$store.getters.obtenirID;

      let likes = {
        idProjecte,
        IDUsuari
      }
      Utilitat.peticioPost(this.urlLike , likes)
      .then((resultat)=>{
        if(resultat.inserit)
          liAgrada = true;
      });
    }
  },

  mounted(){
    Utilitat.esperar(()=>{
      this.nomUsuari = this.$store.getters.getProjecteTemporal.propietari.usuari.nom_usuari;
      this.imgPerfil = this.$store.getters.getProjecteTemporal.propietari.usuari.url_img;
      this.teDonacio = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.te_donacio;
      this.imatgeGran = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.imatges[0];
      this.llistatImatges = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.imatges;
      this.titul = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.titul;
      this.descripcio = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.descripcio;
      this.categoria = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.categoria;
      this.tags = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.tags;
      this.visitas = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.visitas;
      this.like = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.like.length;
      this.comentarisTotal = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.comentaris_total;
      this.comentaris = this.$store.getters.getProjecteTemporal.projecteObtingut.projecte.projecte.comentaris;
    });
  }
}
