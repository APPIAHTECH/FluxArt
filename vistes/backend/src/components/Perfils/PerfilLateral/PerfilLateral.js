import Utilitat from "./../../global/Utilitat.js";

export default {

  props: {
    configurar:{
      type:Boolean,
      require : false
    }
  },

data(){
  return {
    nomUsuari : "",
    nom : "",
    seguidors : "",
    projectes : "",
    compteFace :"",
    fitxersAcceptats : "image/*",
    midaMaxima : 2, //MB
    compteGoogle : "",
    iniciatSessio : false,
    mostrarEditar : false,
    descripcio : "",
    imatgePerfil :"",
    usuariID : "",
    url : Utilitat.rutaUrl() + 'frontend/peticio/perfil/',
    urlSessio : Utilitat.rutaUrl() + 'frontend/peticio/teSessio',
    urlSeguir : Utilitat.rutaUrl() + "frontend/peticio/seguir",
    redirecionar : "#/iniciarSessio"
  }
},

methods: {

  setejarDescripcio(event){
    this.$store.commit('setDescripcio' , event.target.value);
  },

  obtenirImatges(event){
    let imatge = event.target.files[0];
    if (imatge.length === 0)
    {
      this.notificar();
      return;
    }

    if(this.validarImatge(imatge))
     {
       this.convertirAUrlValid(imatge , (imatgeCodificat)=> {
         this.imatgePerfil = imatgeCodificat;
         this.$store.dispatch('setImatgePerfil' , this.imatgePerfil);
       });
     }
     else
      Utilitat.notificar('Error' , "L'imatge "+imatge.name+" no es valid");
  },

  validarImatge(imatge)
  {
    let midaMaxima = this.midaMaxima * 1024 * 1024; //File.size es en bytes
    if(imatge.type.match(this.fitxersAcceptats))//Si l'imatge no es de tipus jpg , jpeg , gif , png retorna null en cas de no coincidencia
    {
      if(imatge.size <= midaMaxima)
        return true;
    }
    return false;
  },

  convertirAUrlValid(imagte , callback){
    let reader = new FileReader(); //Method asyn
    reader.onload = (event)=> callback(reader.result);
    reader.readAsDataURL(imagte); //codifica el imatge en string per convertilo en un url valid
  },

  obtenirParams(){

    let ruta = window.location.href;
    let pos = 0;
    let param= "";

    if(ruta.includes('/#/perfil')){
      pos = ruta.lastIndexOf('/');
      param = ruta.substring(pos + 1 , ruta.lenght);

      return param.trim();
    }

  },

  demanarDades(url){
    Utilitat.peticioGet(url).then((resultat) =>{

      let perfil = resultat.perfil.perfil;
      this.usuariID = resultat.perfil._id;
      this.nomUsuari = perfil.nomUsuari;
      this.seguidors = resultat.quantitatSeguidors;
      this.projectes = resultat.quantitatProjectes;
      this.descripcio = perfil.descripcio;
      this.nom = perfil.nom;
      this.nomUsuari = perfil.nom_usuari;
      this.imatgePerfil = perfil.url_img;

      if(!this.imatgePerfil)
        this.imatgePerfil = 'http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg';

      this.compteFace = perfil.compte_soccials[0];
      this.compteGoogle = perfil.compte_soccials[1];
    });
  },

  seguirUsuari(event){

    event.target.disabled = true;
    event.target.className = 'btn jaSeguint';

    Utilitat.peticioGet(this.urlSessio).then((resultat)=>{

      if(resultat.sessio){

        let dades = {
          idUsuari : this.$store.getters.obtenirID,
          idUsuariASeguir : this.usuariID,
          nomUsuari : this.$store.getters.getNomUsuari
        }

        Utilitat.peticioPost(this.urlSeguir , dades).then((resultat)=>{

          if(resultat.seguint)
            Utilitat.notificar('Seguint' , "Ehnorabona estas seguin al usuari");
          else if(resultat.jaEstaSeguint){
            Utilitat.notificar('Estas Seguint' , "Ja estas seguint el usuari");
          }


        }).catch(err => console.error(err));

      }else
        Utilitat.redirecionar(this.redirecionar);

    });
  }

},

created(){

  Utilitat.esperar(()=>{
    Utilitat.peticioGet(this.urlSessio).then((resultat)=>{

      if(resultat.sessio){//Si te sessio
        this.iniciatSessio = true;

        if(this.configurar)
          this.mostrarEditar = true;
        else
          this.mostrarEditar = false;

        if(this.$route.params.nomUsuari == this.$store.getters.getNomUsuari || this.mostrarEditar){
          this.nomUsuari = this.$store.getters.getNomUsuari;
          this.seguidors = this.$store.getters.getQuantitatSeguidors;
          this.projectes = this.$store.getters.getQuantitatProjectes;
          this.descripcio = this.$store.getters.getDescripcio;
          this.nom = this.$store.getters.getNom;
          this.compteFace = this.$store.getters.getEnllasFacebook;
          this.compteGoogle = this.$store.getters.getEnllasGoogle;
          this.imatgePerfil = this.$store.getters.obtenirImatgePerfil;
        }else{
          this.iniciatSessio = false;
          let url =`${ this.url}${this.$route.params.nomUsuari}`;
          this.demanarDades(url);
        }


        if(!this.imatgePerfil)
          this.imatgePerfil = 'http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg';

      }else{

        this.iniciatSessio = false;

        if(this.configurar)
          this.mostrarEditar = true;
        else
          this.mostrarEditar = false;

        this.nomUsuari = this.obtenirParams();
        let url =`${ this.url}${this.nomUsuari}`;

        if(this.nomUsuari)
          this.demanarDades(url);
      }

    });
  });
  }
}
