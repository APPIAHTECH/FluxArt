import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueResource); //Peticions ajax
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: (h) => h(App)
})
