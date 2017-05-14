import Vue from 'vue';
import VueResource from 'vue-resource';
import Rutas from './Rutas.js'
import App from './App.vue';

Vue.use(VueResource); //Peticions ajax


new Vue({
  el: '#app',
  router:Rutas,
  render: (h) => h(App)
})
