<template>
  <div id="perfil">
    <FluxMenu></FluxMenu>
    <div class="contenidor">
      <div class="perfilLateral">
        <PerfilLateral></PerfilLateral>
      </div>
      <div class="projectes">
        <FluxVisualitzar
        :quantitatProjectes="quantitatProjectes" :quantitatPermes="quantitatPermes" :visualitzarNormal="visualitzarNormal"
        :esAltres="esAltres" :esFora="flux.esFora" :opcions="flux" :dadesFora="flux"></FluxVisualitzar>
      </div>
    </div>
    <FluxFooter></FluxFooter>
  </div>
</template>
<script>

import PerfilLateral from './../../../../../backend/src/components/Perfils/PerfilLateral/PerfilLateral.vue';
import FluxVisualitzar from './../../../../../backend/src/components/Visualitzacio/Visualitzacio.vue';
import FluxFooter from './../Footer/Footer.vue';
import FluxMenu from './../Menu/Menu.vue';

export default {
  components: {
    PerfilLateral,
    FluxVisualitzar,
    FluxFooter,
    FluxMenu
  },

  data(){
    return {
      flux : {
        categories : ['Illustracio' , 'Logotips' , "UX Experiencia de usuari" , "UI Interfície d'usuari" , 'Icones' , 'Disseny Web' , 'Aplicacions mobils'],
        popular : ['Recents' , 'Més Vist' , 'Més Comentades'],
        esFora : true,
        nomUsuari : ""
      },

      quantitatProjectes: 1,
      quantitatPermes:1000,
      esAltres : true,
      visualitzarNormal : false
    }
  },

  created(){
    this.flux.nomUsuari = this.$route.params.nomUsuari;
  }
}
</script>

<style scoped>

div#perfil{
  width: 100%;
  height: 100%;
}

div.contenidor{
  display: flex;
  flex-flow: row nowrap;
  background: #F5F5F5;
}
div.perfilLateral{
  width: 20%;
  height: 100%;
  box-shadow: 0px 10px 10px #E5E5E5;
  background: white;
}

div.projectes{
  width: 80%;
  height: 100%;
}


</style>
