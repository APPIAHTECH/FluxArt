import Vue from 'vue';
import VueResource from 'vue-resource';
import infiniteScroll from 'vue-infinite-scroll';
import App from './App.vue';
import Rutas from './Rutas.js'

Vue.use(VueResource);
Vue.use(infiniteScroll);

new Vue({
  el: '#app',
  router:Rutas,
  render: (h) => h(App)
})
