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

   }else if(typeof(this.$store) !== "undefined"){

      let projectes = [] , usuari;
      this.setejarUrls(
        Utilitat.rutaUrl() + "frontend/peticio/projecte/usuari/" ,
        Utilitat.rutaUrl() + "frontend/peticio/buscar",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/",
        Utilitat.rutaUrl() + "frontend/peticio/seguidor/projecte/",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/seguint/"
      );

      Utilitat.esperar(() => {

        projectes = this.$store.getters.getTreballs;
        usuari = this.$store.getters.getUsuari;

        projectes.forEach((projecte)=> {
          projecte['info'] = usuari;
          this.llistatProjectes.push(projecte);
        })

      });

    }else{

      this.setejarUrls(
        Utilitat.rutaUrl() + "frontend/peticio/projecte/usuari/" ,
        Utilitat.rutaUrl() + "frontend/peticio/buscar",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/",
        Utilitat.rutaUrl() + "frontend/peticio/seguidor/projecte/",
        Utilitat.rutaUrl() + "frontend/peticio/usuari/seguint/"
      );

      this.obtenirProjectesLimitat(false);
    }
  },

  mixins:[Mixin]
}
