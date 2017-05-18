import Vue from 'vue';
import VueResource from 'vue-resource';
import infiniteScroll from 'vue-infinite-scroll';
import Rutas from './Rutas.js'
import App from './App.vue';


Vue.use(VueResource); //Peticions ajax
Vue.use(infiniteScroll);

new Vue({
  el: '#app',
  router:Rutas,
  render: (h) => h(App)
})
