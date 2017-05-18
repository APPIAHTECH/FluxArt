import MenuFrontal from './../Menu/MenuFrontal/MenuFrontal.vue';
import FluxVisualitzar from './../Visualitzacio/Visualitzacio.vue';
import MenuLateral from './../Menu/MenuLateral/MenuLateral.vue';

import Utilitat from './../global/Utilitat.js'

export default {

  components: {
    MenuFrontal,
    FluxVisualitzar,
    MenuLateral
  },

  data(){
    return {
      quantitatProjectes: 500, //Canviar per inlimitats
      quantitatPermes:1000,
      dades : {},
      url : Utilitat.rutaUrl() + "frontend/peticio/usuari",
    }
  },

  methods: {

    omplir(){
      Utilitat.peticioGet(this.url).then((resultat)=> this.dades = resultat);
    },
    getImatgePerfil(){return this.dades.perfil.usuari.url_img;},
  },

  created(){
    this.omplir();
  }
}
