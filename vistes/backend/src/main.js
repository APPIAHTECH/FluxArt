import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import rutas from "./Rutas.js";
import App from './App.vue';
import intermediari from './Emmagatzemar/intermediari.js';

Vue.use(infiniteScroll);

new Vue({
  el: '#fluxappbackend',
  store : intermediari,
  router : rutas,
  render: (h) => h(App)
});
