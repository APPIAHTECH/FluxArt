import Utilitat from './../global/Utilitat.js';
import MugenScroll from 'vue-mugen-scroll';
import Mixin from './../Mixin/Mixin.js';

export default {
  props:{

    quantitatProjectes:{
      type:Number,
      required:true
    },

    quantitatPermes:{
      type:Number,
      required:true
    },

    visualitzarNormal:{
      type:Boolean,
      required : true
    },

    esAltres:{ //Si es els meus projectes o perfil true en cas contrari true
      type:Boolean,
      required:true
    },

    dadesFora:{
      type:Object,
      required:false
    },

    opcions:{
      type:Object,
      required:false
    },
    esFora:{
      type:Boolean,
      required : false
    }
  },

  components: {MugenScroll},

  data(){
    return{
      host : Utilitat.rutaUrl(),
      categories:[],
      popular:[],
      categoria : "Illustracio",
      filtrar : "data_creacio", //filtrar per visitas
      ordenacio : -1, //1 DEC -1 ASC
      llistatProjectes : [],
      llistatSeguint : [],
      ocupat: false,
      projecteRecent : "", //Representa el ultim projecte mes recent
      urlVisitas : Utilitat.rutaUrl() + 'frontend/peticio/projecte/actualitzar/visitas',
      url : "",
      urlUsuari: "",
      urlBusqueda:"",
      urlMesProjectes:"",
      urlProjecteSeguidors :"",
      urlSeguir : "",
      mostrarProjectesSeguidors : false,
      esVisitas : false,
      esComentaris : false,
      esSeguidors : false
    }
  },

created(){

    if(typeof(this.$store) !== "undefined"){
      this.categories = this.$store.getters.getCategories;
      this.popular = this.$store.getters.getPopular;
    }else{
      this.categories = this.opcions.categories;
      this.popular = this.opcions.popular;
    }


    if(this.visualitzarNormal){

      this.setejarUrls(
        Utilitat.rutaUrl() + "frontend/peticio/projecte/" ,
        Utilitat.rutaUrl() + "frontend/peticio/buscar" ,
        Utilitat.rutaUrl() + "frontend/peticio/usuari/",
        Utilitat.rutaUrl() + "frontend/peticio/seguidor/projecte/",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/seguint/"
      );

     this.obtenirProjectesLimitat();

     if(!this.esAltres){
       Utilitat.esperar(()=>{
         if(this.$store.getters.getUsuari)
           this.mostrarProjectesSeguidors = true;
         else
           this.mostrarProjectesSeguidors = false;
       });
     }

   }else if(this.esAltres){

      let projectes = [] , usuari;
      this.setejarUrls(
        Utilitat.rutaUrl() + "frontend/peticio/projecte/usuari/" ,
        Utilitat.rutaUrl() + "frontend/peticio/buscar",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/",
        Utilitat.rutaUrl() + "frontend/peticio/seguidor/projecte/",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/seguint/"
      );

      if(this.$route.params.nomUsuari == this.$store.getters.getUsuari.usuari.nom_usuari){
        Utilitat.esperar(() => {
          projectes = this.$store.getters.getTreballs;
          usuari = this.$store.getters.getUsuari;

          projectes.forEach((projecte)=> {
            projecte['info'] = usuari;
            this.llistatProjectes.push(projecte);
          });

        });

      }else {

        if(this.$route.params.nomUsuari){
          let nomUsuari = this.$route.params.nomUsuari;
          this.obtenirProjectesLimitat(true , nomUsuari);
        }else {

          Utilitat.esperar(() => {
            projectes = this.$store.getters.getTreballs;
            usuari = this.$store.getters.getUsuari;

            projectes.forEach((projecte)=> {
              projecte['info'] = usuari;
              this.llistatProjectes.push(projecte);
            });

          });
        }

      }
    }
  },

  mounted(){

    if(this.esFora){

      this.setejarUrls(
        Utilitat.rutaUrl() + "frontend/peticio/projecte/usuari/" ,
        Utilitat.rutaUrl() + "frontend/peticio/buscar",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/",
        Utilitat.rutaUrl() + "frontend/peticio/seguidor/projecte/",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/seguint/"
      );

      this.categories = this.opcions.categories;
      this.popular = this.opcions.popular;
      this.obtenirProjectesLimitat(true , this.dadesFora.nomUsuari);
    }

  },

  mixins:[Mixin]
}
