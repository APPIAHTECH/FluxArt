import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import rutas from "./Rutas.js";
import App from './App.vue';
import intermediari from './Emmagatzemar/intermediari.js';
import Utilitat from './components/global/Utilitat.js';

Vue.use(infiniteScroll);

new Vue({
  el: '#fluxappbackend',
  store : intermediari,
  router : rutas,
  render: (h) => h(App),

  created() {
    let url = Utilitat.rutaUrl() + "frontend/peticio/dades";
    Utilitat.peticioGet(url).then(dades => {
      console.log("dades ->" , dades);
      this.$store.dispatch('carregarDades' , dades);
    });
  }

});
