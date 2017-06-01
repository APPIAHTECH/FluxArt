import FluxVisualitzar from './../../../../../backend/src/components/Visualitzacio/Visualitzacio.vue';
import FluxMenu from './../Menu/Menu.vue';
import FluxFooter from './../Footer/Footer.vue';

export default {
  components: {
    FluxMenu,
    FluxVisualitzar,
    FluxFooter
  },

  data()
  {
    return{
      quantitatProjectes: 1,
      quantitatPermes:1000,
      esAltres : false,
      visualitzarNormal : true,
      flux : {
        categories : ['Illustracio' , 'Logotips' , "UX Experiencia de usuari" , "UI Interfície d'usuari" , 'Icones' , 'Disseny Web' , 'Aplicacions mobils'],
        popular : ['Recents' , 'Més Vist' , 'Més Comentades'],
      }
    }
  },

  methods: {
    redirecionar(){
      window.location.href = "/#/registrar";
    }
  }
}
