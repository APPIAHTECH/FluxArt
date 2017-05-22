import Utilitat from "./../../global/Utilitat.js";

export default {
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
    iniciatSessio : true,
    mostrarEditar : true,
    descripcio : "",
    imatgePerfil :"http://orig01.deviantart.net/d243/f/2013/126/4/0/profile_picture_by_goku_hd-d64dk5d.png",
    url : Utilitat.rutaUrl() + 'frontend/peticio/perfil/',
    urlSessio : Utilitat.rutaUrl() + 'frontend/peticio/teSessio'
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
       alert("L'imatge "+imatge.name+" no es valid");
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

  notificar(){alert("Ups , alguna cosa no ha nat be");},

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

  seguirUsuari(){

    Utilitat.peticioGet(this.urlSessio).then((resultat)=>{

      if(resultat.sessio){
        //TODO: seguir usuari.,...
      }else
        Utilitat.redirecionar();

    });
  }

},

created(){

    Utilitat.peticioGet(this.urlSessio).then((resultat)=>{

      if(resultat.sessio){//Si te sessio
        this.iniciatSessio = true;
        this.mostrarEditar = true;

        this.nomUsuari = this.$store.getters.getNomUsuari;
        this.seguidors = "Per el moment no esta definit"; //Calcular total seguidors
        this.projectes = "Per el moment no esta definit"; //Calcular el total de projectes
        this.descripcio = this.$store.getters.getDescripcio;
        this.nom = this.$store.getters.getNom;
        this.compteFace = this.$store.getters.getEnllasFacebook;
        this.compteGoogle = this.$store.getters.getEnllasGoogle;
        this.imatgePerfil = this.$store.getters.obtenirImatgePerfil;

      }else{

        this.iniciatSessio = false;
        this.mostrarEditar = false;

        this.nomUsuari = this.obtenirParams();
        this.url += this.nomUsuari;

        if(this.nomUsuari){

          Utilitat.peticioGet(this.url).then(resultat =>{

            let perfil = resultat.perfil;
            this.nomUsuari = perfil.nomUsuari;
            this.seguidors = "Per el moment no esta definit";
            this.projectes = "Per el moment no esta definit";
            this.descripcio = perfil.descripcio;
            this.nom = perfil.nom;
            this.compteFace = perfil.compte_soccials[0];
            this.compteGoogle = perfil.compte_soccials[1];

          });
        }
      }

    });
  }
}
